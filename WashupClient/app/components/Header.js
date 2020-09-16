import React, { Component } from 'react'
import { Link } from "react-router-dom";
import BookingManagerModal from './BookingManagerModal';


class Header extends Component {

  render() {
    return (
      <div>
        <div id="advertisement" className="hidden-xs">
          <img src={require('../resources/images/advertisement.png')} className="img-responsive" />
        </div>
        <div className="clearfix" />
        <nav id="topmenu" className="navbar">
          <div className="row nav_inner">
            <div className="col col-md-2">
              <div className= "wrapper-col fl-rgt">
                <div className="topleft text-right hidden-xs">
                  <a href="#"><i className="fa icon icon_link">&nbsp;</i> <span>Tư vấn Setup</span></a>
                </div>
              </div>
            </div>
            <div className="col col-md-8">
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
                  {/* <a href="#">Kinh nghiệm chăm sóc xe</a> */}
                  <div className="topnav-right">
                    <a href="#">Tuyển dụng</a>
                    <a href="#">Liên hệ</a>
                    <a href="#"><i className="fa icon_user" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-md-2">
              <div className= "wrapper-col">
                <div className="topright text-left hidden-xs">
                  <a href="#"><span>Hệ thống store</span><i className="fa icon icon_map">&nbsp;</i> </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* <BookingManagerModal/> */}
      </div>
    )
  }
}

export default Header
