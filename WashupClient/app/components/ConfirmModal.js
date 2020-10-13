import React, { Component } from 'react'

class ConfirmModal extends Component {

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
        this.ok = this.ok.bind(this);
        this.notOk = this.notOk.bind(this);
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

    close(isCallParent) {
        this.setState({ isFadeIn: false })
        setTimeout(function () {
            this.setState({ isOpen: false })
            isCallParent && this.props.notOk && this.props.notOk();
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

    ok() {
        this.close(false);
        this.props.ok && this.props.ok();
    }

    notOk() {
        this.close(true);
    }

    render() {
        return (
            <div>
                <div id="confirmModal" style={{ display: `${this.state.isOpen == true ? 'block' : 'none'}` }} className={`modal fade ${this.state.isFadeIn ? 'in' : ''}`} >
                    <div className="modal-dialog">
                        <div ref={this.modalRef} className="modal-content bgtr">
                            <div className="modal-body bgtr">
                                <div className="main-title">
                                    Bạn có muốn hủy lịch đã đặt ?
                                </div>
                                <div className="clearfix" />
                                <div className="content_box_notify">
                                    <div className="form-group text-center">
                                        <button onClick={this.notOk} type="button" className="btn btn-success btn-prev-step3">KHÔNG</button>
                                        <button onClick={this.ok} type="button" className="btn btn-fefault btn-prev-step3">CÓ</button>
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

export default ConfirmModal
