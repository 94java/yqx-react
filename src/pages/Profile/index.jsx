import React from 'react'
import { NavBar,Grid,Avatar,Space,List } from 'antd-mobile'
import { RightOutline,FileWrongOutline,HeartOutline,ClockCircleOutline } from 'antd-mobile-icons'

import './index.less'
export default function Profile() {
  return (
    <div className='profile'>
      <NavBar backArrow={false}>个人信息</NavBar>
      <div className="base-info">
        <div className="user"><Avatar src='' />HelloCode.</div>
        <Space className='user-home'>
          <span>个人主页</span>
          <RightOutline />
        </Space>
      </div>
      {/* 统计数据 */}
      <Grid className='stats' columns={4} gap={2}>
        <Grid.Item>
          <div>12</div>关注
        </Grid.Item>
        <Grid.Item>
          <div>122</div>粉丝
        </Grid.Item>
        <Grid.Item>
          <div>1032</div>访问
        </Grid.Item>
        <Grid.Item>
          <div>1</div>排名
        </Grid.Item>
      </Grid>
      {/* 用户菜单-错题本、点赞、历史记录 */}
      <Grid className='user-nav' columns={3} gap={2}>
        <Grid.Item>
          <FileWrongOutline /><div>错题本</div>
        </Grid.Item>
        <Grid.Item>
        <HeartOutline /><div>点赞</div>
        </Grid.Item>
        <Grid.Item>
          <ClockCircleOutline /><div>历史</div>
        </Grid.Item>
      </Grid>
      {/* 列表 */}
      <List mode='card' className='user-more'>
        <List.Item onClick={() => {}}>
          自媒体中心
        </List.Item>
        <List.Item onClick={() => {}}>
          意见反馈
        </List.Item>
        <List.Item onClick={() => {}}>帮助中心</List.Item>
        <List.Item onClick={() => {}}>退出登录</List.Item>
    </List>
    </div>
  )
}
