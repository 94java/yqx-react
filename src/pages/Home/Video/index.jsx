import React, { useState } from 'react'
import { CapsuleTabs } from 'antd-mobile'
import VideoCard from '../../../components/VideoCard'


import './index.less'
export default function Video() {
  const [{categoryList,videoList}] = useState({
    // 分类列表信息
    categoryList:[
      {id:'1',title:'知识总结'},
      {id:'2',title:'实验报告'},
      {id:'3',title:'实战案例'},
      {id:'4',title:'考试考证'},
      {id:'5',title:'读书笔记'},
      {id:'6',title:'论文阅读'},
      {id:'7',title:'考试经验'}
    ],
    // 视频信息
    videoList:[
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
    ]
  })

  // 分类-笔记信息
  const items = categoryList.map((item) => (
    <CapsuleTabs.Tab title={item.title} key={item.id}>
      {
        videoList.map((noteItem,index) => (
          <VideoCard data={noteItem} key={index}/>
        ))
      }
    </CapsuleTabs.Tab>
  ))

  return (
    <div className='video'>
        <CapsuleTabs className='category' defaultActiveKey='1'>
          {items}
        </CapsuleTabs>
    </div>
  )
}
