import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import TimeUtils from '../../../utils/TimeUtils'
import Pagination from 'antd/es/pagination'
import UpdateStatusModal from './UpdateStatusModal'
import RejectOrderModal from './RejectOrderModal'


class Pending extends React.Component {
    constructor(props) {
        super(props)
        this.onCLickApproved = this.onCLickApproved.bind(this);
        this.onCLickReject = this.onCLickReject.bind(this);
        this.state = {
            pageNumber: 1,
            id: 0,
            rejectId: 0
        }
        this.changePageNumber = this.changePageNumber.bind(this);
        this.okModal = this.okModal.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
        this.okRejectModal = this.okRejectModal.bind(this);
        this.cancelRejectModal = this.cancelRejectModal.bind(this);
    }

    componentDidMount() {
        this.props.appActions.getOrdersByStatus(1, 0, 10)
    }

    onClickDetail(id) {
        this.props.history.push('/order/' + id);
    }

    onCLickApproved(id) {
        this.setState({id: id})
        // this.props.appActions.updateStatus(id, 1, 2);
    }

    onCLickReject(id) {
        this.setState({rejectId: id})
        // this.props.appActions.updateStatus(id, 1, 4);
    }

    changePageNumber(pageNumber, pageSize) {
        this.setState({pageNumber, pageNumber})
        this.props.appActions.getOrdersByStatus(1, pageNumber - 1, 10)
    }

    okRejectModal(note) {
        this.props.appActions.updateStatus(this.state.rejectId, 1, 4);
        this.setState({rejectId: 0})
    }

    cancelRejectModal(note) {
        this.setState({rejectId: 0})
    }

    okModal(note) {
        console.log(note)
        this.props.appActions.updateStatus(this.state.id, 1, 2);
        this.setState({id: 0})
    }

    cancelModal() {
        this.setState({id: 0})
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
                                                            <td>{item["orderNumber"]}</td>
                                                            <td>{item["fullName"]}</td>
                                                            <td>{item["phone"]}</td>
                                                            <td>{item["pickUpAddress"]}</td>
                                                            <td>{TimeUtils.timeSchedule(item["timeSchedule"]) + " - " + TimeUtils.toString(item["timeSchedule"] * 1000)}</td>
                                                            <td>{TimeUtils.diffTime(item["createdOn"])}</td>
                                                            <td style={{ width: '120px' }}>
                                                                <div style={{ display: 'inline-block', marginRight: '10px' }}>
                                                                    <button onClick={() => { this.onCLickApproved(item["id"]) }} className="btn btn-lightblue lightblue-icon-notika btn-reco-mg btn-button-mg waves-effect"><i className="notika-icon notika-checked"></i></button>
                                                                </div>
                                                                <div style={{ display: 'inline-block' }}>
                                                                    <button onClick={() => { this.onCLickReject(item["id"]) }} className="btn btn-lightblue  btn-reco-mg btn-button-mg waves-effect"><i className="notika-icon notika-close"></i></button>
                                                                </div>
                                                            </td>
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
                {this.state.id != 0 && <UpdateStatusModal ok={this.okModal} cancel={this.cancelModal} /> }
                {this.state.rejectId != 0 && <RejectOrderModal ok={this.okRejectModal} cancel={this.cancelRejectModal}  />}
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
