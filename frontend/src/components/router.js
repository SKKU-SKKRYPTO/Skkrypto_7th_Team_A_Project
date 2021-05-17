import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import EndEvent from '../pages/EndEvent';
import Event from '../pages/Event';
import Host from '../pages/host';
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import Header from './Header';
import Introduction from './Introduction';
import ShowMenu from './ShowMenu';
const Router = () => {
  return (
    <BrowserRouter>
    <Route render = {({location, match, history}) => (
                <div>
                <Header location={location} match = {match} history={history}/>
                </div>
              )}/>
            <Switch>
              <Route path="/" exact component={Introduction} />
              <Route path="/login" exact component={Login} />
              <Route path="/mypage" exact component={MyPage} />
              <Route path="/Event" exact component={Event} />
              <Route path="/endevent" exact component={EndEvent} />
              <Route path="/host" exact component={Host} />
                <Redirect path="*" to="/" />
            </Switch>
    </BrowserRouter>
  )
}

export default Router
