import React, { useState,useRef } from 'react'

import { Dropdown,NavBar,Radio, Space,List,Tag } from 'antd-mobile'
import { LikeOutline,EyeOutline,LinkOutline,ClockCircleOutline } from 'antd-mobile-icons'

import './index.less'
import { useNavigate } from 'react-router-dom'
export default function QuestionBank() {
  const navigate = useNavigate()
  // 下拉菜单
  const dropRef = useRef(null)
  // state
  const [{bankCategory,sortList,sortTitle,categoryTitle,categoryList},setState] = useState({
    // 题库分类
    bankCategory:[
      {id:'0',title:'全部题库'},
      {id:'1',title:'历年真题'},
      {id:'2',title:'难题挑战'},
      {id:'3',title:'专项练习'},
      {id:'4',title:'考研考公'}
    ],
    // 排序
    sortList:[
      {id:'0',title:'默认排序'},
      {id:'1',title:'难度排序'},
      {id:'2',title:'题量排序'},
    ],
    // 下拉菜单-显示名称
    categoryTitle:'全部题库',
    sortTitle:'默认排序',
    // 题库集合
    categoryList:[
      {id:'1',title:'Java专项练习',difficulty:'0',browse:13,num:21,like:312,time:'2023-04-21'},
      {id:'2',title:'数据结构专项练习',difficulty:'1',browse:21,num:2,like:239,time:'2024-04-21'},
      {id:'3',title:'React专项练习',difficulty:'2',browse:51,num:231,like:134,time:'2024-05-01'},
    ]
  })

  // 题库变更
  function handleCategoryChange(val){
    setState(pre => ({...pre,categoryTitle:bankCategory[val].title}))
    dropRef.current?.close()
  }

  // 排序方式变更
  function handleSortChange(val){
    setState(pre => ({...pre,sortTitle:sortList[val].title}))
    dropRef.current?.close()
  }

  // 跳转题库详情页
  function handleCategoryDetail(id){
    navigate(`detail?id=${id}`)
  }

  // 题库分类
  const bankCategoryItems = (
    <Radio.Group defaultValue='0'>
      <Space direction='vertical' block>
        {
          bankCategory.map(item => (
            <Radio block value={item.id} key={item.id} onChange={() => {handleCategoryChange(item.id)}}>
              {item.title}
            </Radio>
          ))
        }
      </Space>
    </Radio.Group>
  ) 

  // 排序方式
  const sortItems = (
    <Radio.Group defaultValue='0'>
      <Space direction='vertical' block>
        {
          sortList.map(item => (
            <Radio block value={item.id} key={item.id} onChange={() => {handleSortChange(item.id)}}>
              {item.title}
            </Radio>
          ))
        }
      </Space>
    </Radio.Group>
    
  )

  // 题库集合列表
  const categoryItems = categoryList.map(item => (
    <List.Item description={
      <>
        <EyeOutline /> {item.browse}
        <LinkOutline /> {item.num}
        <LikeOutline /> {item.like}
        <ClockCircleOutline /> {item.time}
      </>
    } clickable key={item.id} onClick={() => handleCategoryDetail(item.id)}>
      {item.title}
      <Tag color={item.difficulty === '0' ? 'success' : (item.difficulty === '1' ? 'primary' : 'danger')}>
        {item.difficulty === '0' ? '简单' : (item.difficulty === '1' ? '一般' : '困难')}
      </Tag>
    </List.Item>
  ))

  return (
    <div className='question-bank'>
      <NavBar backArrow={false}>题库</NavBar>
      {/* 下拉菜单-筛选/排序 */}
      <Dropdown ref={dropRef} className='drop'>
        <Dropdown.Item key='category' title={categoryTitle}>
          <div style={{ padding: 10 }}>
            {bankCategoryItems}
          </div>
        </Dropdown.Item>
        <Dropdown.Item key='sort' title={sortTitle}>
          <div style={{ padding: 12 }}>
            {sortItems}
          </div>
        </Dropdown.Item>
      </Dropdown>

      {/* 题库列表 */}
      <div className="bank-list">
        <List className='bank-item'>
          {categoryItems}
        </List>
      </div>
    </div>
  )
}
