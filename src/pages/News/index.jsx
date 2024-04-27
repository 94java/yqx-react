import React, { useState } from 'react'
import { NavBar,Avatar } from 'antd-mobile'
import Wrap from '../../components/Wrap'
import LateralSlip from '../../components/LateralSlip'

import './index.less'
export default function News() {
  const [{activeUsers}] = useState({
    // 最常访问用户数据
    activeUsers:[
      {username:'九思.',avatar:'https://www.jiusi.cc/images/tx1.png'},
      {username:'HelloCode.',avatar:'https://www.jiusi.cc/images/tx.png'},
      {username:'凌风',avatar:'https://www.jiusi.cc/images/qq.jpg'},
      {username:'新手么么叽',avatar:'http://mmj.jiusi.cc/blog/image/mmj.jpg'},
      {username:'test1',avatar:''},
      {username:'test2',avatar:''},
      {username:'test3',avatar:''},
    ],
  })

  // 活跃用户
  const activeUserItems = activeUsers.map(item => (
    <div className="user-item" key={item.username}>
        <Avatar src={item.avatar}/>
        <div className="username">{item.username}</div>
    </div>
  ))

  return (
    <div className='news'>
      <NavBar backArrow={false}>动态</NavBar>
      {/* 最常访问 TOP10 */}
      <Wrap title="最常访问" more>
        <LateralSlip>
          {activeUserItems}
        </LateralSlip>
      </Wrap>
    </div>
  )
}
