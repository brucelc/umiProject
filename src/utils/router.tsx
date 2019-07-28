import umiRouter from 'umi/router';
import { flow, isString } from 'lodash';

import { isDev } from './env/index';


const myRouter = { ...umiRouter };
const routerAddPrefix = params => {
  console.log('params', params);
  let paramsTemp = params;
  if (isString(params)) {
    paramsTemp = isDev ? params : `/umi${params}`;
  } else {
    paramsTemp.pathname = isDev ? params.pathname : `/umi${params.pathname}`;
  }
  return paramsTemp;
};

myRouter.push = flow (
  routerAddPrefix,
  umiRouter.push,
);

myRouter.replace = flow (
  routerAddPrefix,
  myRouter.replace,
);

export const router = myRouter;
