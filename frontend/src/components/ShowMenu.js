import React from 'react'
import {Menu} from 'antd'
import styled from 'styled-components'
import { withRouter } from 'react-router'

const ShowMenuWrapper = styled.div`
        width: 500px;
        padding-left: 100px;
        margin-top: 15px;
        margin-bottom: 10px;

`
const MenuItemWrapper = styled(Menu.Item)`
        margin-right : 50px;
`

const ShowMenu = ({location, match, history}) => {
  return (
    <ShowMenuWrapper>
      <Menu mode="horizontal">
                <MenuItemWrapper onClick={()=>history.push('/mypage')}>
                        <a>My Page</a>
                </MenuItemWrapper>
                <MenuItemWrapper onClick={()=>history.push('/event')}>
                        <a>이벤트 참가하기</a>
                </MenuItemWrapper>
                <MenuItemWrapper onClick={()=>history.push('/endevent')}>
                        <a>마감된 이벤트 보기</a>
                </MenuItemWrapper>
        </Menu>
    </ShowMenuWrapper>
  )
}

export default withRouter(ShowMenu)
