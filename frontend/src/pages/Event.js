import { Button, Card } from 'antd'
import React from 'react'
import styled from 'styled-components'

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Event = () => {
  return (
    <div>
  <Card title="진행중인 이벤트 목록">
    <Card type="inner" title="2021년 1학기 중간고사 간식배부" extra={<Button href="#">신청하기</Button>}>
      <ContentWrapper>
      <div>
      <p>D - 11</p>
      <br/>
      스타벅스 기프티콘 1개
      </div>
      <img src = {'/starbucks.jpg'} width = '75' height = '75'/>
      </ContentWrapper>
    </Card>
    <Card
      style={{ marginTop: 16 }}
      type="inner"
      title="2021년 1학기 기말고사 간식배부"
      extra={<Button href="#">신청하기</Button>}
    >
      <ContentWrapper>
      <div>
      <p>D - 11</p>
      <br/>
      맘스터치 기프티콘 1개
      </div>
      <img src = {'/momstouch.jpg'} width = '75' height = '75'/>
      </ContentWrapper>
    </Card>
  </Card>
    </div>
  )
}

export default Event
