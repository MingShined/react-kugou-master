import React, { Component } from 'react';
import { Modal } from 'antd';

const IntroModal = props => {
  return (
    <Modal
      title={props.title}
      visible={props.flag ? props.flag : false}
      onCancel={() => props.getModalFlag(false)}
      footer={null}
      bodyStyle={{ height: 300, overflow: 'scroll', lineHeight: '25px' }}
    >
      <p>{props.intro}</p>
    </Modal>
  );
};
export default IntroModal;