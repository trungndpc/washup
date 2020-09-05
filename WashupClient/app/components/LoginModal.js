import React, { Component } from 'react'
import PriceUtils from '../utils/PriceUtils'
import { Link } from "react-router-dom";


class LoginModal extends Component {

    componentWillMount() {
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"
    }

    render() {
        return (
            <div id="ModalBookingNotify" className="modal fade in" role="dialog" aria-hidden="false" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body"><div className="main-title">
                            <div className="tab"><h3 className="title">Quản lý booking</h3>
                            </div>
                        </div>
                            <div className="clearfix line">&nbsp;</div>
                            <div className="box_notify">
                                <div className="form-group text-center">
                                    <div>Bạn có chắc chắn hủy lịch đã đặt?</div>
                                    <div className="clearfix"><br /></div>
                                    <button type="button" className="btn btn-success back_home">Đăng nhập</button>
                                    <div className="clearfix"><br /></div>
                                </div>
                            </div></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginModal
