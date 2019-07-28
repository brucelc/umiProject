import umiRouter from 'umi/router';
import { flow } from 'lodash';

import { isDev } from './env/index';


const myRouter = { ...umiRouter };
const routerAddPrefix = params => {
  const { pathname } = params;
  if (!isDev) {
    params.pathname = `/umi${pathname}`;
  }
  return params;
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
