import React, { Component } from 'react'
import TimeUtils from '../utils/TimeUtils';

class BookingStep3Modal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabServiceId : 1,
            serviceId: null,
            methodPaymentId: 1,
            errorMsg: null
        }
    }

    componentWillMount() {
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.props.appActions.getServices();
    }


    prev() {
        if (this.props.onPrev) {
            this.props.onPrev();
        }
    }

    next() {
        let inforBooking = {...this.props.app.inforBooking}
        if(!this.state.serviceId) {
            this.setState({errorMsg: 'Vui lòng chọn một dịch vụ'})
            return false;
        }
        inforBooking["serviceId"] = this.state.serviceId;
        inforBooking["paymentMethod"] = this.state.methodPaymentId;
        if (this.noteInputRef && this.noteInputRef.value) {
        inforBooking["note"] = this.noteInputRef.value;
        }
        this.props.appActions.putInforBooking(inforBooking);
        this.props.appActions.booking(inforBooking);
        if (this.props.onNext) {
            this.props.onNext();
        }
    }

    selectTabService(tabServiceId) {
        this.setState({
            tabServiceId: tabServiceId,
        })
    }

    selectServiceId(serviceId) {
        this.setState({
            serviceId: serviceId,
            errorMsg: null

        })
    }

    selectMethodPayment(methodId) {
        this.setState({
            methodPaymentId: methodId
        })
    } 


    render() {
        const services = this.props.app.services
        const inforBooking = this.props.app.inforBooking;
        const timeSechedule = inforBooking["timeSchedule"] * 1000;
        return (
            <div>
                <div id="ModalBooking" className="modal fade in" role="dialog" aria-hidden="false" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-body"><form name="frm_booking" method="POST" action="#">
                                <div className="main-title">
                                    <div className="tab">
                                        <div className="item col-md-3 col-xs-12 open">
                                            Số điện thoại:<div className="info">{inforBooking["phone"]}</div>
                                        </div>
                                        <div className="item col-md-3 col-xs-12 active">
                                            Địa chỉ nhận xe: <div className="info">{inforBooking["address"]}</div>
                                        </div>
                                        <div className="item col-md-3 col-xs-12 active">
                                            Khung giờ: <div className="info">{TimeUtils.getDayOfWeek(timeSechedule)}<br />{TimeUtils.formatDate(timeSechedule)}</div>
                                            <div className="arrow-up" />
                                        </div>
                                        <div className="item col-md-3 col-xs-12"><div className="time_up">
                                            <div className="text">Thời gian giữ chỗ</div>
                                            <div className="timer">{TimeUtils.timeSchedule(timeSechedule / 1000)}</div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix line">&nbsp;</div>
                                <div className="box_input">
                                    <h3 className="title">CHỌN DỊCH VỤ &amp; THANH TOÁN</h3>
                                </div>
                                <div className="clearfix" />
                                <div id="box_calendar" className="box_input">
                                    <div className="calendar-container">
                                        <div className="calendar-wrapper">
                                            <div className="item">
                                                <div className="tab_calendar">
                                                    <a onClick={() => this.selectTabService(1)} href="javascript:void(0)" className={this.state.tabServiceId == 1 ? 'active' : ''}>
                                                        <div className="title">Vệ sinh cơ bản</div>
                                                    </a>
                                                    <a onClick={() => this.selectTabService(2)} href="javascript:void(0)" className={this.state.tabServiceId == 2 ? 'active' : ''}>
                                                        <div className="title">Làm đẹp</div>
                                                    </a>
                                                    <a onClick={() => this.selectTabService(3)} href="javascript:void(0)" className={this.state.tabServiceId == 3 ? 'active' : ''}>
                                                        <div className="title">Bảo dưỡng nhanh</div>
                                                    </a>
                                                </div>
                                                <div className="calendar_content">
                                                    <div className="service_content scrollbar" id="scroll-3">
                                                        {this.state.tabServiceId == 1 ?  
                                                            <div className="force-overflow">
                                                            { services.map((item) => {
                                                                return (
                                                                    <div key={item["id"]} onClick={e => this.selectServiceId(item["id"])} className="service">
                                                                        <label className="container col-md-1 pull-left">
                                                                            <input type="radio" name="service_type" checked={this.state.serviceId == item["id"]} />
                                                                            <span className="checkmark" />
                                                                        </label>
                                                                        <div className="box_select box_right pull-left col-md-11">
                                                                            <img src={require('../resources/images/service_img1.png')} className="pull-left" />
                                                                            <div className="info pull-left">
                                                                                <div className="name">{item["name"]}</div>
                                                                                <div className="hashtag">
                                                                                    <a href="#">Rửa xe</a>
                                                                                    <a href="#">Vệ sinh</a>
                                                                                    <a href="#">Thay nhớt</a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="price pull-right">{item["price"] / 1000 + "K"}</div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                            <div className="clearfix" />
                                                        </div>
                                                        : 
                                                        <div style={{textAlign: 'center', paddingTop: '30pxs'}}>
                                                            Dịch vụ chưa được hỗ trợ
                                                        </div> 
                                                        }
                                                    </div>
                                                    <hr />
                                                    <div className="payment form-group row">
                                                        {(this.state.methodPaymentId == 2 || this.state.methodPaymentId == 3 ) && <div style={{textAlign: 'center', color: 'red'}}>Phương thức chưa được support</div>}
                                                        <div className="col-md-3 text-left">Chọn hình thức thanh toán:</div>
                                                        <div className="col-md-9">
                                                            <a href="javascript:void(0)" onClick={e => this.selectMethodPayment(1)} className={this.state.methodPaymentId == 1 ? 'active' : ''}><i className="fa fa-money" /> Thanh toán trực tiếp</a>
                                                            <a href="javascript:void(0)" onClick={e => this.selectMethodPayment(2)} className={this.state.methodPaymentId == 2 ? 'active' : ''}><i className="fa fa-credit-card" /> Thẻ ngân hàng</a>
                                                            <a href="javascript:void(0)" onClick={e => this.selectMethodPayment(3)} className={this.state.methodPaymentId == 3 ? 'active' : ''}><i className="fa fa-credit-card" /> Ví điện tử</a>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="form-group row">
                                                        <div className="col-md-3 text-left">Ghi chú:</div>
                                                        <div className="col-md-9">
                                                            <input ref={e => this.noteInputRef = e} type="text" name="notes" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    {this.state.errorMsg &&  <div style={{textAlign: 'center', color: 'red', paddingBottom: '30px'}}>{this.state.errorMsg}</div> }
                                    <div className="form-group row text-center">
                                        <button onClick={this.prev} type="button" className="btn btn-fefault step_back"><i className="fa fa-angle-left" /> QUAY LẠI</button>
                                        <button onClick={this.next} type="button" className="btn btn-success2"><i className="fa fa-check-circle" /> HOÀN TẤT - ĐẶT LỊCH</button>
                                    </div>
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

export default BookingStep3Modal
