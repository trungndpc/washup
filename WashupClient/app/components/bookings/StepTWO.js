import React, { Component } from 'react'
import TimeUtils from '../../utils/TimeUtils'

class StepTWO extends Component {

    constructor(props) {
        super(props);
        const inforBooking = this.props.app.inforBooking;
        this.state = {
            tabDate: 1,
            timestampEndDay: TimeUtils.getEndDay(TimeUtils.getCurrentDay()),
            timeScheduleSelected: (inforBooking && inforBooking["timeSchedule"]) ? inforBooking["timeSchedule"] : null,
            errorMsg: null
        }
        this.modalRef = React.createRef();

        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this._handleClickOutside = this._handleClickOutside.bind(this);
    }


    componentWillMount() {
        this.props.appActions.getScheduleToday();
    }

    prev() {
        this.props.appActions.changeStepFormBooking(1);
    }

    next() {

        if (!this.state.timeScheduleSelected) {
            this.setState({ "errorMsg": "Vui lòng chọn thời gian" });
            return false;
        }
        let inforBooking = { ...this.props.app.inforBooking }
        inforBooking["timeSchedule"] = this.state.timeScheduleSelected;
        this.props.appActions.putInforBooking(inforBooking);
        this.props.appActions.changeStepFormBooking(3);
    }

    _selectTabDate(tabDateId) {
        let timestampEndDay = 0;
        if (tabDateId == 1) {
            timestampEndDay = TimeUtils.getEndDay(TimeUtils.getCurrentDay());
        } else if (tabDateId == 2) {
            timestampEndDay = TimeUtils.getEndDay(TimeUtils.getTomorrow());
        } else {
            timestampEndDay = TimeUtils.getEndDay(TimeUtils.getDayAfterTomorrow());
        }
        this.setState({
            tabDate: tabDateId,
            timestampEndDay: timestampEndDay
        })
    }

    _selectSchedule(item) {
        if (item["status"] == 1) {
            this.setState({ timeScheduleSelected: item["time"] })
        }
    }

    _handleClickOutside(event) {
        if (this.modalRef && !this.modalRef.current.contains(event.target)) {
            this.close();
        }
    }

    render() {
        var listSchedules = (this.props.app.schedules && this.props.app.schedules[this.state.tabDate])
            ? this.props.app.schedules[this.state.tabDate] : [];
        return (
            <div id="box_calendar" className="box_input">
                {this.state.errorMsg && <div style={{ textAlign: 'center', color: 'red', paddingBottom: '10px' }}>{this.state.errorMsg}</div>}
                <div className="calendar-container">
                    <div className="calendar-wrapper">
                        <div className="item">
                            <div className="tab_calendar">
                                <a href="javascript:void(0)" onClick={() => { this._selectTabDate(1) }} className={this.state.tabDate == 1 ? "active" : ""}>
                                    <div className="name">HÔM NAY</div>
                                    <div className="date">{TimeUtils.formatDate(TimeUtils.getCurrentDay())}</div>
                                </a>
                                <a href="javascript:void(0)" onClick={() => { this._selectTabDate(2) }} className={this.state.tabDate == 2 ? "active" : ""}>
                                    <div className="name"  >NGÀY MAI</div>
                                    <div className="date">{TimeUtils.formatDate(TimeUtils.getTomorrow())}</div>
                                </a>
                                <a href="javascript:void(0)" onClick={() => { this._selectTabDate(3) }} className={this.state.tabDate == 3 ? "active" : ""}>
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
                                        <div onClick={() => this._selectSchedule(item)} key={item["time"]} className={className}>
                                            <span className="name">{TimeUtils.timeSchedule(item["time"])}</span>
                                            <span className="status">{item["status"] == 1 ? "Đặt ngay" : "Đã đầy"}</span><i className="fa" />
                                        </div>
                                    )
                                })}
                                {listSchedules && listSchedules.length == 0 && <div style={{ textAlign: 'center' }}>Không có lịch</div>}
                                <div className="clearfix" />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="form-group row text-center">
                    <button onClick={this.prev} type="button" className="btn btn-fefault m-btn-prev" data-dismiss="modal"><i className="fa fa-angle-left" /> QUAY LẠI</button>
                    <button onClick={this.next} type="button" className="btn btn-success"><i className="fa clipboard_check" /> CHỌN DỊCH VỤ</button>
                </div>
            </div>
        )
    }
}

export default StepTWO
