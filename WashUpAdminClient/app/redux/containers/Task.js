import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'
import TimeUtils from '../../utils/TimeUtils'
import * as OrderConstant from '../../constants/order';
import Pagination from 'antd/es/pagination'
import PriceUtils from '../../utils/PriceUtils'

class Task extends React.Component {
    constructor(props) {
        super(props)
        this.changePageNumber = this.changePageNumber.bind(this);
        this.state = {
            pageNumber: 1
        }
    }

    componentDidMount() {
        this.props.appActions.getOrderByAssignedUser("ff80818174792a630174792c0cec0000", this.state.pageNumber, 10);
    }

    onClickDetail(id) {
        this.props.history.push('/order/' + id);
    }

    changePageNumber(pageNumber, pageSize) {
        this.setState({ pageNumber, pageNumber })
        this.props.appActions.getOrderByAssignedUser("ff80818174792a630174792c0cec0000", pageNumber - 1, 10);
    }


    render() {
        const pageOrder = this.props.app.orderByUser;
        const bookings = pageOrder && pageOrder.storeOrders;
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
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="normal-table-list mg-t-30">
                                    <div className="bsc-tbl-st">
                                        <table className="table table-striped table-overview">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Tên</th>
                                                    <th>SDT</th>
                                                    <th>Lịch đặt</th>
                                                    <th>Địa chỉ</th>
                                                    <th>Trạng thái</th>
                                                    <th>Ngày tạo</th>
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
                                                            <td>{index + 1}</td>
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
                                {pageOrder && <div style={{textAlign: 'center', padding: '30px'}}> <Pagination defaultCurrent={pageOrder.page} pageSize={10} onChange={this.changePageNumber} total={pageOrder["totalPage"] * 10} /> </div>}
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
