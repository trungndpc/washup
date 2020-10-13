import React, { Component } from 'react'
import PriceUtils from '../utils/PriceUtils'
import { Link } from "react-router-dom";


class PhoneSearchModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMsg: null
        }
        this.search = this.search.bind(this)
        this._formatPhone = this._formatPhone.bind(this)
        this.close = this.close.bind(this)
        this.modalRef = React.createRef();
        this._handleClickOutside = this._handleClickOutside.bind(this);
    }


    _handleClickOutside(event) {
        if (this.modalRef && !this.modalRef.current.contains(event.target)) {
            this.close();
        }
    }

    _formatPhone(e) {
        var value = e.target.value;
        if (value) {
            value = value.replace(/\D/g, '');
            let rs = "";
            for (var i = 0; i < value.length; i++) {
                if (i == 4 || i == 7) {
                    rs = rs + "." + value.charAt(i)
                } else {
                    rs = rs + value.charAt(i)
                }
            }
            this.phoneInputRef.value = rs;
        }
    }

    close() {
        document.removeEventListener('mousedown', this._handleClickOutside);
        this.props.appActions.changeModeBookingModal(0);
        this.props.appActions.changeStatusSearchPhoneModal(false);
    }

    search() {
        let value = this.phoneInputRef.value;
        if (!value) {
            this.setState({ errorMsg: 'Vui lòng nhập số điện thoại' })
            return false;
        }
        this.props.appActions.getOrderByPhone(value);
    }


    componentWillMount() {
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"
        document.addEventListener('mousedown', this._handleClickOutside);
    }

    render() {
        const errorMsg = this.props.app.findOrderByPhonerErrorMSG ? this.props.app.findOrderByPhonerErrorMSG : this.state.errorMsg;
        return (
            <div className="modal fade in" role="dialog" aria-hidden="false" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div ref={this.modalRef} className="modal-content">
                        <i onClick={this.close} style={{color: '#1b3a6a'}} className="fa fa-times close-modal" />
                        <div>
                            <h3 style={{ fontSize: 'x-large', textTransform: 'uppercase', fontWeight: '600', textAlign: 'center', color: '#1B3A6A' }}>Thông tin lịch đã đặt</h3>
                        </div>
                        <div className="modal-body">
                            <div className="box_input booking-list-modal">
                                <div className="error_msg_form_search_phone">{errorMsg}</div>
                                <div class="form-row align-items-center">
                                    <div className="input-group mrbotton10">
                                        <div style={{
                                            padding: '5px 15px',
                                            fontSize: 'larger',
                                            backgroundColor: '#ced4da'
                                        }} className="input-group-prepend">
                                            <div style={{ fontSize: 'larger' }} className="input-group-text"><i className="fa fa-mobile"></i></div>
                                        </div>
                                        <input onChange={this._formatPhone} type="tel" pattern="[0-9]{4}.[0-9]{3}.[0-9]{3}" ref={e => this.phoneInputRef = e} class="form-control" placeholder="xxx.xxx.xxx">
                                        </input>
                                    </div>
                                    <div className="form-group text-center">
                                        <button onClick={this.search} style={{ width: '100%', color: "#fff", backgroundColor: '#1b3868', height: '38px', border: 'none' }} type="button" className="btn btn-success back_home">Tiếp tục</button>
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

export default PhoneSearchModal
