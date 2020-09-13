/**
 * APP Container thường dùng để chứa layout (header, footer) và container con
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'

import { withRouter, Switch, Route } from 'react-router-dom'
import NotFoundPage from '../../components/NotFoundPage'
import Header from '../../components/Header'
import Dashboard from '../containers/Dashboard';
import BookingDetail from '../containers/BookingDetail';
import Footer from '../../components/Footer'
import Pending from '../containers/order/Pending'
import Confirmed from '../containers/order/Confirmed'
import Processing from '../containers/order/Processing'
import Success from '../containers/order/Success'
import Canceled from '../containers/order/Canceled'
import Task from '../containers/Task';
import Alert from 'react-s-alert';


import Order from './Order'

class App extends React.Component {
  render() {
    //DEBUG
    if (process.env.NODE_ENV === 'development') {
      console.log('Render: ', 'App')
    }
    return (
      <div className="example-app">
        <div>
          <Header history={this.props.history} />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/order" component={Order} />
            <Route exact path="/task" component={Task} />
            <Route exact path="/order/pending" component={Pending} />
            <Route exact path="/order/confirmed" component={Confirmed} />
            <Route exact path="/order/processing" component={Processing} />
            <Route exact path="/order/canceled" component={Canceled} />
            <Route exact path="/order/success" component={Success} />
            <Route exact path="/order/:id" component={BookingDetail} />
            <Route path="/*" component={NotFoundPage} />
          </Switch>
          {/* <Footer /> */}
        </div>
        <Alert stack={{ limit: 3 }} />
      </div>
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
