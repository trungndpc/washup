import React, { Component } from 'react'
import HeaderBookingModal from '../components/HeaderBookingModal';
import PriceUtils from '../utils/PriceUtils';
import Select from 'react-select'
import { OIL_BRAND } from '../constants/Constants'

const THAY_NHOT = "ff808181741c1c93017420bb81b7000c";
class BookingStep3Modal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabServiceId: 1,
            serviceIds: [],
            methodPaymentId: 1,
            errorMsg: null,
            brandOil: { value: OIL_BRAND["CASTROL"], label: "CASTROL" },
            oil: null
        }
        this.close = this.close.bind(this)
        this.onChangeBrandOils = this.onChangeBrandOils.bind(this);
        this.onChangeOil = this.onChangeOil.bind(this)
    }

    componentWillMount() {
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        let inforBooking = { ...this.props.app.inforBooking }
        this.props.appActions.getServices(inforBooking["transportId"], 1);
    }


    prev() {
        if (this.props.onPrev) {
            this.props.onPrev();
        }
    }

    next() {
        let inforBooking = { ...this.props.app.inforBooking }
        if (this.state.serviceIds.length == 0) {
            this.setState({ errorMsg: 'Vui lòng chọn một dịch vụ' })
            return false;
        }
        if (this.oilInputRef) {
            let oilId = this.oilInputRef.select.state.selectValue[0].value;
            inforBooking["oilIds"] = [oilId];
        }
        inforBooking["serviceIds"] = this.state.serviceIds;
        inforBooking["paymentMethod"] = this.state.methodPaymentId;

        if (this.noteInputRef && this.noteInputRef.value) {
            inforBooking["note"] = this.noteInputRef.value;
        }
        this.props.appActions.putInforBooking(inforBooking);
        this.props.appActions.booking(inforBooking);
        if (this.props.onNext) {
            this.props.onNext();
        }
    }

    selectTabService(tabServiceId) {
        this.setState({
            tabServiceId: tabServiceId,
        })
        let inforBooking = { ...this.props.app.inforBooking }
        this.props.appActions.getServices(inforBooking["transportId"], tabServiceId);
    }

    removeElement(array, elem) {
        var index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    }

    selectServiceId(serviceId) {
        this.setState({
            serviceId: serviceId,
            errorMsg: null
        })
        let serviceIds = [...this.state.serviceIds]
        let isChecked = serviceIds.indexOf(serviceId) >= 0;
        if (isChecked) {
            serviceIds = this.removeElement(serviceIds, serviceId)
        } else {
            serviceIds.push(serviceId);
        }
        this.setState({
            serviceIds: serviceIds
        })
        if (serviceId == THAY_NHOT) {
            let inforBooking = { ...this.props.app.inforBooking }
            this.props.appActions.getOil(inforBooking["brandSeriesId"]);
        }
    }

    selectMethodPayment(methodId) {
        this.setState({
            methodPaymentId: methodId
        })
    }

    close() {
        var body = document.getElementsByTagName('body')[0];
        body.className = ""
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    onChangeBrandOils(value) {
        this.setState({ brandOil: value, oil: null })
    }


    onChangeOil(value) {
        this.setState({ oil: value })
    }

    render() {
        let inforBooking = { ...this.props.app.inforBooking }
        let serviceByTrans = this.props.app.services[inforBooking["transportId"]]
        const services = (serviceByTrans && serviceByTrans[this.state.tabServiceId]) ? serviceByTrans[this.state.tabServiceId] : []
        const isThayNhot = this.state.serviceIds.includes(THAY_NHOT);
        const oils = (isThayNhot && this.props.app.oils) ? this.props.app.oils : []
        const optionOils = [];
        var defaultOil = null
        if (oils) {
            oils.forEach(item => {
                if (item["manufacturer"] == this.state.brandOil.value) {
                    optionOils.push({ value: item["id"], label: item["name"] })
                }
            });
            defaultOil = this.state.oil ? this.state.oil : optionOils[0];
        }

        const optionsBrandOils = [];
        for (const key in OIL_BRAND) {
            optionsBrandOils.push({ value: OIL_BRAND[key], label: key })
        }
        return (
            <div>
                <div id="ModalBooking" className="modal fade in" role="dialog" aria-hidden="false" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-body"><form name="frm_booking" method="POST" action="#">
                                <HeaderBookingModal {...this.props} onClose={this.close} step={3} />
                                <div className="clearfix line">&nbsp;</div>
                                <div className="box_input">
                                    <h3 className="title">CHỌN DỊCH VỤ &amp; THANH TOÁN</h3>
                                </div>
                                <div className="clearfix" />
                                <div id="box_calendar" className="box_input">
                                    <div className="calendar-container">
                                        <div className="calendar-wrapper">
                                            <div className="item">
                                                <div className="tab_calendar">
                                                    <a onClick={() => this.selectTabService(1)} href="javascript:void(0)" className={this.state.tabServiceId == 1 ? 'active' : ''}>
                                                        <div className="title">Vệ sinh cơ bản</div>
                                                    </a>
                                                    <a onClick={() => this.selectTabService(3)} href="javascript:void(0)" className={this.state.tabServiceId == 3 ? 'active' : ''}>
                                                        <div className="title">Làm đẹp</div>
                                                    </a>
                                                    <a onClick={() => this.selectTabService(2)} href="javascript:void(0)" className={this.state.tabServiceId == 2 ? 'active' : ''}>
                                                        <div className="title">Bảo dưỡng nhanh</div>
                                                    </a>
                                                </div>
                                                <div className="calendar_content">
                                                    <div className="service_content scrollbar" id="scroll-3">
                                                        {(services) ?
                                                            <div className="force-overflow">
                                                                {services.map((item) => {
                                                                    
                                                                    let isChecked = this.state.serviceIds.indexOf(item["id"]) >= 0
                                                                    return (
                                                                        <div key={item["id"]} onClick={function(e) {
                                                                            e.preventDefault(); 
                                                                            e.stopPropagation(); 
                                                                            this.selectServiceId(item["id"])
                                                                        }.bind(this)} className="service">
                                                                            <label className="container col-md-1 pull-left">
                                                                                <input type="checkbox" checked={isChecked} />
                                                                                <span className="checkmark" />
                                                                            </label>
                                                                            <div className={isChecked ? 'box_select box_right pull-left col-md-11' : 'box_right pull-left col-md-11'}>
                                                                                <img src={require('../resources/images/service_img1.png')} className="pull-left" />
                                                                                <div className="info pull-left">
                                                                                    <div className="name">{item["name"]}</div>
                                                                                </div>
                                                                                <div className="price pull-right">{PriceUtils.toThousand(item["price"])}</div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                                <div className="clearfix" />
                                                            </div>
                                                            :
                                                            <div style={{ textAlign: 'center', paddingTop: '30pxs' }}>
                                                                Dịch vụ chưa được hỗ trợ
                                                        </div>
                                                        }
                                                    </div>
                                                    <hr />
                                                    {isThayNhot &&
                                                        <div className="form-group row">
                                                            <div className="col-md-3 text-left">Chọn loại nhớt:</div>
                                                            <div className="col-md-4">
                                                                <Select value={this.state.brandOil} onChange={this.onChangeBrandOils} options={optionsBrandOils} />
                                                            </div>
                                                            <div className="col-md-5">
                                                                <Select value={defaultOil} onChange={this.onChangeOil} options={optionOils} ref={e => this.oilInputRef = e} />
                                                            </div>
                                                        </div>
                                                    }
                                                    <div className="payment form-group row">
                                                        {(this.state.methodPaymentId == 2 || this.state.methodPaymentId == 3) && <div style={{ textAlign: 'center', color: 'red' }}>Phương thức chưa được support</div>}
                                                        <div className="col-md-3 text-left">Chọn hình thức thanh toán:</div>
                                                        <div className="col-md-9">
                                                            <a href="javascript:void(0)" onClick={e => this.selectMethodPayment(1)} className={this.state.methodPaymentId == 1 ? 'active' : ''}><i className="fa fa-money" />Tiền mặt</a>
                                                            <a href="javascript:void(0)" onClick={e => this.selectMethodPayment(2)} className={this.state.methodPaymentId == 2 ? 'active' : ''}><i className="fa fa-credit-card" /> Thẻ ngân hàng</a>
                                                            <a href="javascript:void(0)" onClick={e => this.selectMethodPayment(3)} className={this.state.methodPaymentId == 3 ? 'active' : ''}><i className="fa fa-credit-card" /> Ví điện tử</a>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="form-group row">
                                                        <div className="col-md-3 text-left">Ghi chú:</div>
                                                        <div className="col-md-9">
                                                            <input ref={e => this.noteInputRef = e} type="text" name="notes" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    {this.state.errorMsg && <div style={{ textAlign: 'center', color: 'red', paddingBottom: '30px' }}>{this.state.errorMsg}</div>}
                                    <div className="form-group row text-center">
                                        <button onClick={this.prev} type="button" className="btn btn-fefault step_back m-btn-prev"><i className="fa fa-angle-left" /> QUAY LẠI</button>
                                        <button onClick={this.next} type="button" className="btn btn-success2"><i className="fa fa-check-circle" /> HOÀN TẤT - ĐẶT LỊCH</button>
                                    </div>
                                </div>
                                <div className="clearfix" />
                            </form></div>
                        </div>
                    </div>
                </div>
                <div class="modal-backdrop fade in"></div>
            </div>
        )
    }
}

export default BookingStep3Modal
