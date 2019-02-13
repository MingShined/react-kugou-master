import React, { Component } from 'react';
import BaseProps from '../declare/baseProps';
import { Icon } from 'antd';
import router from 'umi/router';

const BackBar = props => {
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 90,
        height: 40,
        zIndex: 50,
        width: '100%',
        textAlign: 'center',
        // backgroundColor: barTop > 291 ? '#d43c33' : 'none',
        backgroundColor: '#d43c33',
        lineHeight: '40px',
        color: '#fff'
      }}
    >
      <Icon
        type="left"
        onClick={() => router.go(-1)}
        style={{
          position: 'absolute',
          left: 0,
          fontSize: '30px',
          float: 'left',
          margin: '5px 0 0 15px'
        }}
      />
      <span style={{ fontSize: '17px' }}>{props.title}</span>
    </div>
  );
};

export default BackBar;