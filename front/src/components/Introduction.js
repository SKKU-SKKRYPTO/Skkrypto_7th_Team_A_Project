import React, {useState} from 'react'
import styled from 'styled-components'
import { Button, Input, Modal } from 'antd';
import LoginModal from './LoginModal';
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


const Introduction = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [keystore, setKeystore] = useState('');
  const [password, setPassword] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    console.log(keystore);
    console.log(password)
    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Container>
      <Logo>SKK MANAGER</Logo>
      <Text>SKK MANAGER는 스마트 컨트랙트를 이용한 이벤트 주최, 참여 플랫폼 입니다.</Text>
      <Text>스마트 컨트랙트를 통해 간편하고 투명한 이벤트 주최와 참여를 경험해 보세요!</Text>
      <ButtonWrapper>
        <Link to='/login'><Button type="primary" onClick = {showModal} size="large" style={{marginRight: 50}}> 참여하기</Button></Link>
        <Link to='/host'><Button type="primary" size="large" > 주최하기</Button></Link>
        </ButtonWrapper>
      <Modal visible={isModalVisible} onOk = {handleOk} onCancel={handleCancel} >
          <ModalDiv>
            <label>KeyStore</label>
            <Input type="file" placeholder="KeyStore 파일을 선택해주세요" onChange={(e) => setKeystore(e.target.files[0])}/>
          </ModalDiv>
          <ModalDiv>
            <label>비밀번호</label>
            <Input type="password" placeholder="비밀번호를 입력해주세요" value = {password} onChange = {(e) => setPassword(e.target.value)}></Input>
          </ModalDiv>
      </Modal>
    </Container>
  )
}

export default Introduction
