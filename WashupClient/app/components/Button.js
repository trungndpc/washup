import React, { Component } from 'react'

class Button extends Component {

    constructor(props) {
        super(props)
        this._onClick = this._onClick.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    _onClick() {
        this.props.onClick && this.props.onClick();
    }

    render() {
        console.log("render button")
        return (
            <button onClick={this._onClick} type="button" className={`tbtn ${this.props.className}`} >
                {this.props.icon && <i className={this.props.icon} />}
                <span>{this.props.children}</span>
            </button>

        )
    }
}

export default Button
