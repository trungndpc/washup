import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import TimeUtils from '../../../utils/TimeUtils'
import PriceUtils from '../../../utils/PriceUtils'
import Pagination from 'antd/es/pagination'
import DatePicker from 'react-datepicker'
class Confirmed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNumber: 1,
            date: new Date()
        }
        this.changePageNumber = this.changePageNumber.bind(this);
        this.setStartDate = this.setStartDate.bind(this)
    }

    componentDidMount() {
        this.props.appActions.getOrdersByStatus(2, 0, 10)
    }

    onClickDetail(id) {
        this.props.history.push('/order/' + id);
    }

    changePageNumber(pageNumber, pageSize) {
        this.setState({ pageNumber, pageNumber })
        this.props.appActions.getOrdersByStatus(2, pageNumber - 1, 10)
    }


    setStartDate(date) {
        this.setState({date: date})
    }



    render() {
        const orderByStatus = this.props.app.orderByStatus;
        const bookings = orderByStatus && orderByStatus.storeOrders;

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
                                <DatePicker selected={this.state.date} onChange={this.setStartDate} customInput={<CustomInputDate />} />
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="normal-table-list mg-t-30">
                                    <div className="bsc-tbl-st">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Mã đơn</th>
                                                    <th>Tên</th>
                                                    <th>SDT</th>
                                                    <th>Trạng thái</th>
                                                    <th>Giá</th>
                                                    <th>Ngày tạo</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookings && bookings.map((item, index) => {
                                                    return (
                                                        <tr key={item["id"]}>
                                                            <td>{item["orderNumber"]}</td>
                                                            <td>{item["fullName"]}</td>
                                                            <td>{item["phone"]}</td>
                                                            <td>{!item["user"] ? <span style={{ color: '#fff', backgroundColor: '#FFC107', padding: '3px 5px' }}>Chưa phân công</span> : <span style={{ color: '#fff', backgroundColor: '#8BC34A', padding: '3px 5px' }}>Chờ chấp nhận</span>}</td>
                                                            <td>{PriceUtils.toThousand(item["totalPrice"])}</td>
                                                            <td>{TimeUtils.toFormat(item["createdOn"]* 1000)}</td>
                                                            <td><button onClick={() => { this.onClickDetail(item["id"]) }} className="btn btn-lightblue lightblue-icon-notika btn-reco-mg btn-button-mg waves-effect"><i className="notika-icon notika-next"></i></button></td>
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
)(Confirmed)
