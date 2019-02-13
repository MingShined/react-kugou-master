import React, { Component } from 'react';
import BaseProps from '../../declare/baseProps';
import { List, Avatar, Icon } from 'antd';
import AppService from '../../services/app';
import styles from './indexPage.less';
import { routerActions } from 'react-router-redux';
import router from 'umi/router';
import { connect } from 'dva';

@connect()
export default class RankPage extends Component<BaseProps, any> {
  state = {
    dataSource: [] as any
  };
  componentDidMount() {
    this.handleGetData();
  }
  async handleGetData() {
    const { data, status } = await AppService.getRankListData();
    if (data && status === 200) {
      const dataSource = data.rank.list;
      this.setState({
        dataSource
      });
      this.props.dispatch({
        type: 'app/updateState',
        payload: {
          loading: true
        }
      });
    }
  }

  render() {
    const dataSource = this.state.dataSource;
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <div onClick={() => router.push(`/rank/info?rankid=${item.rankid}`)}>
            <List.Item
              className="rank"
              // tslint:disable-next-line:jsx-key
              actions={[<Icon type="right" style={{ fontSize: '25px' }} />]}
              key={item.id}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.imgurl.replace(/{size}/g, 400)} />}
                title={
                  <a
                    href="javascript:;"
                    style={{ fontSize: '16px', lineHeight: '70px' }}
                  >
                    {item.rankname}
                  </a>
                }
              />
            </List.Item>
          </div>
        )}
      />
    );
  }
}
