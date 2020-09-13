import React, { Component } from 'react'
import { Link } from "react-router-dom";

class Nav extends Component {


    constructor(props) {
        super(props)
    }


    render() {
        const path = window.location.pathname.split("/")[1];
        const subPath = window.location.pathname.split("/")[2];
        return (
            <div>
                <div className="mobile-menu-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="mobile-menu">
                                    <nav id="dropdown">
                                        <ul className="mobile-menu-nav">
                                            <li><a data-toggle="collapse" data-target="#Charts" href="#">Home</a>
                                                <ul className="collapse dropdown-header-top">
                                                    <li><a href="index.html">Dashboard One</a></li>
                                                    <li><a href="index-2.html">Dashboard Two</a></li>
                                                    <li><a href="index-3.html">Dashboard Three</a></li>
                                                    <li><a href="index-4.html">Dashboard Four</a></li>
                                                    <li><a href="analytics.html">Analytics</a></li>
                                                    <li><a href="widgets.html">Widgets</a></li>
                                                </ul>
                                            </li>
                                            <li><a data-toggle="collapse" data-target="#demoevent" href="#">Email</a>
                                                <ul id="demoevent" className="collapse dropdown-header-top">
                                                    <li><a href="inbox.html">Inbox</a></li>
                                                    <li><a href="view-email.html">View Email</a></li>
                                                    <li><a href="compose-email.html">Compose Email</a></li>
                                                </ul>
                                            </li>
                                            <li><a data-toggle="collapse" data-target="#democrou" href="#">Interface</a>
                                                <ul id="democrou" className="collapse dropdown-header-top">
                                                    <li><a href="animations.html">Animations</a></li>
                                                    <li><a href="google-map.html">Google Map</a></li>
                                                    <li><a href="data-map.html">Data Maps</a></li>
                                                    <li><a href="code-editor.html">Code Editor</a></li>
                                                    <li><a href="image-cropper.html">Images Cropper</a></li>
                                                    <li><a href="wizard.html">Wizard</a></li>
                                                </ul>
                                            </li>
                                            <li><a data-toggle="collapse" data-target="#demolibra" href="#">Charts</a>
                                                <ul id="demolibra" className="collapse dropdown-header-top">
                                                    <li><a href="flot-charts.html">Flot Charts</a></li>
                                                    <li><a href="bar-charts.html">Bar Charts</a></li>
                                                    <li><a href="line-charts.html">Line Charts</a></li>
                                                    <li><a href="area-charts.html">Area Charts</a></li>
                                                </ul>
                                            </li>
                                            <li><a data-toggle="collapse" data-target="#demodepart" href="#">Tables</a>
                                                <ul id="demodepart" className="collapse dropdown-header-top">
                                                    <li><a href="normal-table.html">Normal Table</a></li>
                                                    <li><a href="data-table.html">Data Table</a></li>
                                                </ul>
                                            </li>
                                            <li><a data-toggle="collapse" data-target="#demo" href="#">Forms</a>
                                                <ul id="demo" className="collapse dropdown-header-top">
                                                    <li><a href="form-elements.html">Form Elements</a></li>
                                                    <li><a href="form-components.html">Form Components</a></li>
                                                    <li><a href="form-examples.html">Form Examples</a></li>
                                                </ul>
                                            </li>
                                            <li><a data-toggle="collapse" data-target="#Miscellaneousmob" href="#">App views</a>
                                                <ul id="Miscellaneousmob" className="collapse dropdown-header-top">
                                                    <li><a href="notification.html">Notifications</a>
                                                    </li>
                                                    <li><a href="alert.html">Alerts</a>
                                                    </li>
                                                    <li><a href="modals.html">Modals</a>
                                                    </li>
                                                    <li><a href="buttons.html">Buttons</a>
                                                    </li>
                                                    <li><a href="tabs.html">Tabs</a>
                                                    </li>
                                                    <li><a href="accordion.html">Accordion</a>
                                                    </li>
                                                    <li><a href="dialog.html">Dialogs</a>
                                                    </li>
                                                    <li><a href="popovers.html">Popovers</a>
                                                    </li>
                                                    <li><a href="tooltips.html">Tooltips</a>
                                                    </li>
                                                    <li><a href="dropdown.html">Dropdowns</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li><a data-toggle="collapse" data-target="#Pagemob" href="#">Pages</a>
                                                <ul id="Pagemob" className="collapse dropdown-header-top">
                                                    <li><a href="contact.html">Contact</a>
                                                    </li>
                                                    <li><a href="invoice.html">Invoice</a>
                                                    </li>
                                                    <li><a href="typography.html">Typography</a>
                                                    </li>
                                                    <li><a href="color.html">Color</a>
                                                    </li>
                                                    <li><a href="login-register.html">Login Register</a>
                                                    </li>
                                                    <li><a href="404.html">404 Page</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-menu-area mg-tb-40">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <ul className="nav nav-tabs notika-menu-wrap menu-it-icon-pro">
                                    <li className={path== "" ? "active" : ""}><Link to="/"><i className="notika-icon notika-house" /> Home</Link>
                                    </li>
                                    <li className={path== "order" ? "active" : ""}><Link to="/order"><i className="notika-icon notika-mail" /> Order</Link>
                                    </li>
                                    <li className={path== "user" ? "active" : ""}><Link to="/user"><i className="notika-icon notika-edit" /> User</Link>
                                    </li>
                                    <li className={path== "task" ? "active" : ""}><Link to="/task"><i className="notika-icon notika-edit" /> Task</Link>
                                    </li>
                                </ul>
                                <div className="tab-content custom-menu-content">
                                    <div  className={`tab-pane notika-tab-menu-bg animated flipInX ${path== "" ? "active" : ""}`}>
                                        <ul className="notika-main-menu-dropdown">
                                            <li><a href="inbox.html"></a></li>
                                        </ul>
                                    </div>
                                    <div  className={`tab-pane notika-tab-menu-bg animated flipInX ${path== "order" ? "active" : ""}`}>
                                        <ul className="notika-main-menu-dropdown">
                                            <li className={!subPath ? "active" : ""}><Link to={"/order"}>Overview</Link></li>
                                            <li className={subPath == "pending" ? "active" : ""}><Link to={"/order/pending"}>Pending</Link></li>
                                            <li className={subPath == "confirmed" ? "active" : ""}><Link to={"/order/confirmed"}>Confirmed</Link></li>
                                            <li className={subPath == "processing" ? "active" : ""}><Link to={"/order/processing"}>Processing</Link></li>
                                            <li className={subPath == "canceled" ? "active" : ""}><Link to={"/order/canceled"}>Canceled</Link></li>
                                            <li className={subPath == "success" ? "active" : ""}><Link to={"/order/success"}>Success</Link></li>
                                        </ul>
                                    </div>
                                    <div  className={`tab-pane notika-tab-menu-bg animated flipInX ${path== "user" ? "active" : ""}`}>
                                        <ul className="notika-main-menu-dropdown">
                                            <li><a href="inbox.html"></a></li>
                                        </ul>
                                    </div>
                                    <div  className={`tab-pane notika-tab-menu-bg animated flipInX ${path== "task" ? "active" : ""}`}>
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
