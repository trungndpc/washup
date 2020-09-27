import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'
import TimeUtils from '../../utils/TimeUtils'
import * as OrderConstant from '../../constants/order';
import Pagination from 'antd/es/pagination'
import PriceUtils from '../../utils/PriceUtils'
import DatePicker from 'react-datepicker'

const LIST_STATUS_EMP = OrderConstant.Status.EMP_ASSIGNED.value + "," + OrderConstant.Status.EMP_ASSIGNED.value
    + "," + OrderConstant.Status.EMP_REJECT.value + "," + OrderConstant.Status.PROCESSING.value + "," + OrderConstant.Status.COMPLETED.value
    + "," + OrderConstant.Status.CANCELED.value;
class Task extends React.Component {
    constructor(props) {
        super(props)
        this.changePageNumber = this.changePageNumber.bind(this);
        this.state = {
            date: new Date(),
            status: LIST_STATUS_EMP,
            pageNumber: 1,
            userId: this.props.app.user["id"]
        }
        this.onSelectStatus = this.onSelectStatus.bind(this)
        this.setStartDate = this.setStartDate.bind(this)

    }

    getDateTime(date) {
        return parseInt(new Date(date).getTime() / 1000);
    }

    componentDidMount() {
        this.props.appActions.getOrderByAssignedUser(this.state.userId, this.getDateTime(this.state.date), this.state.status, this.state.pageNumber - 1, 10);
    }

    onClickDetail(id) {
        this.props.history.push('/order/' + id);
    }

    changePageNumber(pageNumber, pageSize) {
        this.setState({ pageNumber, pageNumber })
        this.props.appActions.getOrderByAssignedUser(this.state.userId, this.getDateTime(this.state.date), this.state.status, pageNumber - 1, 10);
    }

    onSelectStatus(event) {
        let status = event.target.value;
        this.setState({status, status})
        this.props.appActions.getOrderByAssignedUser(this.state.userId, this.getDateTime(this.state.date), status, this.state.pageNumber - 1, 10);
    }

    setStartDate(date) {
        this.setState({ date: date })
        this.props.appActions.getOrderByAssignedUser(this.state.userId, this.getDateTime(date), this.state.status, this.state.pageNumber - 1, 10);
    }


    render() {
        console.log(this.state.userId)
        const pageOrder = this.props.app.orderByUser;
        const bookings = pageOrder && pageOrder.storeOrders;
        //DEBUG

        const CustomInputDate = ({ value, onClick }) => (
            <button type="button" onClick={onClick} className="btn btn-primary notika-gp-primary waves-effect">{value}</button>
        );

        return (
            <div>
                <div className="breadcomb-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="breadcomb-list">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div className="breadcomb-wp">
                                                <div className="breadcomb-icon">
                                                    <i className="notika-icon notika-windows" />
                                                </div>
                                                <div className="breadcomb-ctn">
                                                    <h2>Công việc</h2>
                                                    <p>26/08/2020</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-3">
                                            <div className="breadcomb-report">
                                                <button data-toggle="tooltip" data-placement="left" title className="btn waves-effect" data-original-title="Download Report"><i className="notika-icon notika-sent" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="normal-table-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12" style={{ textAlign: 'right' }}>
                                <select onChange={this.onSelectStatus} className="status-select" name="cars" id="cars">
                                    <option value={LIST_STATUS_EMP}>Tất cả</option>
                                    <option value={OrderConstant.Status.EMP_ASSIGNED.value}>Chờ chấp nhận</option>
                                    <option value={OrderConstant.Status.EMP_ACCEPTED.value}>Đã Chấp nhận</option>
                                    <option value={OrderConstant.Status.EMP_REJECT.value}>Đã Từ chối</option>
                                    <option value={OrderConstant.Status.COMPLETED.value}>Thành công</option>
                                    <option value={OrderConstant.Status.CANCELED.value}>Thất bại</option>
                                </select>
                                <DatePicker selected={this.state.date} onChange={this.setStartDate} customInput={<CustomInputDate />} />
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="normal-table-list mg-t-30">
                                    <div className="bsc-tbl-st">
                                        <table className="table table-striped table-overview">
                                            <thead>
                                                <tr>
                                                    <th className="m_code">Mã đơn</th>
                                                    <th className="m_name">Tên</th>
                                                    <th className="m_phone">SDT</th>
                                                    <th className="m_schedule">Lịch đặt</th>
                                                    <th className="m_address">Địa chỉ</th>
                                                    <th className="m_status">Trạng thái</th>
                                                    <th className="m_created_time">Ngày tạo</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookings && bookings.map((item, index) => {
                                                    var orderStatus = OrderConstant.findStatus(item["status"]);

                                                    var spanElement = <span style={{ color: '#fff', backgroundColor: '#00c292', padding: '3px 5px' }}>
                                                        {orderStatus.toString}
                                                    </span>
                                                    if (orderStatus.value == OrderConstant.Status.CANCELED.value) {
                                                        spanElement = <span style={{ color: '#fff', backgroundColor: 'red', padding: '3px 5px' }}>
                                                            {orderStatus.toString}
                                                        </span>
                                                    } else if (orderStatus.value == OrderConstant.Status.COMPLETED.value) {
                                                        spanElement = <span style={{ color: '#fff', backgroundColor: '#03A9F4', padding: '3px 5px' }}>
                                                            {orderStatus.toString}
                                                        </span>
                                                    }
                                                    return (
                                                        <tr onClick={() => { this.onClickDetail(item["id"]) }} key={item["id"]}>
                                                            <td>{item["orderNumber"]}</td>
                                                            <td>{item["fullName"]}</td>
                                                            <td>{item["phone"]}</td>
                                                            <td>{TimeUtils.timeSchedule(item["timeSchedule"]) + " - " + TimeUtils.toString(item["timeSchedule"] * 1000)}</td>
                                                            <td>{item["pickUpAddress"]}</td>
                                                            {/* <td>{item["totalPrice"] == 0 ? "Cập nhật" : PriceUtils.toThousand(item["totalPrice"])}</td> */}
                                                            <td style={{ width: '150px' }}>{spanElement}</td>
                                                            <td>{TimeUtils.diffTime(item["createdOn"])}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {pageOrder && <div style={{ textAlign: 'center', padding: '30px' }}> <Pagination defaultCurrent={pageOrder.page} pageSize={10} onChange={this.changePageNumber} total={pageOrder["totalPage"] * 10} /> </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Task)
