import BaseModel from 'src/declare/baseModel';
import AppSercice from '../services/app';

/**
 *  全局应用状态
 */
export interface AppModelState {
  linkIndex: number; // => 底部导航当前index
  loading: boolean; // => 全局loading
  isPlayPage: boolean; // => 是否显示播放界面
  isPlay: boolean; // => 是否正在播放
  curSongList: Object[]; // => 当前播放列表
  curSongInfo: Object; // => 当前播放歌曲信息
  curSongLrc: Object[]; // => 当前播放歌曲歌词
  curSongIndex: number; // => 当前播放歌曲在当前播放列表索引
  curSongTime: {
    // => 当前播放歌曲时间
    total: number; // 总时间
    current: number; // 当前时间
  };
}
const initState = {
  linkIndex: 0,
  loading: true,
  isPlayPage: false,
  isPlay: false,
  curSongList: [],
  curSongInfo: {},
  curSongLrc: [],
  curSongIndex: -1,
  curSongTime: {
    total: 0,
    current: 0
  }
} as AppModelState;

export default {
  namespace: 'app',
  state: { ...initState },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
    updateCurSongInfo(state, { payload }) {
      return { ...state, curSongInfo: { ...payload } };
    }
  },
  effects: {
    /**
     * @param 根据hash获得当前歌曲信息
     */
    *getCurSongInfo({ payload }, { put, call, select }) {
      const { data, status } = yield call(AppSercice.getCurSongInfo, payload);
      if (data && status === 200) {
        // tslint:disable-next-line:no-console
        console.log(data);
        yield put({
          type: 'updateCurSongInfo',
          payload: data.data
        });
        yield put({
          type: 'handleCurSongLrc'
        });
      }
    },
    /**
     * @param 处理当前歌曲歌词
     */
    *handleCurSongLrc({ payload }, { put, call, select }) {
      const { curSongInfo } = yield select(state => state.app);
      let temp = [];
      if (curSongInfo.lyrics) {
        temp = curSongInfo.lyrics.split('\r\n');
        temp = temp.splice(0, temp.length - 1);
        temp = temp.map(value => {
          const time = value.substr(1, 5);
          const seconds =
            // tslint:disable-next-line:radix
            parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
          const lrcContent = value.substr(10);
          return {
            seconds,
            lrcContent
          };
        });
        // tslint:disable-next-line:no-console
        console.log(temp);
      }
      yield put({
        type: 'updateState',
        payload: {
          curSongLrc: temp
        }
      });
    },
    /**
     * @param 下一首
     */
    *playNextSong({ payload }, { put, call, select }) {
      const { curSongIndex, curSongList } = yield select(state => state.app);
      let nextIndex = curSongIndex + 1;
      nextIndex = nextIndex > curSongList.length - 1 ? 0 : nextIndex; // 判断播放到最后一首
      yield put({
        type: 'updateState',
        payload: {
          curSongIndex: nextIndex
        }
      });
      yield put({
        type: 'getCurSongInfo',
        payload: curSongList[nextIndex].hash
      });
    },
    /**
     * @param 上一首
     */
    *playPrevSong({ payload }, { put, call, select }) {
      const { curSongIndex, curSongList } = yield select(state => state.app);
      let nextIndex = curSongIndex - 1;
      nextIndex = nextIndex < 0 ? curSongList.length - 1 : nextIndex; // 判断播放到最后一首
      yield put({
        type: 'updateState',
        payload: {
          curSongIndex: nextIndex
        }
      });
      yield put({
        type: 'getCurSongInfo',
        payload: curSongList[nextIndex].hash
      });
    }
  }
} as BaseModel<AppModelState>;
