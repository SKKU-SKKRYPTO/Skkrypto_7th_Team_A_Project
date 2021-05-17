import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ShowMenu from './ShowMenu'
import { Button } from 'antd'
const HeaderContent = styled.div`
  width : auto;
  height : 113px;
  opacity: 60%;
  display : flex;
  align-items : center;
`
const Logo = styled.button`
  background-color : white;
  border: none;
  font-family: Tauri;
  letter-spacing: 2px;
  font-size: 3rem;
  line-height: 90px;
  font-weight: 700;
  color: #0ca678;
  margin-left : 20px;
`
const Spacer = styled.div`
flex-grow: 1;
`

const GradientBorder = styled.div`
  height : 3px;
  background: linear-gradient(to right, #12b886, #22b8cf);
`

const Header = ({location, match, history}) => {
  const walletFromSession = sessionStorage.getItem("walletInstance");
  console.log(walletFromSession);
  return (
    <div>
    <HeaderContent>
      <Logo onClick={() => {window.location.replace('/')}}>SKK MANAGER</Logo>
      <Spacer/>
    </HeaderContent>
    <div> { walletFromSession ? (<div>계정주소 : ' {JSON.parse(walletFromSession).address} '</div>) : (<div></div>) }</div>
    {walletFromSession ? <ShowMenu location={location} match = {match} history={history}/> : <div></div>}
    <GradientBorder/>
    </div>
  )
}

export default Header
