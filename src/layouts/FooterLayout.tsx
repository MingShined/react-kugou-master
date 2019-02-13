import React, { Component } from 'react';
import { Layout } from 'antd';
import BaseProps from '../declare/baseProps';
const { Footer } = Layout;

export default class FooterLayout extends Component<BaseProps, any> {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        @陈先生有酒有故事
      </Footer>
    );
  }
}
