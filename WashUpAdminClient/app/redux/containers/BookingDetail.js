import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'
import TimeUtils from '../../utils/TimeUtils'
import Assignment from '../../components/Assignment'
import AddService from '../../components/AddService'
import PriceUtils from '../../utils/PriceUtils'
import * as Order from '../../constants/order';
import UpdateStatusModal from './order/UpdateStatusModal'
import RejectOrderModal from './order/RejectOrderModal'

class BookingDetail extends React.Component {
    constructor(props) {
        super(props)
        this.getBookingIdFromParams = this.getBookingIdFromParams.bind(this);
        this.state = {
            isEditService: false,
            isShowFormSSOrder: false,
            isShowFormCancelOrder: false,
            id: 0,
            currentStatus: 0
        }
        this.onClickEditService = this.onClickEditService.bind(this)
        this.onClickExitEditing = this.onClickExitEditing.bind(this)
        this.onClickSave = this.onClickSave.bind(this);
        this.onClickAcceptOrder = this.onClickAcceptOrder.bind(this);
        this.onClickSuceesOrder = this.onClickSuceesOrder.bind(this)
        this.onClickFailedOrder = this.onClickFailedOrder.bind(this)
        this.cancelSSOrderModal = this.cancelSSOrderModal.bind(this)
        this.cancelRejectOrderModal = this.cancelRejectOrderModal.bind(this)
        this.okSSOrderModal = this.okSSOrderModal.bind(this)
        this.okCancelOrderModal = this.okCancelOrderModal.bind(this)
    }

    async componentDidMount() {
        await this.getBookingIdFromParams();
        this.props.appActions.getBookingById(this.state.bookingId)
    }


    onClickSuceesOrder(id, currentStatus) {
        this.setState({isShowFormSSOrder: true, id: id, currentStatus: currentStatus})
    }

    onClickFailedOrder(id, currentStatus) {
        this.setState({isShowFormCancelOrder: true, id: id, currentStatus: currentStatus})
    }

    cancelSSOrderModal() {
        this.setState({isShowFormSSOrder: false, id: 0, currentStatus: 0})
    }

    cancelRejectOrderModal() {
        this.setState({isShowFormCancelOrder: false, id: 0, currentStatus: 0})
    }

    okSSOrderModal(note) {
        this.props.appActions.updateStatus(this.state.id, this.state.currentStatus, Order.Status.COMPLETED.value, note);
        this.setState({isShowFormSSOrder: false, id: 0, currentStatus: 0})

    }

    okCancelOrderModal(note) {
        this.props.appActions.updateStatus(this.state.id, this.state.currentStatus, Order.Status.CANCELED.value, note);
        this.setState({isShowFormCancelOrder: false, id: 0, currentStatus: 0})
    }


    getBookingIdFromParams() {
        let params = this.props.match.params;
        if (!params) {
            return false;
        }
        this.setState({ bookingId: params.id })
    }

    onClickEditService() {
        this.setState({
            isEditService: true
        })
    }

    onClickExitEditing() {
        this.setState({
            isEditService: false
        })
    }

    onClickSave(note) {
        this.setState({
            isEditService: false
        })
        const booking = this.props.app.booking && this.props.app.booking;
        const data = this.updateOrderFormRef.getValueUpdate();
        booking && this.props.appActions.updateOrder(booking["id"], data)
    }

    onClickAcceptOrder(id, currentStatus) {
        this.props.appActions.updateStatus(id, currentStatus, Order.Status.PROCESSING.value);
    }

    render() {
        const booking = this.props.app.booking && this.props.app.booking;
        const statusId = booking && booking["status"]
        var listServicesId;
        if (booking && booking["services"]) {
            listServicesId = []
            booking["services"].forEach((item) => {
                listServicesId.push(item["id"])
            })
        }
        return (
            <div>
                {!booking && <div style={{ textAlign: 'center', fontSize: '40px', fontWeight: '600' }} >ID INVALID</div>}
                {booking && <div>
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
                                                        <h2>Booking Detail</h2>
                                                        <p>#{booking["id"]}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-3">

                                                <div className="breadcomb-report">
                                                    {this.state.isEditService &&
                                                        <div>
                                                            <button onClick={this.onClickSave} className="btn btn-success notika-btn-success waves-effect">Lưu</button>
                                                            <button onClick={this.onClickExitEditing} style={{ color: '#333', marginLeft: '30px' }} className="btn btn-default notika-btn-default waves-effect">Thoát</button>
                                                        </div>
                                                    }

                                                    {statusId == Order.Status.PROCESSING.value && !this.state.isEditService &&
                                                        <div>
                                                            <button style={{ marginRight: '30px', color: 'black' }} onClick={() => this.onClickFailedOrder(booking["id"], booking["status"])} className="btn btn-default notika-btn-default waves-effect">Đơn hàng thất bại</button>
                                                            <button style={{ marginRight: '30px' }} onClick={() => this.onClickSuceesOrder(booking["id"], booking["status"])} className="notika-btn-lime btn btn-reco-mg btn-button-mg waves-effect">
                                                                Hoàn tất đơn hàng
                                                        </button>
                                                            <button style={{ marginRight: '30px' }} onClick={this.onClickEditService} className="notika-btn-lime btn btn-reco-mg btn-button-mg waves-effect">
                                                                Cập nhật đơn hàng
                                                        </button>
                                                        </div>
                                                    }
                                                    {statusId == Order.Status.CONFIRMED.value && !this.state.isEditService && booking["user"] &&
                                                        <button onClick={() => { this.onClickAcceptOrder(booking["id"], booking["status"]) }} className="notika-btn-lime btn btn-reco-mg btn-button-mg waves-effect ">Tiếp nhận đơn hàng</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {!this.state.isEditService &&
                        <div>

                            {!booking["user"] &&
                                <div className="assignment-emp">
                                    <div className="container">
                                        <Assignment orderId={this.state.bookingId} {...this.props} />
                                    </div>
                                </div>
                            }

                            <div className="invoice-area">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="invoice-wrap">
                                                <div className="invoice-hds-pro">
                                                    <div className="row">
                                                        <div className="col-lg-12col-md-12 col-sm-12 col-xs-12">
                                                            <div className="invoice-cmp-ds">
                                                                <div className="invoice-frm">
                                                                    <span>Khách hàng</span>
                                                                </div>
                                                                <div className="comp-tl">
                                                                    <h2><i className="notika-icon notika-support"></i> {booking["fullName"]}</h2>
                                                                    <p><i className="notika-icon notika-map"></i> {booking["pickUpAddress"]}</p>
                                                                </div>
                                                                <div className="cmp-ph-em">
                                                                    <span>Phương tiện: </span> <span style={{ color: '#31708f' }}> {booking["brand"] && booking["brand"]["brandName"]} [{booking["brandSeries"] && booking["brandSeries"]["seriesName"]}] -  {booking["vehicleName"]} - {booking["licensePlate"]}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {booking["user"] &&
                                                            <div style={{ marginTop: '30px' }} className="col-lg-12col-md-12 col-sm-12 col-xs-12">
                                                                <div className="invoice-cmp-ds">
                                                                    <div className="invoice-frm">
                                                                        <span>Nhân viên</span>
                                                                    </div>
                                                                    <div className="comp-tl">
                                                                        <h2><i className="notika-icon notika-support"></i>{booking["user"]["fullName"]}</h2>
                                                                        <p><i className="notika-icon notika-map"></i> [Dữ liệu chưa có]</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                        <div className="invoice-hs">
                                                            <span>Số điện thoại</span>
                                                            <h2>{booking["phone"]}</h2>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                        <div className="invoice-hs date-inv sm-res-mg-t-30 tb-res-mg-t-30 tb-res-mg-t-0">
                                                            <span>Lịch hẹn</span>
                                                            <h2>{TimeUtils.timeSchedule(booking["timeSchedule"]) + " - " + TimeUtils.toString(booking["timeSchedule"] * 1000)}</h2>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                        <div className="invoice-hs wt-inv sm-res-mg-t-30 tb-res-mg-t-30 tb-res-mg-t-0">
                                                            <span>Giá</span>
                                                            <h2>{PriceUtils.toThousand(booking["totalPrice"])}</h2>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                        <div className="invoice-hs gdt-inv sm-res-mg-t-30 tb-res-mg-t-30 tb-res-mg-t-0">
                                                            <span>Trạng thái</span>
                                                            <h2>{Order.findStatus(booking["status"]).toString}</h2>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="invoice-sp">
                                                            <table className="table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Service</th>
                                                                        <th>Quantity</th>
                                                                        <th>Description</th>
                                                                        <th>Price</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {booking["services"] && booking["services"].map((item, index) => {
                                                                        return (
                                                                            <tr key={item["id"]}>
                                                                                <td>{index + 1}</td>
                                                                                <td>{item["name"]}</td>
                                                                                <td>1</td>
                                                                                <td></td>
                                                                                <td></td>
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
                            </div>
                            {this.state.isShowFormSSOrder && <UpdateStatusModal ok={this.okSSOrderModal} cancel={this.cancelSSOrderModal}/>}
                            {this.state.isShowFormCancelOrder && <RejectOrderModal ok={this.okCancelOrderModal} cancel={this.cancelRejectOrderModal}/>}
                        </div>
                    }
                    {this.state.isEditService && listServicesId &&
                        <div className="container">
                            <AddService ref={(e) => this.updateOrderFormRef = e} timeSchedule={booking["timeSchedule"]} listCurrentServices={listServicesId} brandSeriesId={booking["brandSeriesId"]} transportId={booking["brandSeries"]["category"]} {...this.props} />
                        </div>}
                </div>
                }

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
)(BookingDetail)
