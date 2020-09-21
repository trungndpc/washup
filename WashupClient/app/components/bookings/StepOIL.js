import React, { Component } from 'react'
import HeaderBookingModal from '../HeaderBookingModal';
import { OIL_BRAND, TYPE_SERVICE, SERVICE_THAY_NHOT } from '../../constants/Constants'
import Select from 'react-select'
import PriceUtils from '../../utils/PriceUtils';

class StepOIL extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            errorMsg: null,
            serviceOils: [],
            oil: null,
            brandOilId: 1,
            brandOil: null,
            valueOils: {}

        }
        this.next = this.next.bind(this)
        this.prev = this.prev.bind(this)
        this.oilInputRef = {}
        this.oilBrandInputRef = {}
        this.onChangeBrandOils = this.onChangeBrandOils.bind(this);
        this._handleClickOutside = this._handleClickOutside.bind(this);
        this.onChangeValueOils = this.onChangeValueOils.bind(this)
        this.submitData = this.submitData.bind(this)
    }

    _handleClickOutside(event) {
        if (this.modalRef && !this.modalRef.current.contains(event.target)) {
            this.close();
        }
    }

    componentDidMount() {
        let inforBooking = { ...this.props.app.inforBooking }
        inforBooking &&
            this.props.appActions.getOil(inforBooking["transportId"]);
        let serviceOils = inforBooking["serviceOils"];

        let brandOil = {}
        let valueOils = {}
        serviceOils.forEach((item) => {
            if (item["brandId"]) {
                brandOil[item["id"]] = item["brandId"];
            } else {
                brandOil[item["id"]] = 1;
            }
            item["oilId"] && (valueOils[item["id"]] = item["oilId"])
        })
        this.setState({
            serviceOils: serviceOils,
            brandOil: brandOil,
            valueOils: valueOils
        })
        document.addEventListener('mousedown', this.__handleClickOutside);
    }

    onChangeBrandOils(id, valueOption) {
        let brandOil = { ...this.state.brandOil }
        brandOil[id] = valueOption["value"];
        this.setState({ brandOil: brandOil })
    }

    onChangeValueOils(id, valueOption) {
        let valueOil = { ...this.state.valueOils }
        valueOil[id] = valueOption["value"]
        this.setState({ valueOils: valueOil })
    }

    prev() {
        this.submitData()
        document.removeEventListener('mousedown', this._handleClickOutside);
        this.setState({
            isOpen: false
        })
        this.props.prev()
    }

    submitData() {
        console.log("submitData")
        let serviceOilIds = [];
        let oilPrice = 0;
        let inforBooking = { ...this.props.app.inforBooking }
        const serviceOils = [...this.state.serviceOils];
        let newServiceOils = []
        if (serviceOils) {
            serviceOils.forEach(item => {
                let ref = this.oilInputRef[item["id"]];
                let brandRef = this.oilBrandInputRef[item["id"]]
                if (ref) {
                    let optionValue = ref.select.state.selectValue[0];
                    let optionBrandValue = brandRef.select.state.selectValue[0];
                    if (optionValue) {
                        let newItem = { ...item }
                        newItem["oilId"] = optionValue["value"];
                        newItem["brandId"] = optionBrandValue["value"]
                        serviceOilIds.push(optionValue["value"]);
                        newServiceOils.push(newItem);
                        oilPrice = oilPrice + optionValue["price"]
                    } else {
                        this.setState({ errorMsg: 'Vui lòng chọn nhớt' })
                        return;
                    }

                }
            })
        }
        inforBooking["serviceOils"] = newServiceOils;
        inforBooking["serviceOilIds"] = serviceOilIds;
        inforBooking["oilPrice"] = oilPrice;
        console.log(inforBooking)
        this.props.appActions.putInforBooking(inforBooking);
    }

    next() {
        this.submitData();
        document.removeEventListener('mousedown', this._handleClickOutside);
        this.props.ok();
    }


    findOptionById(options, id) {
        let rs;
        options.forEach(item => {
            if (item["value"] == id) {
                rs = item;
            }
        })
        return rs;
    }

    render() {

        const oils = this.props.app.oils ? this.props.app.oils : []
        const brandOil = this.state.brandOil;
        const lstOilObject = {};
        const serviceOils = this.state.serviceOils;

        if (brandOil && serviceOils) {
            serviceOils.forEach((item) => {
                let brandOilId = brandOil[item["id"]];
                let optionOils = [];
                if (oils) {
                    oils.forEach((oilItem) => {
                        if (oilItem["manufacturer"] == brandOilId) {
                            optionOils.push({ value: oilItem["id"], label: <span>{oilItem["name"]} - <span style={{ color: 'red' }}> {PriceUtils.toThousand(oilItem["currentPrice"])} </span></span>, price: oilItem["currentPrice"] })
                        }
                    })
                }
                lstOilObject[item["id"]] = optionOils;
            })
        }

        const optionsBrandOils = [];
        for (const key in OIL_BRAND) {
            optionsBrandOils.push({ value: OIL_BRAND[key], label: key })
        }

        return (
            <div>
                <div id="ModalBooking" style={{ display: `${this.state.isOpen == true ? 'block' : 'none'}` }} className="modal fade in">
                    <div className="modal-dialog modal-lg">
                        <div ref={this.modalRef} className="modal-content">
                            <div className="modal-body"><form name="frm_booking" method="POST" action="#">
                                <HeaderBookingModal {...this.props} onClose={this.close} step={3} />
                                <div className="clearfix line">&nbsp;</div>
                                <div className="box_input">
                                    <h3 className="title">CHỌN LOẠI NHỚT</h3>
                                </div>
                                <div className="clearfix" />
                                <div id="box_calendar" className="box_input">
                                    <div className="calendar-container">
                                        <div className="calendar-wrapper">
                                            {(this.state.valueOils && this.state.serviceOils) && this.state.serviceOils.map((item, index) => {
                                                let valueBrandId = brandOil[item["id"]];
                                                let optionBrand = this.findOptionById(optionsBrandOils, valueBrandId)

                                                let listOptionsOil = lstOilObject[item["id"]];
                                                let valueOilId = this.state.valueOils[item["id"]];
                                                let optionOil = this.findOptionById(listOptionsOil, valueOilId)
                                                return (
                                                    <div key={item["id"]} className="item">
                                                        <div className="form-group row">
                                                            <div className="col-md-3 text-left">{item["name"]}</div>
                                                            <div className="colo col-md-3">
                                                                <Select value={optionBrand} onChange={(valueOption) => { this.onChangeBrandOils(item["id"], valueOption) }} options={optionsBrandOils} ref={e => this.oilBrandInputRef[item["id"]] = e} />
                                                            </div>
                                                            <div className="colo col-md-6">
                                                                <Select value={optionOil} onChange={(valueOption) => { this.onChangeValueOils(item["id"], valueOption) }} options={listOptionsOil} ref={e => this.oilInputRef[item["id"]] = e} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <hr />
                                    {this.state.errorMsg && <div style={{ textAlign: 'center', color: 'red', padding: '5px' }}>{this.state.errorMsg}</div>}
                                    <div className="form-group row text-center">
                                        <button onClick={this.prev} type="button" className="btn btn-fefault step_back m-btn-prev"><i className="fa fa-angle-left" /> QUAY LẠI</button>
                                        <button onClick={this.next} type="button" className="btn btn-success2">ĐỒNG Ý</button>
                                    </div>
                                </div>
                                <div className="clearfix" />
                            </form></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StepOIL
