import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'

class Booking extends React.Component {
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
                                                    <h2>Booking</h2>
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
                                    <div className="basic-tb-hd">
                                        <h2>Striped rows</h2>
                                        <p>Add Classes (<code>.table-striped</code>) to any table row within the tbody</p>
                                    </div>
                                    <div className="bsc-tbl-st">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Username</th>
                                                    <th>Nickname</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Alexandra</td>
                                                    <td>Christopher</td>
                                                    <td>@makinton</td>
                                                    <td>Ducky</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Madeleine</td>
                                                    <td>Hollaway</td>
                                                    <td>@hollway</td>
                                                    <td>Cheese</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Sebastian</td>
                                                    <td>Johnston</td>
                                                    <td>@sebastian</td>
                                                    <td>Jaycee</td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>Mitchell</td>
                                                    <td>Christin</td>
                                                    <td>@mitchell4u</td>
                                                    <td>AdskiDeAnus</td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td>Elizabeth</td>
                                                    <td>Belkitt</td>
                                                    <td>@belkitt</td>
                                                    <td>Goat</td>
                                                </tr>
                                                <tr>
                                                    <td>6</td>
                                                    <td>Benjamin</td>
                                                    <td>Parnell</td>
                                                    <td>@wayne234</td>
                                                    <td>Pokie</td>
                                                </tr>
                                                <tr>
                                                    <td>7</td>
                                                    <td>Katherine</td>
                                                    <td>Buckland</td>
                                                    <td>@anitabelle</td>
                                                    <td>Wokie</td>
                                                </tr>
                                                <tr>
                                                    <td>8</td>
                                                    <td>Nicholas</td>
                                                    <td>Walmart</td>
                                                    <td>@mwalmart</td>
                                                    <td>Spike</td>
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
)(Booking)
