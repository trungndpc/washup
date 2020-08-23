import React, { Component } from 'react'
import TimeUtils from '../utils/TimeUtils'

class BookingStep2Modal extends Component {

    constructor(props) {
        super(props);
        const inforBooking = this.props.app.inforBooking;
        this.state = {
            tabDate: 1,
            timestampEndDay: TimeUtils.getEndDay(TimeUtils.getCurrentDay()),
            timeScheduleSelected: (inforBooking && inforBooking["timeSchedule"]) ? inforBooking["timeSchedule"] : null,
            errorMsg: null
        }
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }

    componentWillMount() {
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"
        this.props.appActions.getScheduleToday();
    }

    prev() {
        if (this.props.onPrev) {
            this.props.onPrev();
        }
    }

    next() {
        let inforBooking = { ...this.props.app.inforBooking }
        if (!this.state.timeScheduleSelected) {
            this.setState({ "errorMsg": "Vui lòng chọn thời gian" });
            return false;
        }
        inforBooking["timeSchedule"] = this.state.timeScheduleSelected;
        this.props.appActions.putInforBooking(inforBooking);
        if (this.props.onNext) {
            this.props.onNext();
        }
    }

    selectTabDate(tabDateId) {
        let timestampEndDay = 0;
        if (tabDateId == 1) {
            timestampEndDay = TimeUtils.getEndDay(TimeUtils.getCurrentDay());
        } else if (tabDateId == 2) {
            timestampEndDay = TimeUtils.getEndDay(TimeUtils.getTomorrow());
        } else {
            timestampEndDay = TimeUtils.getEndDay(TimeUtils.getDayAfterTomorrow());
        }
        this.setState({
            "tabDate": tabDateId,
            "timestampEndDay": timestampEndDay
        })
    }

    selectSchedule(time) {
        this.setState({ timeScheduleSelected: time })
    }



    render() {
        const inforBooking = this.props.app.inforBooking;
        const schedules = (this.props.app.schedules && this.props.app.schedules[1]) ? this.props.app.schedules[1] : [];
        var listSchedules = [];
        schedules.forEach(function (item) {
            if ((item["time"] * 1000) <= this.state.timestampEndDay && (item["time"] * 1000) >= TimeUtils.getBeforDay(this.state.timestampEndDay)) {
                listSchedules.push(item)
            }
        }.bind(this))
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
                                            <div className="arrow-up" />
                                        </div>
                                        <div className={inforBooking["timeSchedule"] ? "item col-md-3 col-xs-12 open" : "item col-md-3 col-xs-12"}>
                                            Khung giờ: <div className="info">{TimeUtils.getDayOfWeek(inforBooking["timeSchedule"])}<br />
                                                {inforBooking["timeSchedule"] && TimeUtils.formatDate(inforBooking["timeSchedule"] * 1000)}
                                            </div>
                                        </div>
                                        {inforBooking["timeSchedule"] && <div className={inforBooking["timeSchedule"] ? "item col-md-3 col-xs-12 open" : "item col-md-3 col-xs-12"}><div className="time_up">
                                            <div className="text">Thời gian giữ chỗ</div>
                                            <div className="timer">{TimeUtils.timeSchedule(inforBooking["timeSchedule"] / 1000)}</div>
                                        </div>
                                        </div>
                                        }
                                    </div>
                                </div>
                                <div className="clearfix line">&nbsp;</div>
                                <div className="box_input">
                                    <h3 className="title">CHỌN NGÀY/GIỜ RỬA XE</h3>
                                </div>
                                <div className="clearfix" />
                                <div id="box_calendar" className="box_input">
                                    {this.state.errorMsg && <div style={{ textAlign: 'center', color: 'red', paddingBottom: '10px' }}>{this.state.errorMsg}</div>}
                                    <div className="calendar-container">
                                        <div className="calendar-wrapper">
                                            <div className="item">
                                                <div className="tab_calendar">
                                                    <a href="javascript:void(0)" onClick={() => { this.selectTabDate(1) }} className={this.state.tabDate == 1 ? "active" : ""}>
                                                        <div className="name">HÔM NAY</div>
                                                        <div className="date">{TimeUtils.formatDate(TimeUtils.getCurrentDay())}</div>
                                                    </a>
                                                    <a href="javascript:void(0)" onClick={() => { this.selectTabDate(2) }} className={this.state.tabDate == 2 ? "active" : ""}>
                                                        <div className="name"  >NGÀY MAI</div>
                                                        <div className="date">{TimeUtils.formatDate(TimeUtils.getTomorrow())}</div>
                                                    </a>
                                                    <a href="javascript:void(0)" onClick={() => { this.selectTabDate(3) }} className={this.state.tabDate == 3 ? "active" : ""}>
                                                        <div className="name" >NGÀY KIA</div>
                                                        <div className="date">{TimeUtils.formatDate(TimeUtils.getDayAfterTomorrow())}</div>
                                                    </a>
                                                </div>
                                                <div className="calendar_content">
                                                    {listSchedules && listSchedules.map((item) => {
                                                        let className = "hour"
                                                        if (item["status"] == 1) {
                                                            className = className + " book_now";
                                                        } else {
                                                            className = className + " full";
                                                        }

                                                        if (item["time"] == this.state.timeScheduleSelected) {
                                                            className = className + " active";
                                                        }
                                                        return (
                                                            <div onClick={() => this.selectSchedule(item["time"])} key={item["time"]} className={className}>
                                                                <span className="name">{TimeUtils.timeSchedule(item["time"])}</span>
                                                                <span className="status">Đặt ngay</span><i className="fa" />
                                                            </div>
                                                        )
                                                    })}
                                                    {listSchedules && listSchedules.length == 0 && <div style={{ textAlign: 'center' }}>Không có lịch</div>}
                                                    <div className="clearfix" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="calendar_nav">
                                            <div className="button"><i className="fa fa-chevron-left" /></div>
                                            <div className="button"><i className="fa fa-chevron-right" /></div>
                                        </div> */}
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
