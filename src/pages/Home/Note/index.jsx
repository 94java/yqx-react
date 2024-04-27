import React, { useState } from 'react'
import { CapsuleTabs } from 'antd-mobile'
import NoteCard from '../../../components/NoteCard'

import './index.less'
export default function Note() {
  const [{categoryList,noteList}] = useState({
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
    // 笔记信息
    noteList:[
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

  // 分类-笔记信息
  const items = categoryList.map((item) => (
    <CapsuleTabs.Tab title={item.title} key={item.id}>
      {
        noteList.map((noteItem,index) => (
          <NoteCard data={noteItem} key={index}/>
        ))
      }
    </CapsuleTabs.Tab>
  ))

  return (
    <div className='note'>
        <CapsuleTabs className='category' defaultActiveKey='1'>
          {items}
        </CapsuleTabs>
    </div>
  )
}
