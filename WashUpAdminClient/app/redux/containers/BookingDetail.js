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
import ButtonWithConfirrm from '../../components/ButtonWithConfirrm'
import ButtonWithNoteModal from '../../components/ButtonWithNoteModal'

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
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.click2Completed = this.click2Completed.bind(this)
        this.click2NotCompleted = this.click2NotCompleted.bind(this)
        this.click2EmpAccept = this.click2EmpAccept.bind(this)
        this.click2EmpReject = this.click2EmpReject.bind(this)
        this.click2Stared = this.click2Stared.bind(this)
    }

    async componentDidMount() {
        await this.getBookingIdFromParams();
        this.props.appActions.getBookingById(this.state.bookingId)
    }

    click2Stared() {
        const booking = this.props.app.booking;
        this.props.appActions.updateStatus(booking["id"], booking["status"], Order.Status.PROCESSING.value, "");
    }

    click2Completed() {
        const booking = this.props.app.booking;
        this.props.appActions.updateStatus(booking["id"], booking["status"], Order.Status.COMPLETED.value, "");
    }

    click2EmpReject(note) {
        const booking = this.props.app.booking;
        this.props.appActions.updateStatus(booking["id"], booking["status"], Order.Status.EMP_REJECT.value, note);
    }

    click2EmpAccept() {
        const booking = this.props.app.booking;
        this.props.appActions.updateStatus(booking["id"], booking["status"], Order.Status.EMP_ACCEPTED.value, "");
    }

    click2NotCompleted(note) {
        const booking = this.props.app.booking;
        this.props.appActions.updateStatus(booking["id"], booking["status"], Order.Status.CANCELED.value, note);
    }


    getBookingIdFromParams() {
        let params = this.props.match.params;
        if (!params) {
            return false;
        }
        this.setState({ bookingId: params.id })
    }

    openEdit() {
        this.setState({
            isEditService: true
        })
    }

    closeEdit() {
        console.log("close edit")
        this.setState({
            isEditService: false
        })
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
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="breadcomb-wp">
                                                    <div className="breadcomb-icon">
                                                        <i className="notika-icon notika-windows" />
                                                    </div>
                                                    <div className="breadcomb-ctn">
                                                        <h2>Chi tiết đơn</h2>
                                                        <p>#{booking["orderNumber"]}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {statusId != Order.Status.COMPLETED.value && statusId != Order.Status.CANCELED.value && !this.state.isEditService &&
                        <div className="breadcomb-area">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="breadcomb-list">

                                            {statusId != Order.Status.PROCESSING.value && statusId != Order.Status.EMP_ASSIGNED.value &&
                                                <div className="mgrg-10">
                                                    <ButtonWithNoteModal ok={this.click2NotCompleted} title={'Ghi chú'} placeholder="Vui lòng cho biết lý do">
                                                        <button className="btn btn-danger danger-icon-notika waves-effect"><i className="notika-icon notika-checked"></i> Hủy đơn</button>
                                                    </ButtonWithNoteModal>
                                                </div>
                                            }


                                            {((statusId == Order.Status.CONFIRMED.value || Order.Status.PROCESSING.value || Order.Status.PENDING.value)
                                                && !this.state.isEditService && statusId != Order.Status.EMP_ASSIGNED.value) &&
                                                <div className="mgrg-10">
                                                    <button onClick={this.openEdit} className="btn btn-lightgreen lightgreen-icon-notika waves-effect"><i className="notika-icon notika-checked"></i> Cập nhật</button>
                                                </div>
                                            }



                                            {statusId == Order.Status.EMP_ASSIGNED.value &&
                                                <div className="group-f">
                                                    <div className="mgrg-10">
                                                        <ButtonWithNoteModal ok={this.click2EmpReject} title={'Ghi chú'} placeholder="Lý do bạn không nhận đơn hàng này">
                                                            <button className="btn btn-default btn-icon-notika waves-effect"><i className="notika-icon notika-menus"></i> Không nhận</button>
                                                        </ButtonWithNoteModal>
                                                    </div>

                                                    <div className="mgrg-10">
                                                        <ButtonWithConfirrm ok={this.click2EmpAccept}>
                                                            <button className="btn btn-primary primary-icon-notika waves-effect"><i className="notika-icon notika-checked"></i> Chấp nhận</button>
                                                        </ButtonWithConfirrm>
                                                    </div>
                                                </div>
                                            }

                                            {statusId == Order.Status.EMP_ACCEPTED.value &&
                                                <div className="mgrg-10">
                                                    <ButtonWithConfirrm ok={this.click2Stared}>
                                                        <button className="btn btn-primary primary-icon-notika waves-effect"><i className="notika-icon notika-checked"></i> Bắt đầu đi..</button>
                                                    </ButtonWithConfirrm>
                                                </div>
                                            }

                                            {statusId == Order.Status.PROCESSING.value && !this.state.isEditService &&
                                                <div className="group-f">

                                                    <div className="mgrg-10">
                                                        <ButtonWithNoteModal ok={this.click2NotCompleted} title={'Ghi chú'} placeholder="Vui lòng cho biết lý do">
                                                            <button className="btn btn-default btn-icon-notika waves-effect"><i className="notika-icon notika-menus"></i> Không hoàn thành</button>
                                                        </ButtonWithNoteModal>
                                                    </div>

                                                    <div className="mgrg-10">
                                                        <ButtonWithConfirrm ok={this.click2Completed}>
                                                            <button className="btn btn-primary primary-icon-notika waves-effect"><i className="notika-icon notika-checked"></i> Hoàn thành</button>
                                                        </ButtonWithConfirrm>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {!this.state.isEditService &&
                        <div>
                            {(statusId == Order.Status.CONFIRMED.value || statusId == Order.Status.EMP_REJECT.value) &&
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
                            {this.state.isShowFormCancelOrder && <RejectOrderModal ok={this.click2NotCompleted} cancel={this.click2CloseModal} />}
                        </div>
                    }
                    {this.state.isEditService && listServicesId &&
                        <div className="container">
                            <AddService no={this.closeEdit} ref={(e) => this.updateOrderFormRef = e} timeSchedule={booking["timeSchedule"]} listCurrentServices={listServicesId} brandSeriesId={booking["brandSeriesId"]} transportId={booking["brandSeries"]["category"]} {...this.props} />
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
