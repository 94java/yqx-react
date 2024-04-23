import React from 'react'
import { RightOutline } from 'antd-mobile-icons'
import './index.less'

export default function Wrap(props) {
  return (
    <div className={props.more ? "wrap wrap-link" : "wrap"}>
        <div className="header">
            <div className='wrap-title'>{props.title}</div>
            {props.more && <div className="more">更多<RightOutline /></div>}
        </div>
        <div {...props} more="">
          {props.children}
        </div>
    </div>
  )
}
