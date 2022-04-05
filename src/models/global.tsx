import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { IGame } from '@/interface'

export interface globalModelState {
  test: string,
  game: Array<IGame>;
}

export interface globalModelType {
  namespace: 'global';
  state: globalModelState;
  effects: {
    setGame: Effect;
  };
  reducers: {
    saveGame: Reducer<globalModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const globalModel: globalModelType = {
  namespace: 'global',

  state: {
    test:'fsdf',
    game: [],
  },

  effects: {
    *setGame({ payload }, { call, put }) {
      yield put({
        type:'saveGame',
        payload
      })
    },
  },
  reducers: {
    saveGame(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'setGame',
          });
        }
      });
    },
  },
};

export default globalModel;
// export default {
//   namespace: 'global',

//   state: {
//     game:[]
//   },

//   effects: {
//     *setGame({ payload }:any, { put }:any) {
//       yield put({
//         type: 'saveGame',
//         payload,
//       });
//     },
//   },

//   reducers: {
//     saveGame(state: any, { payload }:any) {
//       return {
//         ...state,
//         orgList: payload
//       }
//     },
//   },

//   subscriptions: {
//     // setup({ history }) {
//     //   // Subscribe history(url) change, trigger `load` action if pathname is `/`
//     //   return history.listen(({ pathname, search }) => {
//     //     if (typeof window.ga !== 'undefined') {
//     //       window.ga('send', 'pageview', pathname + search);
//     //     }
//     //   });
//     // },
//   },
// };
