/* global window */

import { stringify } from 'qs';
import store from 'store';
// import { ROLE_TYPE } from 'utils/constant'
import { router, queryLayout, pathMatchRegexp } from 'utils/index';
// import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
// import api from 'api'
import { config } from 'utils/config';

/* eslint:disable */
__webpack_public_path__ = window.YLB_CONFIG ? window.YLB_CONFIG.assets : '/';

// const { queryRouteList, logoutUser, queryUserInfo } = api

export default {
  namespace: 'app',
  state: {
    routeList: [],
    locationPathname: '',
    locationQuery: {},
    notifications: [
      {
        title: 'New User is registered.',
        date: new Date(Date.now() - 10000000),
      },
      {
        title: 'Application has been approved.',
        date: new Date(Date.now() - 50000000),
      },
    ],
  },
  subscriptions: {
    setup({ dispatch }) {
      console.log('监听启动');
      dispatch({ type: 'query' });
    },
    setupHistory({ dispatch, history }) {
      console.log('监听路由变化');
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        });
      });
    },

    // setupRequestCancel({ history }) {
    //   history.listen(() => {
    //     const { cancelRequest = new Map() } = window

    //     cancelRequest.forEach((value, key) => {
    //       if (value.pathname !== window.location.pathname) {
    //         value.cancel(CANCEL_REQUEST_MESSAGE)
    //         cancelRequest.delete(key)
    //       }
    //     })
    //   })
    // },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      // store isInit to prevent query trigger by refresh
      const isInit = store.get('isInit');
      if (isInit) {
        return;
      }
      const { locationPathname } = yield select(_ => _.app);
      // 获取个人信息, 以及分配路由
      // const { success, user } = yield call(queryUserInfo, payload);
      const userInfo = store.get('userInfo');

      if (userInfo) {
        store.set('isInit', true);
        if (pathMatchRegexp(['/', '/login'], window.location.pathname)) {
          router.push({
            pathname: '/products',
          });
        }
      } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
        router.push({
          pathname: '/login',
          search: stringify({
            from: locationPathname,
          }),
        });
      }
    },

    // *signOut({ payload }, { call, put }) {
    //   const data = yield call(logoutUser)
    //   if (data.success) {
    //     store.set('routeList', [])
    //     store.set('permissions', { visit: [] })
    //     store.set('user', {})
    //     store.set('isInit', false)
    //     yield put({ type: 'query' })
    //   } else {
    //     throw data
    //   }
    // },
  },
  reducers: {
    updateState(state, { payload }) {
      console.log('state更新', state, payload);
      return {
        ...state,
        ...payload,
      };
    },

    handleThemeChange(state, { payload }) {
      store.set('theme', payload);
      state.theme = payload;
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload);
      state.collapsed = payload;
    },

    allNotificationsRead(state) {
      state.notifications = [];
    },
  },
};

