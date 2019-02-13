import React, { Component } from 'react';
import BaseProps from '../../declare/baseProps';
import { List, Icon } from 'antd';
import singerList from './singerList';
import router from 'umi/router';

export default class SingerPage extends Component<BaseProps, any> {
  render() {
    return (
      <div>
        <List
          size="large"
          dataSource={singerList}
          renderItem={(item, index) => (
            <div onClick={() => router.push(`/singer/list?listId=${item.listId}`)}>
              <List.Item
                style={{ margin: '0 20px', color: '#333' }}
                // tslint:disable-next-line:jsx-key
                actions={[<Icon type="right" />]}
                key={item.listId}
              >
                {item.name}
              </List.Item>
            </div>
          )}
        />
      </div>
    );
  }
}
