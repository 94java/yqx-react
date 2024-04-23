import React from 'react'

import { SearchOutline } from 'antd-mobile-icons'
import { Avatar, Tabs } from 'antd-mobile'

import './index.less'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function Home() {
    const location = useLocation()
    const navigate = useNavigate()
    const { pathname } = location

    const setRouteActive = (value) => {
        navigate(value)
    }

    const tabs = [
        {
            key: '/home/recommend',
            title: '推荐',
        },
        {
            key: '/home/note',
            title: '笔记',
        },
        {
            key: '/home/video',
            title: '视频',
        },
        {
            key: '/home/resource',
            title: '资源',
        },
    ]

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

        {/* 首页Tabs */}
        <Tabs className='home-tabs' activeKey={pathname} onChange={value => setRouteActive(value)}>
          {tabs.map(item => <Tabs.Tab title={item.title} key={item.key} />)}
        </Tabs>

        {/* 子组件占位 */}
        <Outlet/>
    </div>
  )
}
