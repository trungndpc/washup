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

        }
        this.next = this.next.bind(this)
        this.prev = this.prev.bind(this)
        this.oilInputRef = {}
        this.onChangeBrandOils = this.onChangeBrandOils.bind(this);
        this._handleClickOutside = this._handleClickOutside.bind(this);
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
        serviceOils.forEach((item) => {
            brandOil[item["id"]] = 2
        })
        this.setState({
            serviceOils: serviceOils,
            brandOil: brandOil
        })
        document.addEventListener('mousedown', this.__handleClickOutside);
    }

    onChangeBrandOils(id, valueOption) {
        let brandOil = { ...this.state.brandOil }
        brandOil[id] = valueOption["value"];
        this.setState({ brandOil: brandOil })
    }

    prev() {
        document.removeEventListener('mousedown', this._handleClickOutside);
        this.setState({
            isOpen: false
        })
        this.props.prev()
    }

    next() {
        let serviceOilIds = [];
        let oilPrice = 0;
        let inforBooking = { ...this.props.app.inforBooking }
        const serviceOils = [...this.state.serviceOils];
        if (serviceOils) {
            serviceOils.forEach(item => {
                let ref = this.oilInputRef[item["id"]];
                if (ref) {
                    let optionValue = ref.select.state.selectValue[0];
                    if (optionValue) {
                        serviceOilIds.push(optionValue["value"]);
                        oilPrice = oilPrice + optionValue["price"]
                    }else{
                        this.setState({errorMsg: 'Vui lòng chọn nhớt'})
                        return;
                    }

                }
            })
        }
        inforBooking["serviceOilIds"] = serviceOilIds;
        inforBooking["oilPrice"] = oilPrice;
        this.props.appActions.putInforBooking(inforBooking);
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
                                            {this.state.serviceOils && this.state.serviceOils.map((item, index) => {
                                                let valueBrandId = brandOil[item["id"]];
                                                let listOptionsOil = lstOilObject[item["id"]];
                                                let optionBrand = this.findOptionById(optionsBrandOils, valueBrandId)
                                                return (
                                                    <div key={item["id"]} className="item">
                                                        <div className="form-group row">
                                                            <div className="col-md-3 text-left">{item["name"]}</div>
                                                            <div className="col-md-3">
                                                                <Select value={optionBrand} onChange={(valueOption) => { this.onChangeBrandOils(item["id"], valueOption) }} options={optionsBrandOils} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <Select options={listOptionsOil} ref={e => this.oilInputRef[item["id"]] = e} />
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
