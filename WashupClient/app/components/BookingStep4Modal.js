import React, { Component } from 'react'
import TimeUtils from '../utils/TimeUtils';


class BookingStep4Modal extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }

    componentWillMount() {
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"

    }


    close() {
        var body = document.getElementsByTagName('body')[0];
        body.className = ""
        if (this.props.onClose) {
            this.props.onClose();
        }
    }


    render() {
        const isLoading = this.props.app.isLoadingBooking;
        const confirmBooking = this.props.app.confirmBooking;
        return (
            <div>
                <div id="ModalBooking" className="modal fade in" role="dialog" aria-hidden="false" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-body"><form name="frm_booking" method="POST" action="#">
                                <div className="main-title">
                                    <h3 className="confirm-title">THÔNG TIN ĐẶT LỊCH</h3>
                                </div>
                                <div className="clearfix line">&nbsp;</div>
                                {isLoading && <div style={{ textAlign: 'center', padding: '30px' }}>
                                    <img src={require('../resources/images/loading.gif')} />
                                </div>}

                                {confirmBooking && <div className="booking_final">
                                    <div className="form-group">
                                        <i className="fa icon_maps" />
                                        <div className="info pull-left">
                                            <div className="title">ĐỊA CHỈ NHẬN XE</div>
                                            <div className="address clearfix">{confirmBooking["pickUpAddress"]}</div>
                                        </div>
                                    </div>
                                    <div className="clearfix">
                                        <div className="form-group col-right pull-right">
                                            <i className="fa icon_clock" />
                                            <div className="info pull-left">
                                                <div className="title">GIỜ</div>
                                                <div className="text">{TimeUtils.formatDate(confirmBooking["timeSchedule"] * 1000)} - {TimeUtils.timeSchedule(confirmBooking["timeSchedule"])}</div>
                                            </div>
                                        </div>

                                        <div className="form-group col-left pull-left">
                                            <i className="fa icon_car" />
                                            <div className="info pull-left">
                                                <div className="title">LOẠI XE</div>
                                                <div className="text">{confirmBooking["brand"].brandName + " - " + confirmBooking["brandSeries"].seriesName}</div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="clearfix">

                                        <div className="form-group col-right pull-right">
                                            <i className="fa icon_idcard" />
                                            <div className="info pull-left">
                                                <div className="title">BIỂN SỐ XE</div>
                                                <div className="text">{confirmBooking["licensePlate"]}</div>
                                            </div>
                                        </div>

                                        <div className="form-group col-left pull-left">
                                            <i className="fa clipboard_check" />
                                            <div className="info pull-left">
                                                <div className="title">DỊCH VỤ</div>
                                                <div className="text">{confirmBooking["services"][0].name}</div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="clearfix">

                                        <div className="form-group col-right pull-right">
                                            <i className="fa icon_money" />
                                            <div className="info pull-left">
                                                <div className="title">SỐ TIỀN</div>
                                                <div className="text">{confirmBooking["totalPrice"]}</div>
                                            </div>
                                        </div>

                                        <div className="form-group col-left pull-left">
                                            <i className="fa icon_pay" />
                                            <div className="info pull-left">
                                                <div className="title">THANH TOÁN</div>
                                                <div className="text">Tại nhà</div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="clearfix">
                                        <div className="form-group">
                                            <i className="fa icon_note" />
                                            <div className="info pull-left">
                                                <div className="title">GHI CHÚ</div>
                                                <div className="text">Nhận xe trước 16:30</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }
                                <div className="form-group text-center">
                                    <button onClick={this.close} type="button" className="btn btn-success back_home">VỀ TRANG  CHỦ</button>
                                    {/* <button type="button" className="btn btn-default book_cancel">ĐỔI LỊCH/HỦY LỊCH</button> */}
                                </div>
                                <div className="clearfix" />
                            </form></div>
                        </div>
                    </div>
                </div>
                <div class="modal-backdrop fade in"></div>
            </div>
        )
    }
}

export default BookingStep4Modal
