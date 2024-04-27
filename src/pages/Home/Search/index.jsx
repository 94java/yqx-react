import React from 'react'

import { LeftOutline } from 'antd-mobile-icons'
import { SearchBar,Button,Tabs,Empty } from 'antd-mobile'

import './index.less'
import { useNavigate } from 'react-router-dom'
export default function Search() {
  const navigate = useNavigate()
  function goBack(){
    navigate(-1)
  }
  return (
    <div className='search'>
        <div className="header">
            <LeftOutline onClick={goBack}/>
            <SearchBar
                placeholder='请输入搜索内容'
                style={{
                    '--border-radius': '12px',
                    '--background': '#ffffff',
                    '--height': '32px',
                    '--padding-left': '12px',
                }}
            />
            <Button color='primary' fill='solid' size='small'>搜索</Button>
        </div>
        <div className="content">
          <Tabs style={{
            '--title-font-size': '15px',
          }}>
            <Tabs.Tab title='笔记' key='fruits'>
              笔记
            </Tabs.Tab>
            <Tabs.Tab title='视频' key='vegetables'>
              <Empty style={{ padding: '64px 0' }} imageStyle={{ width: 128 }} description='暂无数据' />
            </Tabs.Tab>
          </Tabs>
        </div>
    </div>
  )
}
