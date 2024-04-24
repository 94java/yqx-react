import React from 'react'
import { Image,Avatar,Card,Divider  } from 'antd-mobile'
import { EyeOutline, LikeOutline,MessageOutline,MoreOutline } from 'antd-mobile-icons'

import './index.less'

export default function NoteCard({data}) {
  return (
    <Card className='note-card'>
        <div className="header">
            <div className="info">
            <Avatar src={data.user.avatar} />
            <span>{data.user.nickname}</span>
            </div>
            <div className="more">
            <div className="time">{data.updateTime}</div>
            <MoreOutline />
            </div>
        </div>
        <div className="content">
            <Image className="note-pic" src={data.pic}/>
            <div className="note-info">
            <div className="title">{data.title}</div>
            <div className="desc">{data.desc}</div>
            <div className="note-meta">
              <EyeOutline />{data.readNum}<Divider direction='vertical' />
              <LikeOutline />{data.likeNum}<Divider direction='vertical' />
              <MessageOutline />{data.commentNum}
            </div>
            </div>
        </div>
    </Card>
  )
}
