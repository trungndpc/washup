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
import Alert from 'react-s-alert';
class App extends React.Component {
  render() {
    //DEBUG
    if (process.env.NODE_ENV === 'development') {
      console.log('Render: ', 'App')
    }
    return (
      <Switch>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/*" component={NotFoundPage} />
          <Alert stack={{ limit: 3 }} />
        </div>
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
