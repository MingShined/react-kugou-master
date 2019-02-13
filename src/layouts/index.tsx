import React, { Component } from 'react';
import BaseProps from '../declare/baseProps';
import { Layout } from 'antd';
import HeaderLayout from './HeaderLayout';
import ContentLayout from './ContentLayout';
import FooterLayout from './FooterLayout';
const { Header, Content, Footer } = Layout;

const MainLayout = props => {
  return (
    <Layout>
      <HeaderLayout />
      <ContentLayout children={props.children} />
      <FooterLayout />
    </Layout>
  );
};

export default MainLayout;
