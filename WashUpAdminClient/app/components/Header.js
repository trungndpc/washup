import React, { Component } from 'react'
import Nav from './Nav';

class Header extends Component {

  constructor(props) {
    super(props)
    this.onClickLogout = this.onClickLogout.bind(this)
  }

  onClickLogout() {
    this.props.appActions.logout();
  }
 
  render() {
    const user = this.props.app.user;
    console.log(user)
    return (
      <div>
        <div className="header-top-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-logo">
                <div className="logo-area">
                  <a href="#"><img src="img/logo/logo.png" alt="" /></a>
                </div>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <div className="header-top-menu">
                  <ul className="nav navbar-nav notika-top-nav">
                    <li className="nav-item dropdown">
                      <a style={{fontSize: '12px'}} href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle"><span>{user && user["fullName"]}</span></a>
                      <div role="menu" className="dropdown-menu message-dd animated zoomIn">
                        <div className="hd-mg-tt">
                          <a onClick={this.onClickLogout} style={{fontSize: '12px'}}>Đăng xuất</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Nav {...this.props}/>
      </div>
    )
  }
}

export default Header
