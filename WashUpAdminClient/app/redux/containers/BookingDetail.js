import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'

class BookingDetail extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
    }



    render() {
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
                                                    <h2>Booking Detail</h2>
                                                    <p>#974124</p>
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
                                                <span>Invoice#</span>
                                                <h2>456656</h2>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                            <div className="invoice-hs date-inv sm-res-mg-t-30 tb-res-mg-t-30 tb-res-mg-t-0">
                                                <span>Date</span>
                                                <h2>20/03/2018</h2>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                            <div className="invoice-hs wt-inv sm-res-mg-t-30 tb-res-mg-t-30 tb-res-mg-t-0">
                                                <span>Whatever</span>
                                                <h2>472-000</h2>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                            <div className="invoice-hs gdt-inv sm-res-mg-t-30 tb-res-mg-t-30 tb-res-mg-t-0">
                                                <span>Grand Total</span>
                                                <h2>$25,980</h2>
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
                                                            <th>Item Title</th>
                                                            <th>Unit Price</th>
                                                            <th>Quantity</th>
                                                            <th>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>Crusal Damperal</td>
                                                            <td>$500</td>
                                                            <td>05</td>
                                                            <td>$3000</td>
                                                        </tr>
                                                        <tr>
                                                            <td>2</td>
                                                            <td>Indriacal Superral</td>
                                                            <td>$650</td>
                                                            <td>06</td>
                                                            <td>$7000</td>
                                                        </tr>
                                                        <tr>
                                                            <td>3</td>
                                                            <td>Vidaska Adrioal</td>
                                                            <td>$400</td>
                                                            <td>03</td>
                                                            <td>$2000</td>
                                                        </tr>
                                                        <tr>
                                                            <td>4</td>
                                                            <td>Croustal Desrikal</td>
                                                            <td>$600</td>
                                                            <td>04</td>
                                                            <td>$7000</td>
                                                        </tr>
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
