import React, { Component, Fragment } from 'react';
import BaseProps from '../declare/baseProps';
import Banner from '../components/Banner';
import AppService from '../services/app';
import SongList from '../components/SongList';
import { connect } from 'dva';

interface State {
  data: any[];
  songList: any[];
}

interface Props extends BaseProps {
  data: Object[];
  songList: String[];
}
@connect()
export default class IndexPage extends Component<Props, State> {
  state = {
    data: [] as any,
    songList: []
  };
  componentDidMount() {
    this.handleGetData();
  }
  async handleGetData() {
    const { data, status } = await AppService.getMainPageData();
    if (status === 200 && data) {
      const songList = [];
      data.data.forEach(item => {
        songList.push(item.filename);
      });
      this.setState(
        {
          data,
          songList
        },
        () => {
          this.props.dispatch({
            type: 'app/updateState',
            payload: {
              loading: false
            }
          });
        }
      );
    }
  }
  render() {
    const { data, songList } = this.state;
    return (
      <Fragment>
        <Banner bannerList={data.banner ? data.banner : data} />
        <SongList songList={data.data ? data.data : []} />
      </Fragment>
    );
  }
}
