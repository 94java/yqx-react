import React from 'react'

import { SearchOutline } from 'antd-mobile-icons'
import { Avatar } from 'antd-mobile'

import './index.less'

export default function Home() {
  return (
    <div className='home'>
        {/* 顶部导航栏 */}
        <div className="nav">
            <div className="search">
                <SearchOutline />
                <span>请输入搜索关键词</span>
            </div>
            <div className="avatar">
                <Avatar src='' />
            </div>
        </div>
        
    </div>
  )
}
