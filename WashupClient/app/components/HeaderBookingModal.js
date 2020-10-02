import React, { Component } from 'react'
import TimeUtils from '../utils/TimeUtils';

class HeaderBookingModal extends Component {

    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this)
    }

    onClose() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        const inforBooking = this.props.app.inforBooking;
        console.log(inforBooking)
        return (
            <div className="main-title m-main-tile">
                <i onClick={this.onClose} className="fa fa-times close-modal" />
                {inforBooking &&
                    <div className="tab pc">
                        <div className="item col-md-3 col-xs-12 active">
                            Số điện thoại:<div className="info">{inforBooking["phone"] && inforBooking["phone"]}</div>
                            {this.props.step == 1 && <div className="arrow-up" />}
                        </div>
                        <div className={inforBooking["address"] ? "item col-md-3 col-xs-12 open " : "item col-md-3 col-xs-12"}>
                            Địa chỉ nhận xe: <div className="info two-line">{inforBooking["address"]}</div>
                            {this.props.step == 2 && <div className="arrow-up" />}
                        </div>
                        <div className={inforBooking["timeSchedule"] ? "item col-md-3 col-xs-12 open" : "item col-md-3 col-xs-12"}>
                            Khung giờ: <div className="info">{TimeUtils.getDayOfWeek(inforBooking["timeSchedule"] * 1000)}<br />
                                {inforBooking["timeSchedule"] && TimeUtils.formatDate(inforBooking["timeSchedule"] * 1000)}
                                {this.props.step == 3 && <div className="arrow-up" />}
                            </div>
                        </div>
                        {this.props.step == 4 && <div className={inforBooking["timeSchedule"] ? "item col-md-3 col-xs-12 open" : "item col-md-3 col-xs-12"}>
                            <div className="time_up">
                                <div className="text">Thời gian giữ chỗ</div>
                                <div className="timer">5 phút</div>
                            </div>
                            {this.props.step == 4 && <div className="arrow-up" />}
                        </div>}
                    </div>
                }
                <div style={{ display: 'none' }} className="tab mobile">
                    <h4 style={{ color: '#fff', textAlign: 'center' }}>THÔNG TIN ĐẶT LỊCH</h4>
                </div>
            </div>
        )
    }
}

export default HeaderBookingModal
