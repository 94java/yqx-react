import React from 'react'
import { TabBar } from 'antd-mobile'
import {
  AppOutline,
  CompassOutline,
  AntOutline,
  UserOutline,
} from 'antd-mobile-icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import './index.less'

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { pathname } = location

  const setRouteActive = (value) => {
    navigate(value)
  }


  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/question-bank',
      title: '题库',
      icon: <AntOutline />,
    },
    {
      key: '/news',
      title: '动态',
      icon: <CompassOutline />,
    },
    {
      key: '/profile',
      title: '我的',
      icon: <UserOutline />,
    },
  ]


  return (
    <div className='layout'>
      <Outlet/>
      <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  )
}
