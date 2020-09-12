import React, { Component } from 'react'
import { Model } from '../constants/Constants';
import HeaderBookingModal from '../components/HeaderBookingModal';
import Select from 'react-select'

class BookingStep1Modal extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.next = this.next.bind(this);
        const inforBooking = this.props.app.inforBooking;
        this.state = {
            transportId: (inforBooking && inforBooking["transportId"]) ? inforBooking["transportId"] : Model.OTO,
            errorMsg: null,
            brandInput: null
        }
        this.onChangeTransportation = this.onChangeTransportation.bind(this)
        this.getFormData = this.getFormData.bind(this);
        this.onChangeBrandInput = this.onChangeBrandInput.bind(this)
    }

    componentWillMount() {
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"
        this.props.appActions.getModels()
        this.props.appActions.getBrands(this.state.transportId)
    }

    onChangeTransportation(e) {
        var transportId = e.currentTarget.value;
        this.setState({
            transportId: transportId
        })
        this.props.appActions.getBrands(transportId)
    }

    close() {
        var body = document.getElementsByTagName('body')[0];
        body.className = ""
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    next() {
        let inforBooking = { ...this.props.app.inforBooking }
        let data = this.getFormData(inforBooking)
        if (this.isValidData(data)) {
            this.props.appActions.putInforBooking(data)
            if (this.props.onNext) {
                this.props.onNext();
            }
        }
    }

    getFormData(inforBooking) {
        let address = this.addressInputRef.value;
        let fullname = this.fullNameInputRef.value;
        let brandId = this.brandInputRef.select.state.selectValue[0].value;
        let brandSeriesId = this.brandSeriesInputRef.value;
        let license = this.licensePlateInputRef.value;
        let vehicleName = this.vehicleNameInputRef.value;
        if (!inforBooking["phone"] && this.phoneInputRef) {
            inforBooking["phone"] = this.phoneInputRef.value;
        }
        inforBooking["address"] = address;
        inforBooking["fullname"] = fullname;
        inforBooking["brandSeriesId"] = brandSeriesId;
        inforBooking["brandId"] = brandId;
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

        if (!data["brandId"]) {
            this.setState({ "errorMsg": "Vui lòng nhập hãng xe" })
            return false;
        }

        if (!data["brandSeriesId"]) {
            this.setState({ "errorMsg": "Vui lòng nhập dòng xe" })
            return false;
        }

        // if (!data["vehicleName"]) {
        //     this.setState({"errorMsg": "Vui lòng nhập tên xe"})
        //     return false;
        // }

        if (!data["licensePlate"]) {
            this.setState({ "errorMsg": "Vui lòng biển số" })
            return false;
        }

        return true;
    }

    onChangeBrandInput(value) {
        this.setState({
            brandInput: value
        })
    }

    render() {
        const inforBooking = this.props.app.inforBooking;
        const brands = this.props.app.brands;
        const listModel = (this.props.app.models && this.props.app.models[this.state.transportId]) ? this.props.app.models[this.state.transportId] : []
        const brandOptions = [];
        var defaultBrandInput = null;
        if (brands) {
            brands.forEach(item => {
                brandOptions.push({ value: item["id"], label: item["brandName"] })
            });
            defaultBrandInput = this.state.brandInput ? this.state.brandInput : brandOptions[0]
        }

        const selectStyle = {
            control: base => ({
                ...base,
                height: 34,
                minHeight: 34
            })
        };

        return (
            <div>
                <div id="ModalBooking" className="modal fade in" role="dialog" aria-hidden="false" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-body">
                                <form name="frm_booking" method="POST" action="#">
                                    <HeaderBookingModal {...this.props} onClose={this.close} step={1} />
                                    <div className="clearfix line">&nbsp;</div>
                                    <div className="box_input">
                                        <div className="form-group row">&nbsp;</div>
                                        {this.state.errorMsg && <div style={{ textAlign: "center", color: "red" }} className="form-group row">{this.state.errorMsg}</div>}
                                        {!inforBooking["phone"] &&
                                            <div className="form-group row">
                                                <div className="col-md-3 col-xs-12">Số điện thoại:</div>
                                                <div className="col-md-9 col-xs-12">
                                                    <input ref={e => this.phoneInputRef = e} type="text" name="number" placeholder="0972797184" className="form-control" />
                                                </div>
                                            </div>}
                                        <div className="form-group row">
                                            <div className="col-md-3 col-xs-12">Địa chỉ nhận xe:</div>
                                            <div className="col-md-9 col-xs-12">
                                                <input ref={e => this.addressInputRef = e} defaultValue={inforBooking && inforBooking["address"]} type="text" name="address" placeholder="156 Nguyễn Lương Bằng, P.Tân Phú, Quận 7" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-3 col-xs-12">Họ tên khách hàng:</div>
                                            <div className="col-md-9 col-xs-12">
                                                <input ref={e => this.fullNameInputRef = e} defaultValue={inforBooking && inforBooking["fullname"]} type="text" name="fullname" placeholder="A. Nguyên" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-3 col-xs-12">Loại xe:</div>
                                            <div className="col-md-2 col-xs-6">
                                                <label><input onChange={this.onChangeTransportation} type="radio" name="type" value={Model.OTO} defaultChecked={this.state.transportId == Model.OTO} /> Ô tô <i className="fa fa-car" /></label>
                                            </div>
                                            <div className="col-md-2 col-xs-6">
                                                <label><input onChange={this.onChangeTransportation} type="radio" name="type" value={Model.XEMAY} defaultChecked={this.state.transportId == Model.XEMAY} /> Xe máy <i className="fa fa-motorcycle" /></label>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-3 col-xs-12">Hãng xe:</div>
                                            <div className="col-md-4 col-xs-12">
                                                <Select classNamePrefix="tr" styles={selectStyle} value={defaultBrandInput} onChange={this.onChangeBrandInput} options={brandOptions} ref={e => this.brandInputRef = e} name="car_brand" id="brand_type" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-3 col-xs-12">Dòng xe:</div>
                                            <div className="col-md-4 col-xs-12">
                                                <select ref={e => this.brandSeriesInputRef = e} name="car_type" id="car_type" className="form-control">
                                                    {listModel && listModel.map((item) => {
                                                        return <option value={item["id"]}>{item["seriesName"]}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-3 col-xs-12">Tên xe:</div>
                                            <div className="col-md-4 col-xs-12">
                                                <input ref={e => this.vehicleNameInputRef = e} defaultValue={inforBooking && inforBooking["vehicleName"]} type="text" name="vehicleName" placeholder="SH Mode 300I" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-3 col-xs-12">Biển số:</div>
                                            <div className="col-md-4 col-xs-12">
                                                <input ref={e => this.licensePlateInputRef = e} defaultValue={inforBooking && inforBooking["licensePlate"]} type="text" name="car_number" placeholder="Nhập biển số (VD: 51F3-92457)" className="form-control" />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="form-group row text-center">
                                            <button onClick={this.close} type="button" className="btn btn-fefault m-btn-prev" data-dismiss="modal"><i className="fa fa-angle-left" /> QUAY LẠI</button>
                                            <button onClick={this.next} type="button" className="btn btn-success"><i className="fa fa-calendar-check" /> CHỌN GIỜ RỬA</button>
                                        </div>
                                    </div>
                                    <div className="clearfix" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-backdrop fade in"></div>
            </div>
        )
    }
}

export default BookingStep1Modal
