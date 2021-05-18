import React from 'react'
import { Card, Col, Row } from 'antd';
const MyPage = () => {
  return (
    <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="2021 중간고사 간식배부 이벤트" bordered={false}>
          <img src={'/starbucks.jpg'} width = '100' height = '100' />
          스타벅스 기프티콘1장
        </Card>
      </Col>
      <Col span={8}>
        <Card title="2021 기말고사 간식배부 이벤트" bordered={false}>
          <img src={'/momstouch.jpg'} width = '100' height = '100' />
          맘스터치 싸이버거 세트
        </Card>
      </Col>
    </Row>
  </div>
  )
}

export default MyPage
