import React, { Component } from 'react';
import { Layout, Col, Row, Icon, Input } from 'antd';
import BaseProps from '../declare/baseProps';
import Nav from '../components/Nav';
import MusicLoading from '../components/MusicLoading';
import router from 'umi/router';
const { Header } = Layout;

export default class HeaderLayout extends Component<BaseProps, any> {
  render() {
    return (
      <Header
        style={{
          position: 'fixed',
          zIndex: 100,
          width: '100%'
        }}
      >
        <Row
          className="logo-wrap"
          type="flex"
          justify="center"
          align="middle"
          gutter={12}
        >
          <Col span={6} className="logo" onClick={() => router.push('/')} />
          <Col span={14} onClick={() => router.push('/search')}>
            <div
              style={{
                textAlign: 'center',
                height: 50,
                color: '#fff',
                fontSize: '18px'
              }}
            >
              海量音乐、点我搜索
            </div>
            {/* <Input
              type="text"
              placeholder="给你推荐 男孩"
              prefix={<Icon type="search" />}
            /> */}
          </Col>
          <Col span={4}>
            <MusicLoading styles={{ marginTop: 25, width: 100 }} />
          </Col>
        </Row>
        <Nav />
      </Header>
    );
  }
}
