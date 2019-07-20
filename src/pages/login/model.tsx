/*
 * @Author: bruce.lc
 * @Date: 2019-07-17 22:37:15
 * @Last Modified by: bruce.lc
 */
export default {
  namespace: 'login',
  state: [],
  reducers: {
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
  // effects: {
  //   *login({ payload }, { put, call, select }) {
  //     const data = yield call(mtop, 'portal.departmentgroup.create', {
  //       ...payload,
  //     });
  //     // const data = yield call(loginUser, payload)
  //     console.log('data11', data, loginUser);
  //     const { locationQuery } = yield select(_ => _.app)
  //     if (data.success) {
  //       const { from } = locationQuery
  //       yield put({ type: 'app/query' })
  //       if (!pathMatchRegexp('/login', from)) {
  //         if (['', '/'].includes(from)) router.push('/dashboard')
  //         else router.push(from)
  //       } else {
  //         router.push('/dashboard')
  //       }
  //     } else {
  //       throw data
  //     }
  //   },
  // },
};