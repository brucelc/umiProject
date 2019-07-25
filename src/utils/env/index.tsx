/*
 * @Author: bruce.lc
 * @Date: 2019-07-17 21:04:17
 * @Last Modified by: bruce.lc
 */
import { envInfo } from '@ali/venice-utils';


// 环境判断
const env = envInfo({
  dev() {
    return window.location.host.indexOf(':') > -1 || window.localStorage.env === 'dev';
  },
  daily() {
    return window.localStorage.env === 'daily' ||
      window.location.host === 'mtdb.daily.taobao.net' ||
      window.location.host === 'mtdb.taobao.net';
  },
  pre() {
    return (window.location.host === 'pre-mtdb.taopiaopiao.com' &&
      window.location.search.indexOf('env=wapa') > -1) || window.location.host === 'pre-mtdb.taopiaopiao.com';
  },
  prod() {
    return window.location.host === 'mtdb.yunshangzhipian.com' &&
      window.location.search.indexOf('env=wapa') < 0;
  },
});


// 是否是调试环境
export const isDebug = () => !!window.localStorage._venice_debug;

// 是否是开发环境
export const isDev = () => window.location.host.indexOf(':') > -1;

// 是否是开发或开启调试环境
export const isDevOrDebug = () => isDebug() || isDev();

// 是否是线上环境
export const isProd = () => env.isProd();

export const isDaily = (() => env.isDaily())();
