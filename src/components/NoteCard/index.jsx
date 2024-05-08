import React from 'react'
import { Image,Avatar,Card,Divider  } from 'antd-mobile'
import { EyeOutline, LikeOutline,MessageOutline,MoreOutline } from 'antd-mobile-icons'

import './index.less'
import { dateFtt } from '../../utils/date'

export default function NoteCard({ data }) {
  
  return (
    <Card className="note-card">
      <div className="header">
        <div className="info">
          <Avatar src={data.user?.avatar} />
          <span>{data.user?.nickname}</span>
        </div>
        <div className="more">
          <div className="time">
            {dateFtt("yyyy-MM-dd HH:mm:ss", new Date(data.updateTime))}
          </div>
          <MoreOutline />
        </div>
      </div>
      <div className="content">
        <Image className="note-pic" src={data?.coverImg} />
        <div className="note-info">
          <div className="title">{data.title}</div>
          <div className="desc">{data.summary}</div>
          <div className="note-meta">
            <EyeOutline />
            {data.views}
            <Divider direction="vertical" />
            <LikeOutline />
            {data.likes}
            <Divider direction="vertical" />
            <MessageOutline />
            {data.commentNum}
          </div>
        </div>
      </div>
    </Card>
  );
}
