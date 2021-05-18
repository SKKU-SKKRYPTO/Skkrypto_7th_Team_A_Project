import React, { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import Caver from "caver-js";
const config = {
  rpcURL: "https://api.baobab.klaytn.net:8651",
};
const cav = new Caver(config.rpcURL);
const FormWrpper = styled(Form)`
  margin-top: 150px;
`
const FormItemWrapper = styled(Form.Item)`
  padding-bottom: 20px;
`
export const auth = {
  keystore: '',
  password: '',
};
const Login = ({history}) => {
    const [message, setMessage] = useState('KeyStore 파일이 필요합니다.');
    const [password, setPassword] = useState('');
    const [keystore, setKeystore] = useState('');
    const [passwordError,setPasswordError] = useState('');
    
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const checkValidKeystore = (keystore) => {
      const parsedKeystore = JSON.parse(keystore);
      console.log(parsedKeystore);
      const isValidKeystore =
        parsedKeystore.version &&
        parsedKeystore.id &&
        parsedKeystore.address &&
        parsedKeystore.keyring;
      return isValidKeystore;
    }
    const onChangeFile = (event) => {
      const fileReader = new FileReader();
      fileReader.readAsText(event.target.files[0]);
      fileReader.onload = (event) => {
        try {
          if (!checkValidKeystore(event.target.result)) {
            setMessage("유효하지 않은 keystore 파일입니다");
            return;
          }
          setKeystore(event.target.result);
          setMessage("KeyStore 통과");
        } catch (event) {
          setMessage("유효하지 않은 file 입니다");
          return;
        }
      };
    }
    const onChangePassword = (event) => {
      auth.password = event.target.value;
      setPassword(event.target.value);
    }
    const intergrateWallet = (privateKey) => {
      const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey);
      cav.klay.accounts.wallet.add(walletInstance); // wallet에 계정 추가하면 어떤 트랜잭션 추가할때 쉽게 처리가능
      sessionStorage.setItem("walletInstance", JSON.stringify(walletInstance));
    }
    
    const onFinish = (value) => {
      auth.password = password; 
      auth.keystore = keystore;
      try {
        console.log(auth);
        const privatekey = cav.klay.accounts.decrypt(
          auth.keystore,
          auth.password
        ).privateKey;
        console.log('로그인 완료!');
        intergrateWallet(privatekey);
        window.location.replace("/");
      } catch (e) {
        console.error(e);
        setPasswordError("비밀번호가 일치하지 않습니다");
      }
    }
      
    


  return (
    <FormWrpper
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <FormItemWrapper
        label="KeyStore"
        name="KeyStore"
        
      >
        <Input type="file" onChange={(e)=>onChangeFile(e)}/>
        <div>{message}</div>
      </FormItemWrapper>

      <FormItemWrapper
        label="PrivateKey"
        name="PrivateKey"
        
      >
        <Input.Password onChange = {(e) => onChangePassword(e)}/>
        <div>{passwordError}</div>
      </FormItemWrapper>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>기억하기</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          로그인하기
        </Button>
      </Form.Item>
    </FormWrpper>
  );
};



export default withRouter(Login)
