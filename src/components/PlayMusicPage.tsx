import React, { Component } from 'react';
import { Modal, Icon, Row, Col, Slider } from 'antd';
import { connect } from 'dva';
import BaseProps from '../declare/baseProps';

interface Props extends BaseProps {
  isPlayPage?: boolean;
  isPlay?: boolean;
  curSongInfo?: any;
  curSongLrc?: any[];
}

@connect(({ app }) => ({
  isPlayPage: app.isPlayPage,
  curSongInfo: app.curSongInfo,
  isPlay: app.isPlay,
  curSongLrc: app.curSongLrc
}))
export default class PlayMusicPage extends Component<Props, any> {
  state = {
    totalTime: 0,
    currentTime: 0,
    timer: null
  };
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.curSongLrc &&
      nextProps.curSongLrc === this.props.curSongLrc &&
      !this.state.totalTime
    ) {
      const audio = document.getElementById('audio');
      const totalTime = audio.duration;
      this.setState({
        totalTime: parseInt(totalTime, 10)
      });
      this.handleSlideMove();
    }
    if (nextProps.curSongLrc !== this.props.curSongLrc) {
      this.setState({
        currentTime: 0
      });
      this.setState({
        timer: null
      });
      this.handleSlideMove();
    }
  }
  handleSlideMove() {
    const { totalTime } = this.state;
    const timer = setInterval(() => {
      const currentTime = this.state.currentTime + 1;
      if (currentTime === totalTime) {
        this.props.dispatch({
          type: 'app/playNextSong'
        });
        return false;
      }
      this.setState({
        currentTime
      });
    }, 1000);
    this.setState({
      timer
    });
  }
  handlePlay = () => {
    const { isPlay, curSongInfo } = this.props;
    if (curSongInfo.song_name === undefined) {
      return false;
    }
    this.props.dispatch({
      type: 'app/updateState',
      payload: {
        isPlay: !isPlay
      }
    });
    const audio = document.getElementById('audio');
    isPlay ? audio.pause() : audio.play();
  };
  handleSetCurTime = value => {
    this.setState({
      currentTime: value
    });
    const audio = document.getElementById('audio');
    audio.currentTime = value;
  };
  SetCurTimeDone = () => {
    this.handleSlideMove();
  };
  render() {
    const { curSongInfo, isPlayPage, isPlay, curSongLrc } = this.props;
    const titStyle = {
      color: '#fff',
      margin: 0
    };
    const titDom = (
      <Row type="flex" justify="center">
        <Col span={4}>
          <Icon
            onClick={() =>
              this.props.dispatch({
                type: 'app/updateState',
                payload: { isPlayPage: false }
              })
            }
            type="left"
            className="back"
            style={{ fontSize: '35px', color: '#Fff' }}
          />
        </Col>
        <Col span={16} style={{ textAlign: 'center' }}>
          <p style={{ ...titStyle }}>{curSongInfo.song_name}</p>
          <p style={{ ...titStyle }}>{curSongInfo.author_name}</p>
        </Col>
        <Col span={4}>
          <Icon type="share" />
        </Col>
      </Row>
    );
    return (
      <Modal
        title={titDom}
        visible={isPlayPage}
        closable={false}
        footer={null}
        className="play-page"
        destroyOnClose={false}
        key={1}
      >
        <div className="dish">
          <img
            className={isPlay ? 'pic active' : 'pic'}
            src={curSongInfo.img}
            alt=""
          />
        </div>
        <div className="lyric">
          <ul>
            {curSongLrc.map((item, index) => (
              <li key={index}>{item.lrcContent}</li>
            ))}
          </ul>
        </div>
        <Slider
          value={this.state.currentTime}
          min={0}
          max={this.state.totalTime}
          // onChange={this.handleSetCurTime}
          // onAfterChange={this.SetCurTimeDone}
        />
        <div className="opation">
          <Icon
            type="fast-backward"
            onClick={() => this.props.dispatch({ type: 'app/playPrevSong' })}
          />
          <span onClick={() => this.handlePlay()}>
            {isPlay ? (
              <Icon type="pause-circle-o" style={{ fontSize: '48px' }} />
            ) : (
              <Icon type="play-circle-o" style={{ fontSize: '48px' }} />
            )}
          </span>
          <Icon
            type="fast-forward"
            onClick={() => this.props.dispatch({ type: 'app/playNextSong' })}
          />
        </div>
      </Modal>
    );
  }
}
