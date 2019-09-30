// /*
//  * @Author: bruce.lc
//  * @Date: 2019-07-17 20:56:07
//  * @Last Modified by: bruce.lc
//  */
// import { mtopFetch } from '@ali/venice-utils';
// import { isDaily, env } from '../env';

// const mtopParams = {
//   env,
//   prefix: 'mtop.alipic.cannes',
// };


// export const mtopInstance = mtopFetch(mtopParams);

// // 接口处理
// export const mtop = (api: string, data = {}, config: any = {}) => {
//   return mtopInstance.request(api, {
//     ...data,
//   }, {
//     ...config,
//     type: isDaily ? 'POST' : config.type, // 设置死日常环境jsonp使用POST方式请求数据，防止测试时总数据get请求过长异常
//   });
// };
