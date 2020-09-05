import React, { Component } from 'react'
import { Link } from "react-router-dom";
import LoginModal from './LoginModal';


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
                  <Link to={"/"}>
                    <img src={require('../resources/images/logo/logo-washup.png')} className="img-responsive" />
                  </Link>
                </div>
              </div>
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#main-menu">
                <i className="fa fa-bars" />
              </button>
              <div id="main-menu" className="topnav navbar collapse navbar-collapse">
                <Link to={"/dich-vu"}>Dịch vụ</Link>
                <Link to={"/phu-kien"}>Lốp xe &amp; Phụ kiện</Link>
                <a href="#">Kinh nghiệm chăm sóc xe</a>
                <div className="topnav-right">
                  <a href="#">Tuyển dụng</a>
                  <a href="#">Liên hệ</a>
                  <a href="#"><i className="fa icon_user" /></a>
                  {/* <a href="#" className="language"><i className="fa icon_global" /> VN</a> */}
                </div>
              </div>
            </div>
            <div className="topright text-left hidden-xs">
              <a href="#"><i className="fa icon icon_map">&nbsp;</i> <span>Hệ thống cửa hàng</span></a>
            </div>
          </div></div>
        </nav>
        <LoginModal/>
        <div class="modal-backdrop fade in"></div>
      </div>
    )
  }
}

export default Header
