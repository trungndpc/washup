import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import TimeUtils from '../../../utils/TimeUtils'

class Pending extends React.Component {
    constructor(props) {
        super(props)
        this.onCLickApproved = this.onCLickApproved.bind(this);
        this.onCLickReject = this.onCLickReject.bind(this);
    }

    componentDidMount() {
        this.props.appActions.getOrdersByStatus(1, 0, 10)
    }

    onClickDetail(id) {
        this.props.history.push('/order/' + id);
    }

    onCLickApproved(id) {
        this.props.appActions.updateStatus(id, 1, 2);
    }

    onCLickReject(id) {
        this.props.appActions.updateStatus(id, 1, 4);
    }


    render() {
        const bookings = this.props.app.orderByStatus && this.props.app.orderByStatus.storeOrders;
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
                                                    <h2>Chờ duyệt</h2>
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
                                                    <th>Địa chỉ</th>
                                                    <th>Lịch</th>
                                                    <th>Ngày tạo</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookings && bookings.map((item, index) => {
                                                    return (
                                                        <tr key={item["id"]}>
                                                            <td>{index + 1}</td>
                                                            <td>{item["fullName"]}</td>
                                                            <td>{item["phone"]}</td>
                                                            <td>{item["pickUpAddress"]}</td>
                                                            <td>{TimeUtils.timeSchedule(item["timeSchedule"])   + " - " + TimeUtils.toString(item["timeSchedule"] * 1000)}</td>
                                                            <td>{TimeUtils.diffTime(item["createdOn"])}</td>
                                                            <td style={{width: '120px'}}>
                                                                <div style={{display: 'inline-block', marginRight: '10px'}}>
                                                                <button onClick={() => {this.onCLickApproved(item["id"])}} className="btn btn-lightblue lightblue-icon-notika btn-reco-mg btn-button-mg waves-effect"><i className="notika-icon notika-checked"></i></button>
                                                                </div>
                                                                <div style={{display: 'inline-block'}}>
                                                                <button onClick={() => {this.onCLickReject(item["id"])}} className="btn btn-lightblue  btn-reco-mg btn-button-mg waves-effect"><i className="notika-icon notika-close"></i></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
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
)(Pending)
