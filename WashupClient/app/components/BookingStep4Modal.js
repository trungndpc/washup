import React, { Component } from 'react'
import TimeUtils from '../utils/TimeUtils';
import PriceUtils from '../utils/PriceUtils';


class BookingStep4Modal extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);
        this.modalRef =  React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentWillMount() {
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.modalRef && !this.modalRef.current.contains(event.target)) {
            this.close();
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    submit() {
        let inforBooking = { ...this.props.app.inforBooking }
        this.props.appActions.booking(inforBooking);
        this.close();
    }


    close() {
        var body = document.getElementsByTagName('body')[0];
        body.className = ""
        body.style.overflow = ""
        if (this.props.onClose) {
            this.props.onClose();
        }
    }


    render() {
        const isLoading = this.props.app.isLoadingBooking;
        const inforBooking = this.props.app.inforBooking;
        return (
            <div>
                <div  id="ModalBooking" className="modal fade in" role="dialog" aria-hidden="false" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg">
                        <div ref={this.modalRef} className="modal-content m-final">
                            <div className="modal-body"><form name="frm_booking" method="POST" action="#">
                                <div className="main-title">
                                    <h3 className="confirm-title">THÔNG TIN ĐẶT LỊCH</h3>
                                </div>
                                <div className="clearfix line">&nbsp;</div>
                                {isLoading && <div style={{ textAlign: 'center', padding: '30px' }}>
                                    <img src={require('../resources/images/loading.gif')} />
                                </div>}

                                {inforBooking && <div className="booking_final">
                                    <div className="form-group">
                                        <i className="fa icon_maps" />
                                        <div className="info pull-left">
                                            <div className="title">ĐỊA CHỈ NHẬN XE</div>
                                            <div className="text">{inforBooking["address"]}</div>
                                        </div>
                                    </div>
                                    <div className="clearfix">
                                        <div className="form-group col-right pull-right">
                                            <i className="fa icon_clock" />
                                            <div className="info pull-left">
                                                <div className="title">GIỜ</div>
                                                <div className="text">{TimeUtils.formatDate(inforBooking["timeSchedule"] * 1000)} - {TimeUtils.timeSchedule(inforBooking["timeSchedule"])}</div>
                                            </div>
                                        </div>

                                        <div className="form-group col-left pull-left">
                                            <i className="fa icon_car" />
                                            <div className="info pull-left">
                                                <div className="title">PHƯƠNG TIỆN</div>
                                                <div className="text">{`${inforBooking["brand"].brandName} [${inforBooking["brandSeries"].seriesName}] ${inforBooking["vehicleName"] && inforBooking["vehicleName"]}`}</div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="clearfix">

                                        <div className="form-group col-right pull-right">
                                            <i className="fa icon_idcard" />
                                            <div className="info pull-left">
                                                <div className="title">BIỂN SỐ XE</div>
                                                <div className="text">{inforBooking["licensePlate"]}</div>
                                            </div>
                                        </div>

                                        <div className="form-group col-left pull-left">
                                            <i className="fa clipboard_check" />
                                            <div className="info pull-left">
                                                <div className="title">DỊCH VỤ</div>
                                                <div className="text">{inforBooking["serviceNames"].join(", ")}</div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="clearfix">

                                        <div className="form-group col-right pull-right">
                                            <i className="fa icon_money" />
                                            <div className="info pull-left">
                                                <div className="title">SỐ TIỀN</div>
                                                <div className="text">{PriceUtils.toThousand(inforBooking["totalPrice"])}</div>
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
                                    {inforBooking["note"] &&
                                        <div className="clearfix">
                                            <div className="form-group">
                                                <i className="fa icon_note" />
                                                <div className="info pull-left">
                                                    <div className="title">GHI CHÚ</div>
                                                    <div className="text">{inforBooking["note"]}</div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                }
                                <div className="form-group text-center">
                                    <button onClick={this.submit} type="button" className="btn btn-success back_home">XÁC NHẬN</button>
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
