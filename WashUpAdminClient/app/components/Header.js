import React, { Component } from 'react'
import Nav from './Nav';

class Header extends Component {
 
  render() {
    return (
      <div>
        <div className="header-top-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div className="logo-area">
                  <a href="#"><img src="img/logo/logo.png" alt="" /></a>
                </div>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <div className="header-top-menu">
                  <ul className="nav navbar-nav notika-top-nav">
                    <li className="nav-item dropdown">
                      <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle"><span><i className="notika-icon notika-search" /></span></a>
                      <div role="menu" className="dropdown-menu search-dd animated flipInX">
                        <div className="search-input">
                          <i className="notika-icon notika-left-arrow" />
                          <input type="text" />
                        </div>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle"><span><i className="notika-icon notika-mail" /></span></a>
                      <div role="menu" className="dropdown-menu message-dd animated zoomIn">
                        <div className="hd-mg-tt">
                          <h2>Messages</h2>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Nav />
      </div>
    )
  }
}

export default Header
