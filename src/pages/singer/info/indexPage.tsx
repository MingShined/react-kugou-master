import React, { Component, Fragment } from 'react';
import BaseProps from '../../../declare/baseProps';
import AppService from '../../../services/app';
import { Icon, Button, Modal } from 'antd';
import router from 'umi/router';
import SongList from '../../../components/SongList';
import BackBar from '../../../components/BackBar';
import IntroModal from '../../../components/IntroModal';

export default class SongInfoPage extends Component<BaseProps, any> {
  state = {
    info: {} as any,
    list: [] as any,
    barTop: 0 as Number,
    flag: false
  };
  componentDidMount() {
    this.handleGetCurInfo();
  }
  async handleGetCurInfo() {
    const { singerId } = this.props.location.query;
    const { data, status } = await AppService.getCurSingerSongs(singerId);
    if (data && status === 200) {
      const info = data.info;
      const list = data.songs.list;
      this.setState({
        info,
        list
      });
    }
  }
  render() {
    const { rankid } = this.props.location.query;
    const { info, list, barTop, flag } = this.state;
    const bannerurl = info.imgurl;
    return (
      <Fragment>
        <div
          style={{
            position: 'relative',
            marginTop: '40px',
            backgroundImage: `url(${
              bannerurl ? bannerurl.replace(/{size}/g, 400) : ''
            })`,
            height: 200,
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        >
          <BackBar title={info.singername} />
          <Button
            style={{
              position: 'absolute',
              right: '20px',
              bottom: '20px',
              backgroundColor: '#d43c33',
              //   color: '#333',
              border: 'none'
            }}
            onClick={() => this.setState({ flag: true })}
            type="primary"
          >
            查看简介
          </Button>
        </div>
        <SongList songList={list} ranking={false} />
        <IntroModal
          title="歌手简介"
          intro={info.intro}
          getModalFlag={value => this.setState({ flag: value })}
          flag={flag}
        />
      </Fragment>
    );
  }
}
