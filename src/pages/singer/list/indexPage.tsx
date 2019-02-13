import React, { Component, Fragment } from 'react';
import { List, Avatar, Icon } from 'antd';
import styles from './indexPage.less';
import { routerActions } from 'react-router-redux';
import router from 'umi/router';
import { connect } from 'dva';
import BaseProps from '../../../declare/baseProps';
import AppService from '../../../services/app';
import BackBar from '../../../components/BackBar';

export default class SingerListPage extends Component<BaseProps, any> {
  state = {
    classname: '' as String,
    singerList: [] as any
  };
  componentDidMount() {
    this.getSingerList();
  }
  async getSingerList() {
    const { listId } = this.props.location.query;
    const { data, status } = await AppService.getSingerList(listId);
    if (status === 200 && data) {
      const classname = data.classname;
      const singerList = data.singers.list.info;
      this.setState({
        classname,
        singerList
      });
    }
  }
  render() {
    const { classname, singerList } = this.state;
    return (
      <Fragment>
        <div style={{ marginBottom: '40px' }}>
          <BackBar title={classname} />
        </div>
        <List
          itemLayout="horizontal"
          dataSource={singerList}
          renderItem={item => (
            <div
              onClick={() =>
                router.push(`/singer/info?singerId=${item.singerid}`)
              }
            >
              <List.Item
                className="rank"
                // tslint:disable-next-line:jsx-key
                actions={[<Icon type="right" style={{ fontSize: '25px' }} />]}
                key={item.singerid}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.imgurl.replace(/{size}/g, 400)} />}
                  title={
                    <a
                      href="javascript:;"
                      style={{ fontSize: '16px', lineHeight: '70px' }}
                    >
                      {item.singername}
                    </a>
                  }
                />
              </List.Item>
            </div>
          )}
        />
      </Fragment>
    );
  }
}
