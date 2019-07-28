import umiRouter from 'umi/router';
import { flow } from 'lodash';

import { isDev } from './env/index';


const myRouter = { ...umiRouter };
const routerAddPrefix = params => {
  console.log('params', params);
  return isDev ? `/umi${params}` : params;
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
