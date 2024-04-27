import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { NavBar,Card,Image} from 'antd-mobile'
import { LikeOutline,EyeOutline,LinkOutline,ClockCircleOutline,HistogramOutline,PieOutline,ContentOutline } from 'antd-mobile-icons'

import './index.less'
export default function Detail() {
    // 获取路由参数-题库id
    const [searchParams] = useSearchParams();
    console.log(searchParams.get('id'))
  const navigate = useNavigate()

  function goBack(){
    navigate(-1)
  }
  return (
    <div className='question-bank-detail'>
        <NavBar onBack={() => goBack()}>题库详情</NavBar>
        {/* 题库信息 */}
        <Card bodyClassName="bank-info">
            <Image src='https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60' className='bank-pic'/>
            <div className="base-info">
                <h3 className="bank-title">Java专项练习</h3>
                <p className="desc">题库描述信息题库描述信息题库描述信息题库描述信息题库描述信息题库描述信息题库描述信息题库描述信息</p>
                <div><span className="title">难度:</span>一般</div>
                <div><span className="title">分类:</span>专项练习</div>
                <div><span className="title">题目总数:</span>13</div>
                <div className="meta">
                    <EyeOutline /> 13
                    <LinkOutline /> 23
                    <LikeOutline /> 12
                    <ClockCircleOutline /> 2024-05-01
                </div>
            </div>
        </Card>
        {/* 按钮-训练模式选择 */}
        <Card bodyClassName='bank-btn' >
            <div className="title">自由练习</div>
            <div className="btns">
                <div className="btn-item">
                    <HistogramOutline />
                    顺序训练
                </div>
                <div className="btn-item">
                    <PieOutline />
                    随机训练
                </div>
                <div className="btn-item">
                    <ContentOutline />
                    背题模式
                </div>
            </div>
        </Card>
    </div>
  )
}
