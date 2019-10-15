import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'

import App from '../Common/App';
import Mgr from '../Manger/manager'
import Login from '../Login/login'
import Log from '../Log/log'

export default class myRoute extends React.Component{
    render(){
        return(
            <Router history={createBrowserHistory()}>
                <Switch>
                    <Route exact path='/' component={Login}></Route>
                    <App path='/Mgr' component={Mgr}></App>
                    <App path='/Log' component={Log}></App>
                </Switch>
            </Router>
        )
    }
}