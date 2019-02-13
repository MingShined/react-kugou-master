import React, { Component } from 'react';
import BaseProps from '../declare/baseProps';
import { connect } from 'dva';

@connect()
export default class MusciLoading extends Component<BaseProps, any> {
  render() {
    return (
      <div
        className="loader-inner line-scale-pulse-out"
        style={this.props.styles}
        onClick={() =>
          this.props.dispatch({
            type: 'app/updateState',
            payload: { isPlayPage: true }
          })
        }
      >
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}
