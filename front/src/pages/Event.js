import { Button, Card } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {getToken} from '../caverAPI'
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Event = () => {
  const [token, setToken] = useState([]);

  useEffect(()=>{
    if(!token.length){
      getEvent();
    }
  },[])

  const getEvent = async() => {
    const event = await getToken(3);
    console.log(event);
    setToken(token.concat(event));
  }
  // const eventArray = [];
  // const event = await getToken(3);
  // console.log(event);
  return (
    <div>
      <Card title="진행중인 이벤트 목록">
      {token && token.map((value,i) => {
        console.log(token)
        return (
          <Card type="inner" title={value._tokenName} extra={<Button href="#">신청하기</Button>} key = {i}>
          <ContentWrapper>
          <div>
          <p>D - 11</p>
          <br/>
          {value._eventItem}기프티콘 1개
          <div>남은수량: {value._quantity}</div>
          </div>
          <img src = {'/starbucks.jpg'} width = '75' height = '75'/>
          </ContentWrapper>
        </Card>
        )
      })}
  </Card>
    </div>
  )
}

export default Event
