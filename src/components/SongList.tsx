import React, { Component } from 'react';
import BaseProps from '../declare/baseProps';
import { List, Icon } from 'antd';
import { connect } from 'dva';

@connect()
export default class SongList extends Component<BaseProps, any> {
  handlePlayMusic = (hash, index) => {
    this.props.dispatch({
      type: 'app/getCurSongInfo',
      payload: hash
    });
    this.props.dispatch({
      type: 'app/updateState',
      payload: {
        isPlay: true,
        curSongIndex: index,
        curSongList: this.props.songList
      }
    });
  };
  render() {
    const iconStyle = {
      fontSize: '20px',
      color: '#333'
    };
    return (
      <List
        size="large"
        dataSource={this.props.songList}
        renderItem={(item, index) => (
          <List.Item
            style={{ margin: '0 20px', color: '#333' }}
            // tslint:disable-next-line:jsx-key
            actions={[<Icon type="download" style={{ ...iconStyle }} />]}
            key={item.filename}
          >
            <span onClick={() => this.handlePlayMusic(item.hash, index)}>
              <span style={{ marginRight: '10px' }}>
                {this.props.ranking ? index + 1 : ''}
              </span>
              {item.filename}
            </span>
          </List.Item>
        )}
      />
    );
  }
}
