import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { Button} from 'antd';
import { Link } from 'react-router-dom';
const Container = styled.div`
  padding-top : 30px;
`
const Logo = styled.div`
  font-family: Tauri;
  font-weight : bold;
  font-size: 150px;
  text-align : center;
  color: #12b886;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom : 20px;
`
const Text = styled.div`
  font-family: Sahitya;
  color : #0ca678;
  font-size: 30px;
  line-height: 56px;
  text-align: center;
`

const ButtonWrapper = styled.div`
  text-align:center;
  padding-top: 30px;
  padding-right: 30px;
`
const ModalDiv = styled.div`
  padding: 15px;
`

console.log(typeof(walletInstance))
const Introduction = () => {
  // const [walletInstance, setWalletInstance] = useState({});
  // setWalletInstance(JSON.parse(sessionStorage.getItem('walletInstance')));
  const walletInstance = JSON.parse(sessionStorage.getItem('walletInstance'));
  // useEffect(() => {
  //   console.log('walletInstance did mount');
    
  // }, [walletInstance]);

  return (
    <Container>
      <Logo>SKK MANAGER</Logo>
      <Text>SKK MANAGER는 스마트 컨트랙트를 이용한 이벤트 주최, 참여 플랫폼 입니다.</Text>
      <Text>스마트 컨트랙트를 통해 간편하고 투명한 이벤트 주최와 참여를 경험해 보세요!</Text>
      <ButtonWrapper>
        <Link to='/login'><Button type="primary" size="large" style={{marginRight: 50}}> 참여하기</Button></Link>
        {walletInstance && walletInstance.address === "0x7f6eda88302245c723a6295e1fbaf62b93778de0" 
        ? <Link to='/host'><Button type="primary" size="large" > 주최하기</Button></Link>
        : <div></div>}
        </ButtonWrapper>
    </Container>
  )
}

export default Introduction
