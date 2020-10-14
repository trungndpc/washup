import React, { Component } from 'react'
import { Link } from "react-router-dom";
import MLink from '../components/MLink'
import BookingManagerModal from '../redux/containers/BookingManagerModal';


class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isShowMobileMenu: false
    }
    this.onClickShowMenu = this.onClickShowMenu.bind(this)
    this.openBookedSearch = this.openBookedSearch.bind(this)
  }

  onClickShowMenu() {
    this.setState({
      isShowMobileMenu: !this.state.isShowMobileMenu
    })
  }

  openBookedSearch() {
    this.props.appActions.changeStatusSearchPhoneModal(true);
    this.setState({
      isShowMobileMenu: !this.state.isShowMobileMenu
    })
  }

  render() {
    return (
      <div>
        <div id="advertisement" className="hidden-xs">
          Liên hệ quảng cáo <span>chuoichamsocxe@washup.vn</span>
        </div>
        <div className="clearfix" />
        <nav id="topmenu" className="navbar">
          <div className="row nav_inner">
            <div className="col col-md-2 hiden-mx">
              <div className="wrapper-col fl-rgt">
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
                <div id="main-menu" style={{ height: `${this.state.isShowMobileMenu ? '260px' : ''}` }} className={`topnav navbar collapse navbar-collapse in`}>
                  <MLink isRelease={false} to={"/dich-vu"}>Dịch vụ</MLink>
                  <MLink isRelease={false} to={"/phu-kien"}>Lốp xe &amp; Phụ kiện</MLink>
                  <div className="topnav-right">
                  <a className="onl-mobile" onClick={this.openBookedSearch} href="#">Lịch đã đặt</a>
                  <MLink isRelease={false} to={"/#"}>Tuyển dụng</MLink>
                  <MLink isRelease={false} to={"/"}>Liên hệ</MLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-md-2 hiden-mx">
              <div className="wrapper-col sys-store">
                <div className="topright  text-left hidden-xs">
                  <a href="#"><span>Hệ thống store</span><i className="fa icon icon_map">&nbsp;</i> </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <BookingManagerModal {...this.props}/>
      </div>
    )
  }
}

export default Header
