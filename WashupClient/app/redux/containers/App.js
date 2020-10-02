/**
 * APP Container thường dùng để chứa layout (header, footer) và container con
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'

import { withRouter, Switch, Route } from 'react-router-dom'
import Home from './Home'
import NotFoundPage from '../../components/NotFoundPage'
import Accessories from './Accessories';
import Service from './Service';

import Alert from 'react-s-alert';
class App extends React.Component {
  render() {
    
    return (
      <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/phu-kien" component={Accessories} />
            <Route exact path="/dich-vu" component={Service} />
            {/* <Route path="/*" component={NotFoundPage} /> */}
            <Alert stack={{ limit: 3 }} />
      </Switch>
    )
  }
}

function mapStateToProps(state) {
  return {
    app: state.app
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
