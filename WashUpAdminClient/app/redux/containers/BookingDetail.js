import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'
import TimeUtils from '../../utils/TimeUtils'

class BookingDetail extends React.Component {
    constructor(props) {
        super(props)
        this.getBookingIdFromParams = this.getBookingIdFromParams.bind(this);
    }

    async componentDidMount() {
        await this.getBookingIdFromParams();
        this.props.appActions.getBookingById(this.state.bookingId)
    }

    getBookingIdFromParams() {
        let params = this.props.match.params;
        if (!params) {
            return false;
        }
        this.setState({ bookingId: params.id })
    }



    render() {
        const booking = this.props.app.booking;
        console.log(booking)
        //DEBUG
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
                                                    <button data-toggle="tooltip" data-placement="left" title className="btn waves-effect" data-original-title="Download Report"><i className="notika-icon notika-sent" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="invoice-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="invoice-wrap">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                <div className="invoice-hs">
                                                    <span>Phone</span>
                                                    <h2>{booking["phone"]}</h2>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                <div className="invoice-hs date-inv sm-res-mg-t-30 tb-res-mg-t-30 tb-res-mg-t-0">
                                                    <span>Schedule</span>
                                                    <h2>{TimeUtils.timeSchedule(booking["timeSchedule"])   + " - " + TimeUtils.toString(booking["timeSchedule"] * 1000)}</h2>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                <div className="invoice-hs wt-inv sm-res-mg-t-30 tb-res-mg-t-30 tb-res-mg-t-0">
                                                    <span>Price</span>
                                                    <h2>{booking["totalPrice"]}</h2>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                <div className="invoice-hs gdt-inv sm-res-mg-t-30 tb-res-mg-t-30 tb-res-mg-t-0">
                                                    <span>Status</span>
                                                    <h2>{booking["status"]}</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="invoice-hds-pro">
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <div className="invoice-cmp-ds" style={{ textAlign: 'center' }}>
                                                        <div className="comp-tl">
                                                            <h2>{booking["fullName"]}</h2>
                                                            <p>{booking["pickUpAddress"]}</p>
                                                        </div>
                                                        <div className="cmp-ph-em">
                                                            <span>License Plate: {booking["licensePlate"]}</span>
                                                            <span>Car: {booking["model"].brandName} </span>
                                                        </div>
                                                    </div>
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
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {booking["services"] && booking["services"].map((item, index) => {
                                                                return (
                                                                    <tr key={item["id"]}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{item["name"]}</td>
                                                                        <td>1</td>
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
