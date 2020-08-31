import React, { Component } from 'react'

class Header extends Component {

  render() {
    return (
      <div>
        <div id="advertisement" className="hidden-xs">
          <img src={require('../resources/images/advertisement.png')} className="img-responsive" />
        </div>
        <div className="clearfix" />
        <nav id="topmenu" className="navbar">
          <div className="container"><div className="row nav_inner">
            <div className="topleft text-right hidden-xs"><a href="#">
              <i className="fa icon icon_link">&nbsp;</i> <span>Tư vấn Setup</span></a>
            </div>
            <div className="menu">
              <div className="logo">
                <div className="topnav-centered">
                  <a href="index.html">
                    <img src={require('../resources/images/logo/logo-washup.png')} className="img-responsive" />
                  </a>
                </div>
              </div>
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#main-menu">
                <i className="fa fa-bars" />
              </button>
              <div id="main-menu" className="topnav navbar collapse navbar-collapse">
                <a href="#">Dịch vụ</a>
                <a href="#">Lốp xe &amp; Phụ kiện</a>
                <a href="#">Kinh nghiệm chăm sóc xe</a>
                <div className="topnav-right">
                  <a href="#">Tuyển dụng</a>
                  <a href="#">Liên hệ</a>
                  <a href="#"><i className="fa icon_user" /></a>
                  <a href="#" className="language"><i className="fa icon_global" /> VN</a>
                </div>
              </div>
            </div>
            <div className="topright text-left hidden-xs"><a href="#">
              <i className="fa icon icon_map">&nbsp;</i> <span>Hệ thống cửa hàng</span></a>
            </div>
          </div></div>
        </nav>
        <div id="site-banner" />
      </div>
    )
  }
}

export default Header
