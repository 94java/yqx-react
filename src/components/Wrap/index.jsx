import React from 'react'
import { RightOutline } from 'antd-mobile-icons'
import './index.less'
import { useNavigate } from 'react-router-dom'

export default function Wrap(props) {
  const navigate = useNavigate()
  function go(val){
    window.scrollTo(0, 0)
    navigate(val)
  }
  return (
    <div className={props.more ? "wrap wrap-link" : "wrap"}>
        <div className="header" onClick={() => go(props.to)}>
            <div className='wrap-title'>{props.title}</div>
            {props.more && <div className="more">更多<RightOutline /></div>}
        </div>
        <div {...props} more="">
          {props.children}
        </div>
    </div>
  )
}
