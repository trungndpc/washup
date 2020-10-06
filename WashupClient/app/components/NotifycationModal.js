import React, { Component } from 'react'

class NotifycationModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isFadeIn: false,
        }
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this._handleClickOutside = this._handleClickOutside.bind(this)
        window.openNotifycation = this.open;
        this.modalRef = React.createRef();
    }

    open() {
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"
        body.style.overflow = "hidden "

        this.setState({ isOpen: true });
        setTimeout(function () {
            this.setState({ isFadeIn: true })
        }.bind(this), 50)
        document.addEventListener('mousedown', this._handleClickOutside);
    }

    close() {
        this.setState({ isFadeIn: false })
        setTimeout(function () {
            this.setState({ isOpen: false })
        }.bind(this), 150)
        document.removeEventListener('mousedown', this._handleClickOutside);
        var body = document.getElementsByTagName('body')[0];
        body.className = ""
        body.style.overflow = "auto"
    }

    _handleClickOutside(event) {
        if (this.modalRef && !this.modalRef.current.contains(event.target)) {
            this.close();
        }
    }

    render() {
        return (
            <div>
                <div id="ModalBookingNotify" style={{ display: `${this.state.isOpen == true ? 'block' : 'none'}` }} className={`modal fade ${this.state.isFadeIn ? 'in' : ''}`} >
                    <div className="modal-dialog">
                    <div ref={this.modalRef} className="modal-content">
                            <div className="modal-body"><div className="main-title">
                                <div className="tab"><h3 className="title">THÔNG BÁO</h3>
                                </div>
                            </div>
                                <div className="clearfix line">&nbsp;</div>
                                <div className="box_notify">
                                    <div className="form-group text-center">
                                        <div style={{fontSize: 'larger'}} >Tính năng sẽ được cập nhật sớm</div>
                                        <div className="clearfix"><br /></div>
                                    </div>
                                </div></div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen && <div class="modal-backdrop fade in"></div>}
            </div>
        )
    }
}

export default NotifycationModal
