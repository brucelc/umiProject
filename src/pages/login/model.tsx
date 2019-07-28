/*
 * @Author: bruce.lc
 * @Date: 2019-07-17 22:37:15
 * @Last Modified by: bruce.lc
 */
import { router } from 'utils/index';
import { axios } from 'utils/request/index';
import store from 'store';
import { message } from 'antd';

export default {
  namespace: 'login',
  state: [],
  reducers: {

  },
  effects: {
    *login({ payload }, { put, call, select }) {
      console.log('请求', payload);
      const data = yield call(axios, {
        url: 'http://139.199.95.41/miaowei/login',
        method: 'POST',
        data: payload,
      });
      const { status, msg } = data;
      console.log('请求2', data);
      if (status === 2001) {
        message.success(msg);
        store.set('userInfo', payload);
        console.log('跳转到list');
        router.push('/products');
      } else {
        message.error(msg);
      }
    },
  },
};
