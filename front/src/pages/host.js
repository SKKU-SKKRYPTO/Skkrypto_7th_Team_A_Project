import { Form, Input, InputNumber, Button, PageHeader } from 'antd';
import styled from 'styled-components';
import { hostEvent } from '../caverAPI';
import React from 'react';
import { Redirect } from 'react-router';
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */
const FormWrapper = styled(Form)`
  margin-top: 50px;
`

const Host = ({history}) => {
  const onFinish = (values) => {
    console.log(values);
    alert('등록이 완료되었습니다!')
    hostEvent(values);
    history.push('/');
  };

  return (
    <div>
    <PageHeader
    className="site-page-header"
    onBack={() => {window.location.replace("/")}}
    title="주최하기"
    subTitle="이벤트를 주최해주세요"
    style={{padding: 20}}
  />

    <FormWrapper {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['user', 'name']} label="대상" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'Date']} label="기간" rules={[{ type: 'date' }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'Item']} label="상품">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'Counting']} label="수량"  rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'image']} label="사진">
        <Input type="file"/>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          주최하기
        </Button>
      </Form.Item>
    </FormWrapper>
    </div>
  );
};

export default withRouter(Host)