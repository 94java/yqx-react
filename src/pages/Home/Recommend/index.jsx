import React, { useState } from 'react'

import { Swiper,Image,Avatar,Card,Divider  } from 'antd-mobile'
import Wrap from '../../../components/Wrap'
import LateralSlip from '../../../components/LateralSlip'

import { MovieOutline, LikeOutline,MessageOutline,MoreOutline } from 'antd-mobile-icons'

import './index.less'


export default function Recommend() {
  const [{swiperData,activeUsers},setState] = useState({
    // 轮播图数据
    swiperData: [
      {title:'【学习笔记】文章导读',img:'https://www.jiusi.cc/update/study_big.png'},
      {title:'【项目实战】瑞吉外卖',img:'https://www.jiusi.cc/update/reggie.png'},
      {title:'应用容器-Docker',img:'https://www.jiusi.cc/update/docker_big.png'},
      {title:'【handsome】美化备忘录',img:'https://www.jiusi.cc/usr/uploads/2022/04/2585527398.png'},
    ],
    // 活跃用户数据
    activeUsers:[
      {username:'九思.',avatar:'https://www.jiusi.cc/images/tx1.png'},
      {username:'HelloCode.',avatar:'https://www.jiusi.cc/images/tx.png'},
      {username:'凌风',avatar:'https://www.jiusi.cc/images/qq.jpg'},
      {username:'新手么么叽',avatar:'http://mmj.jiusi.cc/blog/image/mmj.jpg'},
      {username:'test1',avatar:''},
      {username:'test2',avatar:''},
      {username:'test3',avatar:''},
    ]
  })

  // 轮播图
  const swiperItems = swiperData.map(item => (
    <Swiper.Item key={item.title}>
      <div className='swiper-item'>
        <Image className='swiper-img'  src={item.img} alt=""/>
      </div>
    </Swiper.Item>
  ))

  // 活跃用户
  const activeUserItems = activeUsers.map(item => (
    <div className="user-item" key={item.username}>
        <Avatar src={item.avatar}/>
        <div className="username">{item.username}</div>
    </div>
  ))

  return (
    <div className='recommend'>
      {/* 轮播图 */}
      <Swiper loop autoplay className='recommend-swiper'
        indicator={(total, current) => (
            <div className='swiper-indicator'>
              <div className="swiper-num">
                {`${current + 1} / ${total}`}
              </div>
              <div className="swiper-desc">
                {swiperData[current].title}
              </div>
            </div>
          )}
        >
          {swiperItems}
      </Swiper>

      {/* 活跃作者 TOP10 */}
      <Wrap title="活跃作者 TOP10">
        <LateralSlip>
          {activeUserItems}
        </LateralSlip>
      </Wrap>

      {/* 精选视频 */}
      <Wrap title="精选视频" more className="recommend-video">
        <Card className='video-card'>
          <Image className='video-pic' src='' />
          <div className="video-title">视频标题视频标题视频标题视频标题视频标题视频标题</div>
          <div className="video-meta">
            <MovieOutline />12<Divider direction='vertical' />
            <LikeOutline />333<Divider direction='vertical' />
            <MessageOutline />18
          </div>
        </Card>
        <Card className='video-card'>
          <Image className='video-pic' src='https://www.jiusi.cc/update/linux.png' />
          <div className="video-title">视频标题</div>
          <div className="video-meta">
          <MovieOutline />12<Divider direction='vertical' />
            <LikeOutline />333<Divider direction='vertical' />
            <MessageOutline />18
          </div>
        </Card>
        <Card className='video-card'>
          <Image className='video-pic' src='' />
          <div className="video-title">视频标题</div>
          <div className="video-meta">
            <MovieOutline />12<Divider direction='vertical' />
            <LikeOutline />333<Divider direction='vertical' />
            <MessageOutline />18
          </div>
        </Card>

      </Wrap>

      {/* 精选笔记 */}
      <Wrap title="精选笔记" more className="recommend-note">
          <Card className='note-card'>
            <div className="header">
              <div className="info">
                <Avatar src='' />
                <span>HelloCode.</span>
              </div>
              <div className="more"><MoreOutline /></div>
            </div>
            <div className="content">
              <Image className="note-pic" src=''/>
              <div className="note-info">
                <div className="title">文章标题</div>
                <div className="desc">文章描述</div>
                <div className="note-meta">
                  <MovieOutline />12<Divider direction='vertical' />
                  <LikeOutline />333<Divider direction='vertical' />
                  <MessageOutline />18
                </div>
              </div>
            </div>
          </Card>
      </Wrap>
    </div>
  )
}
