import request, { errorProcess } from 'src/utils/request';
export default {
  /**
   * 获取主页新歌数据
   */
  async getMainPageData() {
    return request({
      method: 'get',
      url: `/proxy/?json=true`
    });
  },
  /**
   * 根据hash获取当前歌曲详细信息
   */
  async getCurSongInfo(hash) {
    return request({
      method: 'get',
      url: `/bproxy/yy/index.php?r=play/getdata&hash=${hash}`
    });
  },
  /**
   * 根据hash获取当前歌曲详细信息
   */
  async getRankListData() {
    return request({
      method: 'get',
      url: `/proxy/rank/list&json=true`
    });
  },
  /**
   * 根据rankid获取当前排行版详细信息
   */
  async getCurRankInfo(rankid) {
    return request({
      method: 'get',
      url: `/proxy/rank/info/?rankid=${rankid}&page=1&json=true`
    });
  },
  /**
   * 获取热门歌曲信息
   */
  async getHotSongList() {
    return request({
      method: 'get',
      url: `/aproxy/api/v3/search/hot?format=json&plat=0&count=30`
    });
  },
  /**
   * 搜索歌曲
   */
  async searchSong(keyword) {
    return request({
      method: 'get',
      url: `/aproxy/api/v3/search/song?format=json&keyword=${keyword}&page=1&pagesize=100&showtype=1`
    });
  },
  /**
   * 获取歌单列表
   */
  async getSongSortList() {
    return request({
      method: 'get',
      url: `/proxy/plist/index&json=true`
    });
  },
  /**
   * 获取歌单列表
   */
  async getCurSongSortInfo(specialid) {
    return request({
      method: 'get',
      url: `/proxy/plist/list/${specialid}?json=true`
    });
  },
  /**
   * 获取歌手分类id获取歌手列表
   */
  async getSingerList(listId) {
    return request({
      method: 'get',
      url: `/proxy/singer/list/${listId}?json=true`
    });
  },
  /**
   * 获取歌手id获取歌手所有歌曲
   */
  async getCurSingerSongs(singerId) {
    return request({
      method: 'get',
      url: `/proxy/singer/info/${singerId}&json=true`
    });
  }
};
