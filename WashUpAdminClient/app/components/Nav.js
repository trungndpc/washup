import React, { Component } from 'react'
import { Link } from "react-router-dom";
import * as RoleConstant from '../constants/Role'

class Nav extends Component {


    constructor(props) {
        super(props)
        this.state = {
            isMobileShow: false,
            isShowSubMenuOrder: false,
        }
        this.onClickMobile = this.onClickMobile.bind(this)
        this.onClickOrderMenu = this.onClickOrderMenu.bind(this)
    }

    onClickMobile() {
        this.setState({ isMobileShow: !this.state.isMobileShow })
    }

    onClickOrderMenu() {
        if (this.state.isShowSubMenuOrder) {
            this.onClickMobile();
        }
        this.setState({ isShowSubMenuOrder: !this.state.isShowSubMenuOrder })
    }

    render() {
        const user = this.props.app.user;
        const role = RoleConstant.findRole(user["permissions"])
        const path = window.location.pathname.split("/")[1];
        const subPath = window.location.pathname.split("/")[2];
        return (
            <div>
                <div className="mobile-menu-area">
                    <div className="container mean-container"><div className="mean-bar">
                        <a onClick={this.onClickMobile} href="#nav" className="meanmenu-reveal" style={{ right: '0px', left: 'auto', textAlign: 'center', textIndent: '0px', fontSize: '18px' }}><span /><span /><span /></a>
                        <nav className="mean-nav">
                            {this.state.isMobileShow &&
                                <ul className="mobile-menu-nav">
                                    <li><Link to="/">Home</Link>
                                    </li>
                                    {role != RoleConstant.Role.TECHNICIAN && <li onClick={this.onClickOrderMenu}><Link to="/order">Order</Link>
                                        {this.state.isShowSubMenuOrder && <ul style={{ display: 'block' }} className="collapse dropdown-header-top">
                                            <li><Link to={"/order"}>Overview</Link></li>
                                            {(role == RoleConstant.Role.CRM || role == RoleConstant.Role.ADMIN) && <li><Link to={"/order/pending"}>Pending</Link></li>}
                                            {(role == RoleConstant.Role.OPERATOR || role == RoleConstant.Role.ADMIN) && <li><Link to={"/order/confirmed"}>Confirmed</Link></li>}
                                            {role == RoleConstant.Role.ADMIN && <li><Link to={"/order/processing"}>Processing</Link></li>}
                                            {role == RoleConstant.Role.ADMIN && <li><Link to={"/order/success"}>Success</Link></li>}
                                            {role == RoleConstant.Role.ADMIN && <li><Link to={"/order/canceled"}>Canceled</Link></li>}
                                        </ul>}
                                        <a className="mean-expand" href="#" style={{ fontSize: '18px' }}>+</a>
                                    </li>
                                    }
                                    {role == RoleConstant.Role.ADMIN && <li><Link to="/user">User</Link></li>}
                                    {(role == RoleConstant.Role.TECHNICIAN || role == RoleConstant.Role.ADMIN) && <li><Link to="/task"><i className="notika-icon notika-edit" /> Task</Link></li>}
                                </ul>
                            }
                        </nav>
                    </div>

                    </div>
                </div>
                <div className="main-menu-area mg-tb-40">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <ul className="nav nav-tabs notika-menu-wrap menu-it-icon-pro">
                                    <li className={path == "" ? "active" : ""}><Link to="/"><i className="notika-icon notika-house" /> Home</Link></li>
                                    {role != RoleConstant.Role.TECHNICIAN && <li className={path == "order" ? "active" : ""}><Link to="/order"><i className="notika-icon notika-mail" /> Order</Link></li>}
                                    {role == RoleConstant.Role.ADMIN &&
                                        <li className={path == "user" ? "active" : ""}><Link to="/user"><i className="notika-icon notika-edit" /> User</Link>
                                        </li>
                                    }
                                    {role == RoleConstant.Role.TECHNICIAN && <li className={path == "task" ? "active" : ""}><Link to="/task"><i className="notika-icon notika-edit" /> Task</Link>
                                    </li>}
                                </ul>
                                <div className="tab-content custom-menu-content">
                                    <div className={`tab-pane notika-tab-menu-bg animated flipInX ${path == "" ? "active" : ""}`}>
                                        <ul className="notika-main-menu-dropdown">
                                            <li><a href="inbox.html"></a></li>
                                        </ul>
                                    </div>
                                    <div className={`tab-pane notika-tab-menu-bg animated flipInX ${path == "order" ? "active" : ""}`}>
                                        <ul className="notika-main-menu-dropdown">
                                            <li className={!subPath ? "active" : ""}><Link to={"/order"}>Overview</Link></li>
                                            {(role == RoleConstant.Role.CRM || role == RoleConstant.Role.ADMIN) && <li className={subPath == "pending" ? "active" : ""}><Link to={"/order/pending"}>Pending</Link></li>}
                                            {(role == RoleConstant.Role.OPERATOR || role == RoleConstant.Role.ADMIN) && <li className={subPath == "confirmed" ? "active" : ""}><Link to={"/order/confirmed"}>Confirmed</Link></li>}
                                            {role == RoleConstant.Role.ADMIN && <li className={subPath == "processing" ? "active" : ""}><Link to={"/order/processing"}>Processing</Link></li>}
                                            {role == RoleConstant.Role.ADMIN && <li className={subPath == "success" ? "active" : ""}><Link to={"/order/success"}>Success</Link></li>}
                                            {role == RoleConstant.Role.ADMIN && <li className={subPath == "canceled" ? "active" : ""}><Link to={"/order/canceled"}>Canceled</Link></li>}
                                        </ul>
                                    </div>
                                    <div className={`tab-pane notika-tab-menu-bg animated flipInX ${path == "user" ? "active" : ""}`}>
                                        <ul className="notika-main-menu-dropdown">
                                            <li><a href="inbox.html"></a></li>
                                        </ul>
                                    </div>
                                    <div className={`tab-pane notika-tab-menu-bg animated flipInX ${path == "task" ? "active" : ""}`}>
                                        <ul className="notika-main-menu-dropdown">
                                            <li><a href="inbox.html"></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Nav
