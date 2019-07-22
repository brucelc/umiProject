import { mtop } from 'utils/index';
import modelExtend from 'dva-model-extend';
import { model } from 'utils/model';


export default modelExtend(model, {
  namespace: 'products',
  state: {
    list: [],
  },
  reducers: {
    delete(state, { payload: userId }) {
      return {
        ...state,
        list: state.list.filter(item => item.userId !== userId),
      };
    },
  },
  effects: {
    *list({ payload }, { put, call, select }) {
      const data = yield call(mtop, 'crew.actor.page.get', {
        ...payload,
        crewCode: 'ZHANLANG',
        pageNo: 1,
        pageSize: 10,
        userToken: 'f004b56ca7601aa15743992c315c0054_656a8a2eb5354a988cc22354bc9f2ee2',
        leaseCode: 'ZHANLANG',
        appId: 'FILM_PRODUCTION',
      });

      const { result } = data;
      yield put({
        type: 'updateState',
        payload: {
          list: result,
        },
      });
    },
  },
});
