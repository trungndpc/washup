import React, { Component } from 'react'

class BookingStep3Modal extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }


    prev() {
        if (this.props.onPrev) {
            this.props.onPrev();
        }
    }

    next() {
        if (this.props.onNext) {
            this.props.onNext();
        }
    }


    render() {
        return (
            <div>
                <div id="ModalBooking" className="modal fade in" role="dialog" aria-hidden="false" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-body"><form name="frm_booking" method="POST" action="#">
                                <div className="main-title">
                                    <div className="tab">
                                        <div className="item col-md-3 col-xs-12 open">
                                            Số điện thoại:<div className="info">0933754386</div>
                                        </div>
                                        <div className="item col-md-3 col-xs-12 open">
                                            Địa chỉ nhận xe: <div className="info">156 Nguyễn Lương Bằng, P.Tân Phú, Quận 7</div>
                                        </div>
                                        <div className="item col-md-3 col-xs-12 active">
                                            Khung giờ: <div className="info">THỨ HAI<br />20/07/2020</div>
                                            <div className="arrow-up" />
                                        </div>
                                        <div className="item col-md-3 col-xs-12"><div className="time_up">
                                            <div className="text">Thời gian giữ chỗ</div>
                                            <div className="timer">04:56</div>
                                        </div></div>
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
                                                    <a href="javascript:void(0)" className="active">
                                                        <div className="title">Vệ sinh cơ bản</div>
                                                    </a>
                                                    <a href="javascript:void(0)">
                                                        <div className="title">Làm đẹp</div>
                                                    </a>
                                                    <a href="javascript:void(0)">
                                                        <div className="title">Bảo dưỡng nhanh</div>
                                                    </a>
                                                </div>
                                                <div className="calendar_content">
                                                    <div className="service_content scrollbar" id="scroll-3">
                                                        <div className="force-overflow">
                                                            <div className="service">
                                                                <label className="container col-md-1 pull-left">
                                                                    <input type="radio" name="service_type" defaultValue={1} />
                                                                    <span className="checkmark" />
                                                                </label>
                                                                <div className="box_select box_right pull-left col-md-11">
                                                                    <img src={require('../resources/images/service_img1.png')} className="pull-left" />
                                                                    <div className="info pull-left">
                                                                        <div className="name">Rửa xe ngoài ô tô 4 chỗ</div>
                                                                        <div className="hashtag">
                                                                            <a href="#">Rửa xe</a>
                                                                            <a href="#">Vệ sinh</a>
                                                                            <a href="#">Thay nhớt</a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="price pull-right">350K</div>
                                                                </div>
                                                            </div>
                                                            <div className="service">
                                                                <label className="container col-md-1 pull-left">
                                                                    <input type="radio" name="service_type" defaultValue={1} />
                                                                    <span className="checkmark" />
                                                                </label>
                                                                <div className="box_right pull-left col-md-11">
                                                                    <img src={require('../resources/images/service_img2.png')} className="pull-left" />
                                                                    <div className="info pull-left">
                                                                        <div className="name">Rửa xe ngoài ô tô 4 chỗ</div>
                                                                        <div className="hashtag">
                                                                            <a href="#">Rửa xe</a>
                                                                            <a href="#">Vệ sinh</a>
                                                                            <a href="#">Thay nhớt</a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="price pull-right">350K</div>
                                                                </div>
                                                            </div>
                                                            <div className="service">
                                                                <label className="container col-md-1 pull-left">
                                                                    <input type="radio" name="service_type" defaultValue={1} />
                                                                    <span className="checkmark" />
                                                                </label>
                                                                <div className="box_right pull-left col-md-11">
                                                                    <img src={require('../resources/images/service_img2.png')} className="pull-left" />
                                                                    <div className="info pull-left">
                                                                        <div className="name">Rửa xe ngoài ô tô 4 chỗ</div>
                                                                        <div className="hashtag">
                                                                            <a href="#">Rửa xe</a>
                                                                            <a href="#">Vệ sinh</a>
                                                                            <a href="#">Thay nhớt</a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="price pull-right">350K</div>
                                                                </div>
                                                            </div>
                                                            <div className="service">
                                                                <label className="container col-md-1 pull-left">
                                                                    <input type="radio" name="service_type" defaultValue={1} />
                                                                    <span className="checkmark" />
                                                                </label>
                                                                <div className="box_right pull-left col-md-11">
                                                                    <img src={require('../resources/images/service_img2.png')} className="pull-left" />
                                                                    <div className="info pull-left">
                                                                        <div className="name">Rửa xe ngoài ô tô 4 chỗ</div>
                                                                        <div className="hashtag">
                                                                            <a href="#">Rửa xe</a>
                                                                            <a href="#">Vệ sinh</a>
                                                                            <a href="#">Thay nhớt</a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="price pull-right">350K</div>
                                                                </div>
                                                            </div>
                                                            <div className="service">
                                                                <label className="container col-md-1 pull-left">
                                                                    <input type="radio" name="service_type" defaultValue={1} />
                                                                    <span className="checkmark" />
                                                                </label>
                                                                <div className="box_right pull-left col-md-11">
                                                                    <img src={require('../resources/images/service_img2.png')} className="pull-left" />
                                                                    <div className="info pull-left">
                                                                        <div className="name">Rửa xe ngoài ô tô 4 chỗ</div>
                                                                        <div className="hashtag">
                                                                            <a href="#">Rửa xe</a>
                                                                            <a href="#">Vệ sinh</a>
                                                                            <a href="#">Thay nhớt</a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="price pull-right">350K</div>
                                                                </div>
                                                            </div>
                                                            <div className="clearfix" />
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="payment form-group row">
                                                        <div className="col-md-3 text-left">Chọn hình thức thanh toán:</div>
                                                        <div className="col-md-9">
                                                            <a href="javascript:void(0)" className="active"><i className="fa fa-money" /> Thanh toán trực tiếp</a>
                                                            <a href="javascript:void(0)"><i className="fa fa-credit-card" /> Thẻ ngân hàng</a>
                                                            <a href="javascript:void(0)"><i className="fa fa-credit-card" /> Ví điện tử</a>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="form-group row">
                                                        <div className="col-md-3 text-left">Ghi chú:</div>
                                                        <div className="col-md-9">
                                                            <input type="text" name="notes" defaultValue className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
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
