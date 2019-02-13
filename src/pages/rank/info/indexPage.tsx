import React, { Component, Fragment } from 'react';
import BaseProps from '../../../declare/baseProps';
import AppService from '../../../services/app';
import { Icon } from 'antd';
import router from 'umi/router';
import SongList from '../../../components/SongList';
import BackBar from '../../../components/BackBar';

export default class RankInfoPage extends Component<BaseProps, any> {
  state = {
    info: {} as any,
    list: [] as any,
    barTop: 0 as Number
  };
  componentDidMount() {
    this.handleGetCurInfo();
    // this.handleBarTop();
  }
  async handleGetCurInfo() {
    const { rankid } = this.props.location.query;
    const { data, status } = await AppService.getCurRankInfo(rankid);
    if (data && status === 200) {
      const info = data.info;
      const list = data.songs.list;
      this.setState({
        info,
        list
      });
    }
  }
  handleBarTop() {
    window.onscroll = function () {
      const barTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.setState({
        barTop
      });
    }.bind(this);
  }
  render() {
    const { rankid } = this.props.location.query;
    const { info, list, barTop } = this.state;
    const bannerurl = info.banner7url;
    return (
      <Fragment>
        <div
          style={{
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
          <BackBar title={info.rankname} />
        </div>
        <SongList songList={list} ranking={true} />
      </Fragment>
    );
  }
}
