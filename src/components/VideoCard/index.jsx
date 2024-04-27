import React from 'react'
import { Image,Card,Divider } from 'antd-mobile'
import { MovieOutline, LikeOutline,MessageOutline } from 'antd-mobile-icons'

import './index.less'
export default function VideoCard({data}) {
  return (
    <Card className='video-card'>
        <Image className='video-pic' src={data.pic} />
        <div className="video-title">{data.title}</div>
        <div className="video-meta">
        <MovieOutline />{data.playNum}<Divider direction='vertical' />
        <LikeOutline />{data.likeNum}<Divider direction='vertical' />
        <MessageOutline />{data.commentNum}
        </div>
    </Card>
  )
}