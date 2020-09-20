import React, { Component } from 'react'
import { Link } from "react-router-dom";
import BookingManagerModal from './BookingManagerModal';


class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isShowMobileMenu: false
    }
    this.onClickShowMenu = this.onClickShowMenu.bind(this)
  }

  onClickShowMenu() {
    this.setState({
      isShowMobileMenu: !this.state.isShowMobileMenu
    })
  }

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
                <button onClick={this.onClickShowMenu} type="button" className="navbar-toggle">
                  <i className="fa fa-bars" />
                </button>
                <div id="main-menu" style={{height: `${this.state.isShowMobileMenu ? '220px' : '0px'}`}} className={`topnav navbar collapse navbar-collapse in`}>
                  <Link to={"/dich-vu"}>Dịch vụ</Link>
                  <Link to={"/phu-kien"}>Lốp xe &amp; Phụ kiện</Link>
                  <div className="topnav-right">
                    <a href="#">Tuyển dụng</a>
                    <a href="#">Liên hệ</a>
                    {/* <a href="#"><i className="fa icon_user" /></a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-md-2">
              <div className="wrapper-col sys-store">
                <div className="topright  text-left hidden-xs">
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
