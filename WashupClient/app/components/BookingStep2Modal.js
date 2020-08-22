import React, { Component } from 'react'

class BookingStep2Modal extends Component {

    constructor(props) {
        super(props);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }

    componentWillMount() {
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"
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
                                        <div className="item col-md-3 col-xs-12 active">
                                            Địa chỉ nhận xe: <div className="info">156 Nguyễn Lương Bằng, P.Tân Phú, Quận 7</div>
                                            <div className="arrow-up" />
                                        </div>
                                        <div className="item col-md-3 col-xs-12">Khung giờ</div>
                                        <div className="item col-md-3 col-xs-12" />
                                    </div>
                                </div>
                                <div className="clearfix line">&nbsp;</div>
                                <div className="box_input">
                                    <h3 className="title">CHỌN NGÀY/GIỜ RỬA XE</h3>
                                </div>
                                <div className="clearfix" />
                                <div id="box_calendar" className="box_input">
                                    <div className="calendar-container">
                                        <div className="calendar-wrapper">
                                            <div className="item">
                                                <div className="tab_calendar">
                                                    <a href="javascript:void(0)" className="active">
                                                        <div className="name">HÔM NAY</div>
                                                        <div className="date">20/08/2020</div>
                                                    </a>
                                                    <a href="javascript:void(0)">
                                                        <div className="name">NGÀY MAI</div>
                                                        <div className="date">21/08/2020</div>
                                                    </a>
                                                    <a href="javascript:void(0)">
                                                        <div className="name">NGÀY KIA</div>
                                                        <div className="date">22/08/2020</div>
                                                    </a>
                                                </div>
                                                <div className="calendar_content">
                                                    <div className="hour full">
                                                        <span className="name">08:00</span>
                                                        <span className="status">Hết chỗ</span>
                                                    </div>
                                                    <div className="hour full">
                                                        <span className="name">08:15</span>
                                                        <span className="status">Hết chỗ</span>
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">08:30</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">08:45</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">09:00</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">09:15</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">09:30</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">09:45</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">10:00</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">10:15</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">10:30</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">10:45</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">11:00</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">11:15</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">11:30</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">11:45</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">12:00</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">12:15</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">12:30</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">12:45</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">13:00</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">13:15</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">13:30</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="hour book_now">
                                                        <span className="name">13:45</span>
                                                        <span className="status">Đặt ngay</span><i className="fa" />
                                                    </div>
                                                    <div className="clearfix" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="calendar_nav">
                                            <div className="button"><i className="fa fa-chevron-left" /></div>
                                            <div className="button"><i className="fa fa-chevron-right" /></div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="form-group row text-center">
                                        <button onClick={this.prev} type="button" className="btn btn-fefault" data-dismiss="modal"><i className="fa fa-angle-left" /> QUAY LẠI</button>
                                        <button onClick={this.next} type="button" className="btn btn-success"><i className="fa clipboard_check" /> CHỌN DỊCH VỤ</button>
                                    </div>
                                </div>
                                <div className="clearfix" />
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-backdrop fade in"></div>
            </div>
        )
    }
}

export default BookingStep2Modal
