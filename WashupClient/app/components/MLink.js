import React, { Component } from 'react'
import { Link } from "react-router-dom";


class MLink extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        if (!this.props.isRelease) {
            return <a className={this.props.className} onClick={function () { window.openNotifycation() }}>{this.props.children}</a>
        } else {
            <Link className={this.props.className} to={this.props.to}>{this.props.children}</Link>
        }
    }
}

export default MLink
