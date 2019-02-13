import React, { Component, Fragment } from 'react';
import BaseProps from '../declare/baseProps';
import ReactSwiper from 'reactjs-swiper';

export default class Banner extends Component<BaseProps, any> {
  render() {
    const { bannerList } = this.props;
    const items = [];
    if (bannerList) {
      bannerList.forEach(item => {
        items.push({
          image: item.imgurl,
          link: item.extra.tourl
        });
      });
    }
    const swiperOptions = {
      preloadImages: true,
      autoplay: 3000,
      autoplayDisableOnInteraction: false
    };
    return (
      <div style={{ backgroundColor: '#d43c33', marginBottom: '20px' }}>
        {items.length > 0 ? (
          <ReactSwiper
            swiperOptions={swiperOptions}
            showPagination
            items={items}
            className="main-banner"
          />
        ) : null}
      </div>
    );
  }
}
