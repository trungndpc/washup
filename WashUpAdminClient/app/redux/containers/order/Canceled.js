import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import TimeUtils from '../../../utils/TimeUtils'
import Pagination from 'antd/es/pagination'


class Canceled extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNumber: 1
        }
        this.changePageNumber = this.changePageNumber.bind(this);
    }

    componentDidMount() {
        this.props.appActions.getOrdersByStatus(4, 0, 10)
    }

    onClickDetail(id) {
        this.props.history.push('/order/' + id);
    }

    changePageNumber(pageNumber, pageSize) {
        this.setState({pageNumber, pageNumber})
        this.props.appActions.getOrdersByStatus(4, pageNumber - 1, 10)
    }


    render() {
        const orderByStatus = this.props.app.orderByStatus;
        const bookings = orderByStatus && orderByStatus.storeOrders;
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
                                                    <h2>Đã hủy</h2>
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
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Tên</th>
                                                    <th>SDT</th>
                                                    <th>Lý do</th>
                                                    <th>Lịch</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookings && bookings.map((item, index) => {
                                                    return (
                                                        <tr key={item["id"]}>
                                                            <td>{item["orderNumber"]}</td>
                                                            <td>{item["fullName"]}</td>
                                                            <td>{item["phone"]}</td>
                                                            <td>Quá xa, Liên lạc không được</td>
                                                            <td>{TimeUtils.timeSchedule(item["timeSchedule"])   + " - " + TimeUtils.toString(item["timeSchedule"] * 1000)}</td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {orderByStatus && <div style={{ textAlign: 'center', padding: '30px' }}> <Pagination defaultCurrent={orderByStatus.page} pageSize={10} onChange={this.changePageNumber} total={orderByStatus["totalPage"] * 10} /> </div>}
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
)(Canceled)
