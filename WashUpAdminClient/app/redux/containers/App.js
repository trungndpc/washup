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
import Login from '../containers/Login'
import User from '../containers/User';
import Task from '../containers/Task';
import RegisterUser from '../containers/RegisterUser'
import AddOrder from '../containers/order/AddOrder'
import Alert from 'react-s-alert';


import Order from './Order'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.goTo = this.goTo.bind(this);
    window.goTo = this.goTo;
  }

  componentDidMount() {
    this.props.appActions.getLoginInfo();
  }

  goTo(path) {
    this.props.history.push(path);
  }

  render() {
    //DEBUG
    if (process.env.NODE_ENV === 'development') {
      console.log('Render: ', 'App')
    }
    const isLogin = this.props.app.isLogin;
    const isCheckLogin = this.props.app.isLoginChecked;
    if (!isCheckLogin) {
      return (
        <div>...</div>
      )
    }
    return (
      <div className="example-app">
        {isLogin &&
          <div>
            <Header {...this.props} history={this.props.history} />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/order" component={Order} />
              <Route exact path="/task" component={Task} />
              <Route exact path="/order/pending" component={Pending} />
              <Route exact path="/order/confirmed" component={Confirmed} />
              <Route exact path="/order/processing" component={Processing} />
              <Route exact path="/order/canceled" component={Canceled} />
              <Route exact path="/order/success" component={Success} />
              <Route exact path="/order/create" component={AddOrder} />
              <Route exact path="/order/:id" component={BookingDetail} />
              <Route exact path="/user" component={User} />
              <Route exact path="/user/register" component={RegisterUser} />
              <Route path="/*" component={NotFoundPage} />
            </Switch>
            {/* <Footer /> */}
          </div>
        }
        {!isLogin &&
          <Login />
        }
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
