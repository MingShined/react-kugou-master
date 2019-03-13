import React, { Component } from 'react';
import BaseProps from '../declare/baseProps';
import { Row, Col } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';

interface Props extends BaseProps {
  name?: string;
  path?: string;
}
@connect(({ app }) => ({
  linkIndex: app.linkIndex
}))
export default class Nav extends Component<Props, any> {
  state = {
    mainNavArr: [
      {
        name: '新歌',
        path: '/'
      },
      {
        name: '排行',
        path: '/rank'
      },
      {
        name: '歌单',
        path: '/song'
      },
      {
        name: '歌手',
        path: '/singer'
      }
    ]
  };
  handleLinkClick = index => {
    this.props.dispatch({
      type: 'app/updateState',
      payload: {
        linkIndex: index,
        loading: true
      }
    });
  };
  render() {
    const { mainNavArr } = this.state;
    const { linkIndex } = this.props;
    return (
      <Row style={{ height: 43 }} type="flex" justify="space-around">
        {mainNavArr.map((item, index) => (
          <Col
            style={{
              textAlign: 'center',
              fontSize: '16px',
              height: 43,
              lineHeight: '43px'
            }}
            key={index}
            span={4}
          >
            <Link to={item.path} className="link-active">
              <span
                className={index === linkIndex ? 'active' : ''}
                onClick={() => this.handleLinkClick(index)}
              >
                {item.name}
              </span>
            </Link>
          </Col>
        ))}
      </Row>
    );
  }
}
