import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import TimeUtils from '../../../utils/TimeUtils'
import PriceUtils from '../../../utils/PriceUtils'
import Pagination from 'antd/es/pagination'
import DatePicker from 'react-datepicker'
import * as Origin  from '../../../constants/OriginOrder';
import * as OrderConstant from '../../../constants/order';

class Confirmed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNumber: 1,
            date: new Date(),
            status: OrderConstant.Status.CONFIRMED.value
        }
        this.changePageNumber = this.changePageNumber.bind(this);
        this.setStartDate = this.setStartDate.bind(this);
        this.getDateTime = this.getDateTime.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this)
    }

    getDateTime(date) {
        return parseInt(new Date(date).getTime() / 1000);
    }

    componentDidMount() {
        this.props.appActions.getOrderByStatusAndDate(this.state.status, this.getDateTime(this.state.date), 0, 10)
    }

    onClickDetail(id) {
        this.props.history.push('/order/' + id);
    }

    changePageNumber(pageNumber, pageSize) {
        this.setState({ pageNumber, pageNumber })
        this.props.appActions.getOrdersByStatus(2, pageNumber - 1, 10)
    }

    setStartDate(date) {
        this.setState({ date: date })
        this.props.appActions.getOrderByStatusAndDate(this.state.status, this.getDateTime(date), 0, 10)
    }

    onChangeStatus(event) {
        let status = event.target.value;
        this.setState({status: status})
        this.props.appActions.getOrderByStatusAndDate(status, this.getDateTime(this.state.date), 0, 10)
    }

    render() {
        const orderByStausAndDate = this.props.app.orderByStausAndDate;
        console.log(orderByStausAndDate)
        const bookings = orderByStausAndDate && orderByStausAndDate.storeOrders;

        const CustomInputDate = ({ value, onClick }) => (
            <button type="button" onClick={onClick} className="btn btn-primary notika-gp-primary waves-effect">{value}</button>
        );

        //DEBUG
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
                                                    <h2>Đã duyệt</h2>
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
                                <select onChange={this.onChangeStatus} className="status-select" name="cars" id="cars">
                                    <option value={OrderConstant.Status.CONFIRMED.value}>Đã xác nhận</option>
                                    <option value={OrderConstant.Status.EMP_ASSIGNED.value}>Chờ nhân viên chấp nhận</option>
                                    <option value={OrderConstant.Status.EMP_REJECT.value}>Nhân viên không nhận đơn</option>
                                    <option value={OrderConstant.Status.EMP_ACCEPTED.value}>Nhân viên đã chấp nhận đơn</option>
                                </select>
                                <DatePicker selected={this.state.date} onChange={this.setStartDate} customInput={<CustomInputDate />} />
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="normal-table-list mg-t-30">
                                    <div className="bsc-tbl-st">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="m_code">Mã đơn</th>
                                                    <th className="m_code">Nguồn</th>
                                                    <th className="m_name">Tên</th>
                                                    <th className="m_phone">SDT</th>
                                                    <th className="m_status">Trạng thái</th>
                                                    <th className="m_price">Giá</th>
                                                    <th className="m_created_time">Ngày tạo</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookings && bookings.map((item, index) => {
                                                    let objStatus = OrderConstant.findStatus(item["status"]);
                                                    return (
                                                        <tr key={item["id"]}>
                                                            <td>{item["orderNumber"]}</td>
                                                            <td>{Origin.findOriginOrder(item["origin"])}</td>
                                                            <td>{item["fullName"]}</td>
                                                            <td>{item["phone"]}</td>
                                                            <td><span style={{ padding: '5px 10px', color: '#fff', backgroundColor: objStatus["color"] }}>{objStatus["toString"]}</span></td>
                                                            <td>{PriceUtils.toThousand(item["totalPrice"])}</td>
                                                            <td>{TimeUtils.toFormat(item["createdOn"] * 1000)}</td>
                                                            <td><button onClick={() => { this.onClickDetail(item["id"]) }} className="btn btn-lightblue lightblue-icon-notika btn-reco-mg btn-button-mg waves-effect"><i className="notika-icon notika-next"></i></button></td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {orderByStausAndDate && <div style={{ textAlign: 'center', padding: '30px' }}> <Pagination defaultCurrent={orderByStausAndDate.page} pageSize={10} onChange={this.changePageNumber} total={orderByStausAndDate["totalPage"] * 10} /> </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
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
)(Confirmed)
