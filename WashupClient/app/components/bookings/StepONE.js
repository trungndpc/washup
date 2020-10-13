import React, { Component } from 'react'
import { Model } from '../../constants/Constants';
import HeaderBookingModal from '../../components/HeaderBookingModal';
import Select from 'react-select'

class StepONE extends Component {

    constructor(props) {
        super(props);

        const inforBooking = this.props.app.inforBooking;
        this.state = {
            isOpen: false,
            isFadeIn: false,
            placeholderVehicleName : "CX5",
            transportId: (inforBooking && inforBooking["transportId"]) ? inforBooking["transportId"] : Model.OTO,
            errorMsg: null,
            brandInput: (inforBooking && inforBooking["brand"]) ? { value: inforBooking["brand"], label: inforBooking["brand"]["brandName"] } : null
        }
        this.modalRef = React.createRef();

        this.close = this.close.bind(this);
        this.next = this.next.bind(this);
        this.open = this.open.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this._handleClickOutside = this._handleClickOutside.bind(this);
        this._onChangeBrand = this._onChangeBrand.bind(this)
        this._onChangeVehicleType = this._onChangeVehicleType.bind(this)

    }


    open() {
        this.setState({ isOpen: true });
        setTimeout(function () {
            this.setState({ isFadeIn: true })
        }.bind(this), 50)
        document.addEventListener('mousedown', this._handleClickOutside);
    }

    close() {
        this.setState({ isFadeIn: false })
        setTimeout(function () {
            this.setState({ isOpen: false })
        }.bind(this), 150)
        document.removeEventListener('mousedown', this._handleClickOutside);
        this.props.close && this.props.close()
    }

    next() {
        //Put data
        let inforBooking = { ...this.props.app.inforBooking }
        let data = this.getFormData(inforBooking)
        if (this.isValidData(data)) {

            //close current modal
            this.setState({
                isOpen: false
            })
            document.removeEventListener('mousedown', this._handleClickOutside);

            this.props.appActions.putInforBooking(data)
            if (this.props.ok) {
                this.props.ok();
            }
        }
    }

    getFormData(inforBooking) {
        let address = this.addressInputRef.value;
        let fullname = this.fullNameInputRef.value;
        let brand = this.brandInputRef.select.state.selectValue[0].value;
        let brandSeries = this.brandSeriesInputRef.value;
        let license = this.licensePlateInputRef.value;
        let vehicleName = this.vehicleNameInputRef.value;
        if (!inforBooking["phone"] && this.phoneInputRef) {
            inforBooking["phone"] = this.phoneInputRef.value;
        }
        inforBooking["address"] = address;
        inforBooking["fullname"] = fullname;
        inforBooking["brandSeries"] = JSON.parse(brandSeries);
        inforBooking["brand"] = brand;
        inforBooking["licensePlate"] = license;
        inforBooking["transportId"] = this.state.transportId;
        inforBooking["vehicleName"] = vehicleName;
        return inforBooking;
    }

    isValidData(data) {
        if (this.phoneInputRef && !data["phone"]) {
            this.setState({ "errorMsg": "Vui lòng nhập số điện thoại" })
            return false;
        }

        if (!data["address"]) {
            this.setState({ "errorMsg": "Vui lòng nhập địa chỉ" })
            return false;
        }

        if (!data["fullname"]) {
            this.setState({ "errorMsg": "Vui lòng nhập tên" })
            return false;
        }

        if (!data["brand"]) {
            this.setState({ "errorMsg": "Vui lòng nhập hãng xe" })
            return false;
        }

        if (!data["brandSeries"]) {
            this.setState({ "errorMsg": "Vui lòng nhập dòng xe" })
            return false;
        }

        if (!data["licensePlate"]) {
            this.setState({ "errorMsg": "Vui lòng biển số" })
            return false;
        }

        return true;
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
        this.props.appActions.getBrands(transportId)
        if(transportId == Model.OTO) {
            this.setState({placeholderVehicleName: "CX5"})
        }else {
            this.setState({placeholderVehicleName: "SH Mode 300I"})
        }
    }

    _handleClickOutside(event) {
        if (this.modalRef && !this.modalRef.current.contains(event.target)) {
            this.close();
        }
    }


    render() {
        const inforBooking = this.props.app.inforBooking;

        const brandSeries = (this.props.app.brandSeries && this.props.app.brandSeries[this.state.transportId]) ? this.props.app.brandSeries[this.state.transportId] : []

        const brandOptions = [];
        var _defaultBrand = null;
        const brands = this.props.app.brands;
        if (brands[this.state.transportId]) {
            brands[this.state.transportId].forEach(item => {
                brandOptions.push({ value: item, label: item["brandName"] })
            });
            _defaultBrand = this.state.brandInput ? this.state.brandInput : brandOptions[0]
        }

        return (
            <div>
                <div id="ModalBooking" style={{ display: `${this.state.isOpen == true ? 'block' : 'none'}` }} className={`modal fade ${this.state.isFadeIn ? 'in' : ''}`} >
                    <div className="modal-dialog modal-lg">
                        <div ref={this.modalRef} className="modal-content">
                            <div className="modal-body">
                                <form name="frm_booking" method="POST" action="#">
                                    <HeaderBookingModal {...this.props} onClose={this.close} step={1} />
                                    <div className="clearfix line">&nbsp;</div>
                                    {inforBooking &&
                                        <div className="box_input">
                                            {this.state.errorMsg && <div style={{ textAlign: "center", color: "red" }} className="form-group row">{this.state.errorMsg}</div>}
                                            {!inforBooking["phone"] &&
                                                <div className="form-group row">
                                                    <div className="col-md-3 col-xs-12">Số điện thoại:</div>
                                                    <div className="col-md-9 col-xs-12">
                                                        <input ref={e => this.phoneInputRef = e} type="text" name="number" placeholder="0972797184" className="form-control" />
                                                    </div>
                                                </div>}
                                            <div className="form-group row">
                                                <div className="col-md-3 col-xs-12">Địa chỉ nhận xe: <span className="red-req">*</span></div>
                                                <div className="col-md-9 col-xs-12">
                                                    <input ref={e => this.addressInputRef = e} defaultValue={inforBooking && inforBooking["address"]} type="text" name="address" placeholder="156 Nguyễn Lương Bằng, P.Tân Phú, Quận 7" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-3 col-xs-12">Họ tên khách hàng: <span className="red-req">*</span></div>
                                                <div className="col-md-9 col-xs-12">
                                                    <input ref={e => this.fullNameInputRef = e} defaultValue={inforBooking && inforBooking["fullname"]} type="text" name="fullname" placeholder="A. Nguyên" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-3 col-xs-12">Loại xe: </div>
                                                <div className="col-md-2 col-xs-6">
                                                    <label><input onChange={this._onChangeVehicleType} type="radio" name="VehicleType" value={Model.OTO} defaultChecked={this.state.transportId == Model.OTO} /> Ô tô <i className="fa fa-car" /></label>
                                                </div>
                                                <div className="col-md-2 col-xs-6">
                                                    <label><input onChange={this._onChangeVehicleType} type="radio" name="VehicleType" value={Model.XEMAY} defaultChecked={this.state.transportId == Model.XEMAY} /> Xe máy <i className="fa fa-motorcycle" /></label>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-3 col-xs-12">Hãng xe: </div>
                                                <div className="col-md-4 col-xs-12">
                                                    <Select value={_defaultBrand} onChange={this._onChangeBrand} options={brandOptions} ref={e => this.brandInputRef = e} name="car_brand" id="brand_type" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-3 col-xs-12">Dòng xe: </div>
                                                <div className="col-md-4 col-xs-12">
                                                    <select ref={e => this.brandSeriesInputRef = e} name="car_type" id="car_type" className="form-control">
                                                        {brandSeries && brandSeries.map((item) => {
                                                            return <option value={JSON.stringify(item)}>{item["seriesName"]}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-3 col-xs-12">Tên xe:</div>
                                                <div className="col-md-4 col-xs-12">
                                                    <input ref={e => this.vehicleNameInputRef = e} defaultValue={inforBooking && inforBooking["vehicleName"]} type="text" name="vehicleName" placeholder={this.state.placeholderVehicleName} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-3 col-xs-12">Biển số: <span className="red-req">*</span></div>
                                                <div className="col-md-4 col-xs-12">
                                                    <input ref={e => this.licensePlateInputRef = e} defaultValue={inforBooking && inforBooking["licensePlate"]} type="text" name="car_number" placeholder="Nhập biển số (VD: 51F3-92457)" className="form-control" />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="form-group row text-center">
                                                <button onClick={this.close} type="button" className="btn btn-fefault btn-prev-step1" data-dismiss="modal">QUAY LẠI</button>
                                                <button onClick={this.next} type="button" className="btn btn-success btn-next-step1"><i className="fa fa-calendar-check" /> CHỌN GIỜ RỬA</button>
                                            </div>
                                        </div>
                                    }
                                    <div className="clearfix" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StepONE
