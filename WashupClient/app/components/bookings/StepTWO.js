import React, { Component } from 'react'
import TimeUtils from '../../utils/TimeUtils'
import HeaderBookingModal from '../../components/HeaderBookingModal';

class StepTWO extends Component {

    constructor(props) {
        super(props);
        const inforBooking = this.props.app.inforBooking;
        this.state = {
            isOpen: true,
            tabDate: 1,
            timestampEndDay: TimeUtils.getEndDay(TimeUtils.getCurrentDay()),
            timeScheduleSelected: (inforBooking && inforBooking["timeSchedule"]) ? inforBooking["timeSchedule"] : null,
            errorMsg: null
        }
        document.addEventListener('mousedown', this._handleClickOutside);
        this.modalRef = React.createRef();
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.close = this.close.bind(this);
        this._handleClickOutside = this._handleClickOutside.bind(this);
    }

    componentWillMount() {
        this.props.appActions.getScheduleToday();
    }

    prev() {
        //close current modal
        this.setState({
            isOpen: false
        })
        document.removeEventListener('mousedown', this._handleClickOutside);

        if (this.props.prev) {
            this.props.prev();
        }
    }

    next() {

        if (!this.state.timeScheduleSelected) {
            this.setState({ "errorMsg": "Vui lòng chọn thời gian" });
            return false;
        }

        //close current modal
        this.setState({
            isOpen: false
        })
        document.removeEventListener('mousedown', this._handleClickOutside);

        let inforBooking = { ...this.props.app.inforBooking }
        inforBooking["timeSchedule"] = this.state.timeScheduleSelected;
        this.props.appActions.putInforBooking(inforBooking);
        if (this.props.ok) {
            this.props.ok();
        }
    }

    close() {
        this.setState({ isOpen: false })
        document.removeEventListener('mousedown', this._handleClickOutside);
        this.props.close && this.props.close()

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
        var listSchedules = (this.props.app.schedules && this.props.app.schedules[this.state.tabDate]) ? this.props.app.schedules[this.state.tabDate] : [];
        return (
            <div>
                <div id="ModalBooking" style={{ display: `${this.state.isOpen == true ? 'block' : 'none'}` }} className="modal fade in">
                    <div className="modal-dialog modal-lg">
                        <div ref={this.modalRef} className="modal-content">
                            <div className="modal-body"><form name="frm_booking" method="POST" action="#">
                                <HeaderBookingModal {...this.props} onClose={this.close} step={2} />
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
                                        <button onClick={this.prev} type="button" className="btn btn-fefault btn-prev-step2" data-dismiss="modal">QUAY LẠI</button>
                                        <button onClick={this.next} type="button" className="btn btn-success btn-next-step2"><i className="fa clipboard_check" />CHỌN DỊCH VỤ</button>
                                    </div>
                                </div>
                                <div className="clearfix" />
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StepTWO
