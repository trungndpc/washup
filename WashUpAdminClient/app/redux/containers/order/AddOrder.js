import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import { TYPE_SERVICE } from '../../../constants/Constants'
import TimeUtils from '../../../utils/TimeUtils'
import Select from 'react-select'
import PriceUtils from '../../../utils/PriceUtils'
import SelectOil from '../../../components/form-order/SelectOil';
import ButtonWithConfirrm from '../../../components/ButtonWithConfirrm'
import { takeLatest } from 'redux-saga'

class AddOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabScheduleId: 1,
            tabServiceId: TYPE_SERVICE.CO_BAN,
            transportId: 1,
            brandSeriesId: 0,
            brandInput: null,
            listServiceId: [],
            errorMsg: null,
            scheduleTime: null,
        }
        this.onChangeTabSchedule = this.onChangeTabSchedule.bind(this)
        this.onChangeService = this.onChangeService.bind(this)
        this.onClickTabService = this.onClickTabService.bind(this)
        this._onChangeBrand = this._onChangeBrand.bind(this)
        this._onChangeVehicleType = this._onChangeVehicleType.bind(this)
        this.getListSeletedOil = this.getListSeletedOil.bind(this)
        this._onSelectBrandSeries = this._onSelectBrandSeries.bind(this)
        this.getFormInput = this.getFormInput.bind(this)
        this.onChangeTimeSchedule = this.onChangeTimeSchedule.bind(this)
        this.createOrder = this.createOrder.bind(this);
        this.prev = this.prev.bind(this);
        window.goToOverviewOrder = this.prev;

    }

    componentDidMount() {
        this.props.appActions.getSchedule();
        this.props.appActions.getServicesALL();
        this.props.appActions.getBrand(this.state.transportId)
        this.props.appActions.getBrandSeries()
    }

    createOrder() {
        const data = this.getFormInput();
        if (data) {
            this.props.appActions.createOrder(data);
        }
    }

    prev() {
        this.props.history.push('/order');
    }

    getFormInput() {
        
        let phone = this.phoneInputRef && this.phoneInputRef.value;
        if (!phone) {
            this.setState({ errorMsg: 'Vui lòng nhập số điện thoại' })
            return;
        }
        let name = this.nameInputRef && this.nameInputRef.value;
        if (!name) {
            this.setState({errorMsg: "Vui lòng nhập tên"});
            return;
        }
        let address = this.addressInputRed && this.addressInputRed.value;
        if (!address) {
            this.setState({errorMsg: "Vui lòng nhập địa chỉ"});
            return;
        }
        let brandId = this.brandInputRef.select.state.selectValue[0].value.id;
        let brandSeriesId = JSON.parse(this.brandSeriesInputRef.value).id;
        let nameVehicle = this.nameVehicleInputRef && this.nameVehicleInputRef.value;
        if (!nameVehicle) {
            this.setState({errorMsg: "Vui lòng nhập tên của phương tiện"})
            return;
        }
        let licensePlateVehicle = this.licensePlateInputRef &&  this.licensePlateInputRef.value;
        if (!licensePlateVehicle) {
            this.setState({errorMsg: "Vui lòng nhập biển số xe"})
            return;
        }
        let listServiceId = this.state.listServiceId;
        if (!listServiceId || listServiceId.length == 0) {
            this.setState({errorMsg: "Vui lòng chọn dịch vụ"})
            return;
        }

        let timeSchedule = this.state.scheduleTime;
        if (!timeSchedule) {
            this.setState({errorMsg: "Vui lòng chọn lịch"})
            return;
        }

        const data = {
            phone: phone,
            pickUpAddress: address,
            timeSchedule: timeSchedule,
            licensePlate: licensePlateVehicle,
            fullName: name,
            paymentMethod: 1,
            brandId: brandId,
            brandSeriesId: brandSeriesId,
            serviceIds: listServiceId,
            vehicleName: nameVehicle
          }
        
        return data;
    }

    onChangeTabSchedule(id) {
        this.setState({ tabScheduleId: id })
    }

    onClickTabService(id) {
        this.setState({ tabServiceId: id })
        this.props.appActions.getServices(this.state.transportId, id, this.state.brandSeriesId);
    }

    removeElement(array, elem) {
        var index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
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

    _onChangeBrand(value) {
        this.setState({
            brandInput: value
        })
    }

    _onChangeVehicleType(e) {
        var transportId = e.currentTarget.value;
        this.setState({
            transportId: transportId
        })
        this.props.appActions.getBrand(transportId);
    }

    getListSeletedOil() {
        var rs = []
        if (this.state.listServiceId.indexOf("ff808181741c1c93017420bb81b7000c") >= 0) {
            rs.push({ id: "ff808181741c1c93017420bb81b7000c", type: 1, name: "Thay nhớt máy" })
        }
        if (this.state.listServiceId.indexOf("ff808181748853bb0174885a13b50003") >= 0) {
            rs.push({ id: "ff808181748853bb0174885a13b50003", type: 1, name: "Thay nhớt lap" })
        }
        return rs;
    }

    _onSelectBrandSeries(e) {
        this.setState({ brandSeriesId: JSON.parse(e.target.value).id });
    }

    onChangeTimeSchedule(time) {
        this.setState({scheduleTime: time})
    }



    render() {
        console.log(this.state.errorMsg)
        //DEBUG
        var transportId = this.state.transportId;
        var brandSeriesId = this.state.brandSeriesId;
        var services = this.props.app.servicesALL;

        const brandSeries = this.props.app.brandSeries && this.props.app.brandSeries.filter(item => item.category == transportId);
        if (brandSeries && brandSeriesId == 0 && brandSeries[0]) {
            brandSeriesId = brandSeries[0].id;
        }

        services = services && services.filter(item => item.type == this.state.tabServiceId && item.category == transportId && (item.brandSeriesId == brandSeriesId || !item.brandSeriesId));

        var tabScheduleId = this.state.tabScheduleId;
        const schedules = this.props.app.schedules && this.props.app.schedules[tabScheduleId]


        const brands = this.props.app.brands;
        var _defaultBrand = null;
        const brandOptions = [];
        if (brands) {
            brands.forEach(item => {
                brandOptions.push({ value: item, label: item["brandName"] })
            });
            _defaultBrand = this.state.brandInput ? this.state.brandInput : brandOptions[0]
        }

        var listOil = this.getListSeletedOil();
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
                <div className="normal-table-area" style={{ marginBottom: '70px' }}>
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
                                                    <input ref={e => this.phoneInputRef = e} type="text" className="form-control form-m" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 title">Tên: </div>
                                                <div className="col-md-9">
                                                    <input ref={e => this.nameInputRef = e} type="text" className="form-control form-m" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 title">Địa chỉ: </div>
                                                <div className="col-md-9">
                                                    <input ref={e => this.addressInputRed = e} type="text" className="form-control form-m" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 title">Loại xe: </div>
                                                <div className="col-md-9 line34 ">
                                                    <div className="row vehicle-i">
                                                        <div className="col-md-6">
                                                            <input onChange={this._onChangeVehicleType} value={1} checked={this.state.transportId == 1} name="pt" type="radio" />
                                                            <label >Xe máy</label>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <input onChange={this._onChangeVehicleType} value={2} checked={this.state.transportId == 2} name="pt" type="radio" />
                                                            <label >Ô tô</label>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 title">Hãng xe: </div>
                                                <div className="col-md-9">
                                                    <Select ref={e => this.brandInputRef = e} onChange={this._onChangeBrand} value={_defaultBrand} options={brandOptions} className="" name="car_brand" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 title">Dòng xe: </div>
                                                <div className="col-md-9">
                                                    <select onChange={this._onSelectBrandSeries} ref={e => this.brandSeriesInputRef = e} name="car_type" className="form-control form-m">
                                                        {brandSeries && brandSeries.map((item) => {
                                                            return <option key={item["id"]} value={JSON.stringify(item)}>{item["seriesName"]}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 title">Tên xe: </div>
                                                <div className="col-md-9">
                                                    <input ref={e => this.nameVehicleInputRef = e} type="text" className="form-control form-m" />

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 title">Biển số: </div>
                                                <div className="col-md-9">
                                                    <input ref={e => this.licensePlateInputRef = e} type="text" className="form-control form-m" />
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
                                                                var isCheked = this.state.listServiceId.indexOf(item["id"]) >= 0;
                                                                return (
                                                                    <tr key={item["key"]}>
                                                                        <td>{index + 1}</td>
                                                                        <td><input checked={isCheked} onChange={(event => { this.onChangeService(item["id"]) })} type="checkbox" /></td>
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


                        {listOil.length > 0 &&
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="widget-tabs-int">
                                        <div className="tab-hd">
                                            <h2>Chọn nhớt</h2>
                                        </div>
                                        <div className="widget-tabs-list">
                                            <div className="row">
                                                <div className="content-form">
                                                    {listOil && listOil.map((item, index) => {
                                                        return (
                                                            <SelectOil brandSeriesId={brandSeriesId} data={item} {...this.props}>{item.name}</SelectOil>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="row mgTop30">
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
                                                                return (
                                                                    <tr key={item["key"]}>
                                                                        <td>{index + 1}</td>
                                                                        <td><input onChange={() => this.onChangeTimeSchedule(item["time"])} type="radio" name="schedule" /></td>
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

                        <div className="row mgTop30">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="widget-tabs-int">
                                    <div className="widget-tabs-list">
                                        <div className="row">
                                            <div className="content-form text-right">
                                                <button onClick={this.prev} className=" mgright30 btn notika-btn-gray btn-reco-mg btn-button-mg waves-effect"> Quay lại</button>

                                                <ButtonWithConfirrm ok={this.createOrder}>
                                                    <button className="btn btn-primary primary-icon-notika waves-effect"><i className="notika-icon notika-checked"></i> Tạo đơn</button>
                                                </ButtonWithConfirrm>
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
