import React, { Component } from 'react';
import BaseProps from '../../declare/baseProps';
import { List, Icon, Avatar } from 'antd';
import AppService from '../../services/app';
import router from 'umi/router';
import { spawn } from 'child_process';

export default class SongPage extends Component<BaseProps, any> {
  state = {
    dataSource: [] as any
  };
  componentDidMount() {
    this.handleGetData();
  }
  async handleGetData() {
    const { data, status } = await AppService.getSongSortList();
    if (data && status === 200) {
      const dataSource = data.plist.list.info;
      this.setState({
        dataSource
      });
    }
  }
  render() {
    const { dataSource } = this.state;
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        className="song"
        renderItem={item => (
          <div onClick={() => router.push(`/song/info?specialid=${item.specialid}`)}>
            <List.Item
              // tslint:disable-next-line:jsx-key
              actions={[<Icon type="right" style={{ fontSize: '25px' }} />]}
              key={item.specialid}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.imgurl.replace(/{size}/g, 400)} />}
                title={
                  <a
                    href="javascript:;"
                    style={{ fontSize: '14px' }}
                  >
                    {item.specialname}
                  </a>
                }
                description={<div style={{ marginTop: '10px' }}>
                <Icon type="customer-service" />{item.playcount}</div>}
              />
            </List.Item>
          </div>
        )}
      />
    );
  }
}
