import React from 'react'

import './index.less'
export default function LateralSlip(props) {
  return (
    <div {...props} className={'lateral-slip ' + (props.className ? props.className : '')}>
        {props.children}
    </div>
  )
}
