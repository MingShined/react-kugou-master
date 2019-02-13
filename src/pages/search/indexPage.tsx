import React, { Component, Fragment } from 'react';
import BaseProps from '../../declare/baseProps';
import Search from 'antd/lib/input/Search';
import { Card, List, message } from 'antd';
import Appservice from '../../services/app';
import SongList from '../../components/SongList';

export default class SearchPage extends Component<BaseProps, any> {
  state = {
    dataSource: [] as any,
    isSearch: false,
    songList: [] as any,
    total: 0
  };
  componentDidMount() {
    this.handleGetHotSong();
  }
  async handleGetHotSong() {
    const { data, status } = await Appservice.getHotSongList();
    if (status === 200 && data.data.info) {
      this.setState({
        dataSource: data.data.info
      });
    }
  }
  handleSearchClick = value => {
    if (!value) {
      this.setState({
        isSearch: false
      });
      message.info('请输入搜索关键词');
      return false;
    }
    this.handleSearchSong(value);
    this.setState({
      isSearch: true
    });
  };
  async handleSearchSong(keyword) {
    const { data, status } = await Appservice.searchSong(keyword);
    if (status === 200 && data) {
      const total = data.data.total;
      const songList = data.data.info;
      this.setState({
        total,
        songList
      });
    }
  }
  render() {
    const { dataSource, isSearch, songList } = this.state;
    return (
      <Fragment>
        <div style={{ padding: '10px' }}>
          <Search
            placeholder="歌名/歌手/拼音"
            enterButton="搜索"
            size="large"
            onSearch={value => this.handleSearchClick(value)}
          />
        </div>
        {isSearch ? (
          <SongList songList={songList} />
        ) : (
          <Card title="热门搜索" bordered={false}>
            <List
              bordered={false}
              dataSource={dataSource}
              renderItem={item => <List.Item>{item.keyword}</List.Item>}
            />
          </Card>
        )}
      </Fragment>
    );
  }
}
