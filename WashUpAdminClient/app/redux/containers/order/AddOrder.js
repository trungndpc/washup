import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import { TYPE_SERVICE } from '../../../constants/Constants'
import TimeUtils from '../../../utils/TimeUtils'
import Pagination from 'antd/es/pagination'
import Select from 'react-select'
import PriceUtils  from '../../../utils/PriceUtils'


class AddOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabScheduleId: 1,
            tabServiceId: TYPE_SERVICE.CO_BAN,
            transportId: 1,
            brandSeriesId: 0
        }
        this.onChangeTabSchedule = this.onChangeTabSchedule.bind(this)
        this.onChangeService = this.onChangeService.bind(this)
        this.onClickTabService = this.onClickTabService.bind(this)
    }

    componentDidMount() {
        this.props.appActions.getSchedule();
        this.props.appActions.getServices(this.state.transportId, this.state.tabServiceId, this.state.brandSeriesId);
    }

    onChangeTabSchedule(id) {
        this.setState({ tabScheduleId: id })
    }
    
    onClickTabService(id) {
        this.setState({ tabServiceId: id })
        this.props.appActions.getServices(this.state.transportId, id, this.state.brandSeriesId);
    }

    onChangeService(id) {
        if (this.state.listServiceId.indexOf(id) >= 0) {
            let tmpServiceIds = [...this.state.listServiceId];
            tmpServiceIds = this.removeElement(tmpServiceIds, id);
            this.setState({ listServiceId: tmpServiceIds });
        } else {
            let tmpServiceIds = [...this.state.listServiceId];
            tmpServiceIds.push(id);
            this.setState({ listServiceId: tmpServiceIds });
        }
    }




    render() {
        //DEBUG
        const services = this.props.app.services;
        const schedules = this.props.app.schedules && this.props.app.schedules[this.state.tabScheduleId]

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
                                                    <h2>Tạo đơn</h2>
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
                <div className="normal-table-area" style={{marginBottom: '70px'}}>
                    <div className="container">
                        <div className="row" style={{ marginBottom: '30px' }}>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="form-element-list mg-t-30">
                                    <div className="cmp-tb-hd">
                                        <h2>Thông tin cơ bản</h2>
                                    </div>
                                    <div className="row">
                                        <div className="content-form">
                                            <div className="row">
                                                <div className="col-md-2 title">SDT: </div>
                                                <div className="col-md-9">
                                                    <input type="text" className="form-control form-m" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 title">Tên: </div>
                                                <div className="col-md-9">
                                                    <input type="text" className="form-control form-m" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 title">Địa chỉ: </div>
                                                <div className="col-md-9">
                                                    <input type="text" className="form-control form-m" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 title">Loại xe: </div>
                                                <div className="col-md-9 line34 ">
                                                    <div className="row vehicle-i">
                                                        <div className="col-md-6">
                                                            <input name="pt" type="radio" />
                                                            <label >Xe máy</label>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <input name="pt" type="radio" />
                                                            <label >Ô tô</label>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 title">Hãng xe: </div>
                                                <div className="col-md-9">
                                                    <Select options={[]} className="" name="car_brand" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 title">Dòng xe: </div>
                                                <div className="col-md-9">
                                                    <Select options={[]} className="" name="car_type" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 title">Tên xe: </div>
                                                <div className="col-md-9">
                                                    <input type="text" className="form-control form-m" />

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 title">Biển số: </div>
                                                <div className="col-md-9">
                                                    <input type="text" className="form-control form-m" />

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 title">Lịch: </div>
                                                <div className="col-md-9">
                                                    <input type="text" className="form-control form-m" />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="widget-tabs-int">
                                    <div className="tab-hd">
                                        <h2>Dịch vụ</h2>
                                    </div>
                                    <div className="widget-tabs-list">
                                        <ul className="nav nav-tabs">
                                            <li className={this.state.tabServiceId == TYPE_SERVICE.CO_BAN ? "active" : ""}><a onClick={() => this.onClickTabService(TYPE_SERVICE.CO_BAN)} data-toggle="tab" href="#home">Cơ bản</a></li>
                                            <li className={this.state.tabServiceId == TYPE_SERVICE.NANG_CAO ? "active" : ""}><a onClick={() => this.onClickTabService(TYPE_SERVICE.NANG_CAO)} data-toggle="tab" href="#menu1">Nâng cao</a></li>
                                            <li className={this.state.tabServiceId == TYPE_SERVICE.COMBO_TAINHA ? "active" : ""}><a onClick={() => this.onClickTabService(TYPE_SERVICE.COMBO_TAINHA)} data-toggle="tab" href="#menu2">Combo</a></li>
                                        </ul>
                                        <div className="tab-content tab-custom-st">
                                            <div id="home" className="tab-pane fade in active">
                                                <div className="tab-ctn">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th></th>
                                                                <th>Tên dịch vụ</th>
                                                                <th>Giá </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {services && services.map((item, index) => {
                                                                // var isCheked = this.state.listServiceId.indexOf(item["id"]) >= 0;
                                                                return (
                                                                    <tr key={item["key"]}>
                                                                        <td>{index + 1}</td>
                                                                        <td><input onChange={(event => { this.onChangeService(item["id"]) })} type="checkbox" /></td>
                                                                        <td>{item["name"]}</td>
                                                                        <td>{PriceUtils.toThousand(item["price"])}</td>
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

                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="widget-tabs-int">
                                    <div className="tab-hd">
                                        <h2>Lịch</h2>
                                    </div>
                                    <div className="widget-tabs-list">
                                        <ul className="nav nav-tabs">
                                            <li className={this.state.tabScheduleId == 1 ? "active" : ""}><a onClick={() => this.onChangeTabSchedule(1)} href="#hn">Hôm nay</a></li>
                                            <li className={this.state.tabScheduleId == 2 ? "active" : ""}><a onClick={() => this.onChangeTabSchedule(2)} href="#nm">Ngày mai</a></li>
                                            <li className={this.state.tabScheduleId == 3 ? "active" : ""}><a onClick={() => this.onChangeTabSchedule(3)} href="#nk">Ngày kia</a></li>
                                        </ul>
                                        <div className="tab-content tab-custom-st">
                                            <div id="home" className="tab-pane fade in active">
                                                <div className="tab-ctn">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th></th>
                                                                <th>Thời gian</th>
                                                                <th>Trạng thái</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {schedules && schedules.map((item, index) => {
                                                                const isCheked = this.state.timeSchedule == item["time"];
                                                                return (
                                                                    <tr key={item["key"]}>
                                                                        <td>{index + 1}</td>
                                                                        <td><input checked={isCheked} onChange={() => this.onChangeTimeSchedule(item["time"])} type="radio" name="schedule" /></td>
                                                                        <td>{TimeUtils.timeSchedule(item["time"])}</td>
                                                                        <td>{item["status"] == 1 ? "Còn Trống" : "Đã đầy"}</td>
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
)(AddOrder)
