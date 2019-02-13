import React, { Component } from 'react';
import { Layout, Spin } from 'antd';
import BaseProps from '../declare/baseProps';
import { connect } from 'dva';
import PlayMusicPage from '../components/PlayMusicPage';
const { Content } = Layout;

@connect(({ app }) => ({
  loading: app.loading,
  curSongInfo: app.curSongInfo
}))
export default class ContentLayout extends Component<BaseProps, any> {
  render() {
    return (
      <Content style={{ marginTop: 90 }}>
        {/* <Spin
          size="large"
          spinning={this.props.loading}
          delay={2000}
          tip="拼命加载中..."
        > */}
          {this.props.children}
        {/* </Spin> */}
        <PlayMusicPage />
        <audio
          src={this.props.curSongInfo.play_url}
          autoPlay
          id="audio"
          // controls
        />
      </Content>
    );
  }
}
