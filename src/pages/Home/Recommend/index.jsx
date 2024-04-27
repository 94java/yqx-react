import React, { useState } from 'react'

import { Swiper,Image,Avatar } from 'antd-mobile'
import Wrap from '../../../components/Wrap'
import LateralSlip from '../../../components/LateralSlip'

import './index.less'
import VideoCard from '../../../components/VideoCard'
import NoteCard from '../../../components/NoteCard'


export default function Recommend() {
  const [{swiperData,activeUsers,recommendVideos,recommendNotes}] = useState({
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
    ],
    // 精选视频数据
    recommendVideos:[
      {
        title:'小米三年就造出这么个SU7？',
        pic:'http://imgs.jiusi.cc/202404241010044.png',
        playNum:'12',
        likeNum:'34',
        commentNum:'58',
      },
      {
        title:'《原神》角色演示-「阿蕾奇诺：摇篮曲」',
        pic:'http://imgs.jiusi.cc/202404241011921.png',
        playNum:'12',
        likeNum:'34',
        commentNum:'58',
      },
      {
        title:'史上最烂手机芯片！骁龙810到底有多差？',
        pic:'http://imgs.jiusi.cc/202404241011906.png',
        playNum:'12',
        likeNum:'34',
        commentNum:'58',
      },
      {
        title:'韩国人为什么喜欢吃咸菜？最多的盘子装最少的咸菜',
        pic:'http://imgs.jiusi.cc/202404241012850.png',
        playNum:'12',
        likeNum:'34',
        commentNum:'58',
      },
      {
        title:'符玄：青雀你开的什么车啊？',
        pic:'http://imgs.jiusi.cc/202404241013744.png',
        playNum:'12',
        likeNum:'34',
        commentNum:'58',
      },
    ],
    // 精选笔记数据
    recommendNotes:[
      {
        user:{nickname:'九思.', avatar:'https://www.jiusi.cc/images/tx1.png'},
        title:'免费使用ChatGPT 4.0 和 文心一言 4.0',
        pic:'http://imgs.jiusi.cc/202404241013289.png',
        desc:'今天给大家分享如何免费使用ChatGPT4.0 和 文心一言 4.0，废话就不多说了，我们直接入正题。',
        updateTime:'2022年11月19日 11:58',
        readNum: 1282,
        likeNum: 356,
        commentNum: 16
      },
      {
        user:{nickname:'HelloCode.', avatar:'https://www.jiusi.cc/images/tx.png'},
        title:'MATLAB 数据类型',
        pic:'http://imgs.jiusi.cc/202404241014803.png',
        desc:'MATLAB 不需要任何类型声明或维度语句。每当 MATLAB 遇到一个新的变量名，它就创建变量并分配适当的内存空间。',
        updateTime:'2022年11月19日 11:58',
        readNum: 1282,
        likeNum: 356,
        commentNum: 16
      },
      {
        user:{nickname:'九思.', avatar:'https://www.jiusi.cc/images/tx1.png'},
        title:'JWT原理解析',
        pic:'http://imgs.jiusi.cc/202404241016260.png',
        desc:'用户登录后，后端服务根据JWT规则生成token给到前端，前端之后的请求都会携带这个token访问后端接口，后端对这些请求校验token，保障token的有效性，进而确保是合法请求；JWT非常契合单点登录，因为JWT的后端认证不需要额外访问存储信息，只需要一个秘钥就可以自认证；JWT由于包含了认证的用户信息，那么就不需要后端服务再额外保存这些认证信息，所以节省了后端的资源；由于JWT生成的token可以包含业务信息，而且这些业务信息是参与了签名的，所以保障了这些业务信息不被篡改，而且还有有效时间范围；',
        updateTime:'2022年11月19日 11:58',
        readNum: 1282,
        likeNum: 356,
        commentNum: 16
      },
      {
        user:{nickname:'新手么么叽', avatar:'http://mmj.jiusi.cc/blog/image/mmj.jpg'},
        title:'暴力数据结构之单链表专题',
        pic:'http://imgs.jiusi.cc/202404241015007.png',
        desc:'【代码】暴力数据结构之单链表专题。',
        updateTime:'2022年11月19日 11:58',
        readNum: 1282,
        likeNum: 356,
        commentNum: 16
      },
      {
        user:{nickname:'九思.', avatar:'https://www.jiusi.cc/images/tx1.png'},
        title:'计算机网络相关知识总结',
        pic:'http://imgs.jiusi.cc/202404241017519.png',
        desc:'计算机网络相关知识总结',
        updateTime:'2022年11月19日 11:58',
        readNum: 1282,
        likeNum: 356,
        commentNum: 16
      },
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

  // 精选视频
  const recommendVideoItems = recommendVideos.map((item,index) => (
    <VideoCard data={item} key={index}/>
  ))

  // 精选笔记
  const recommendNoteItems = recommendNotes.map((item,index) => (
    <NoteCard data={item} key={index}/>
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
      <Wrap title="精选视频" more className="recommend-video" to='/home/video'>
        {recommendVideoItems}
      </Wrap>

      {/* 精选笔记 */}
      <Wrap title="精选笔记" more className="recommend-note" to='/home/note'>
        {recommendNoteItems}
      </Wrap>
    </div>
  )
}
