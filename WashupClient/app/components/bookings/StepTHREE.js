import React, { Component } from 'react'
import HeaderBookingModal from '../../components/HeaderBookingModal';
import PriceUtils from '../../utils/PriceUtils';
import { TYPE_SERVICE, SERVICE_THAY_NHOT } from '../../constants/Constants'

class StepTHREE extends Component {

    constructor(props) {
        super(props);
        let inforBooking = { ...this.props.app.inforBooking }
        this.state = {
            isOpen: false,
            tabServiceId: TYPE_SERVICE.CO_BAN,
            serviceIds: (inforBooking && inforBooking["serviceIds"]) ? inforBooking["serviceIds"] : [],
            serviceNames: [],
            serviceOils: (inforBooking && inforBooking["serviceOils"]) ? inforBooking["serviceOils"] : [],
            methodPaymentId: 1,
            errorMsg: null,
            totalPrice: 0
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.modalRef = React.createRef();
        this._handleClickOutside = this._handleClickOutside.bind(this);
    }

    componentWillMount() {
        let inforBooking = { ...this.props.app.inforBooking }
        this.props.appActions.getServices(inforBooking["transportId"], TYPE_SERVICE.CO_BAN, inforBooking["brandSeries"]["id"]);
    }

    open() {
        let inforBooking = { ...this.props.app.inforBooking }
        this.setState({ 
            isOpen: true,
            serviceOils: (inforBooking && inforBooking["serviceOils"]) ? inforBooking["serviceOils"] : [],
         });

        document.addEventListener('mousedown', this._handleClickOutside);
    }

    _handleClickOutside(event) {
        if (this.modalRef && !this.modalRef.current.contains(event.target)) {
            this.close();
        }
    }

    prev() {
        document.removeEventListener('mousedown', this._handleClickOutside);
        this.setState({
            isOpen: false
        })
        this.props.prev()
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
        inforBooking["serviceNames"] = this.state.serviceNames;
        inforBooking["serviceOils"] = this.state.serviceOils;
        if (this.state.methodPaymentId != 1) {
            return false;
        }
        inforBooking["paymentMethod"] = this.state.methodPaymentId;

        if (this.noteInputRef && this.noteInputRef.value) {
            inforBooking["note"] = this.noteInputRef.value;
        }
        inforBooking["totalPrice"] = this.state.totalPrice;
        this.props.appActions.putInforBooking(inforBooking);
        document.removeEventListener('mousedown', this._handleClickOutside);
        this.setState({
            isOpen: false
        })
        if (this.state.serviceOils && this.state.serviceOils.length > 0) {
            this.props.nextOil();
        } else {
            this.props.ok();
        }
    }

    selectTabService(tabServiceId) {
        this.setState({
            tabServiceId: tabServiceId,
        })
        let inforBooking = { ...this.props.app.inforBooking }
        this.props.appActions.getServices(inforBooking["transportId"], tabServiceId, inforBooking["brandSeries"]["id"]);
    }

    removeElement(array, elem) {
        var index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    }

    removeOil(oilServices, serviceId) {
        return oilServices.filter(oil => oil["id"] !== serviceId)
    }


    selectServiceId(item) {
        let serviceId = item["id"];
        let price = item["price"];
        let name = item["name"]
        this.setState({
            serviceId: serviceId,
            errorMsg: null
        })
        let serviceIds = [...this.state.serviceIds]
        let serviceNames = [...this.state.serviceNames]
        let serviceOils = [...this.state.serviceOils]
        let currentPrice = this.state.totalPrice
        let isChecked = serviceIds.indexOf(serviceId) >= 0;
        if (isChecked) {
            serviceIds = this.removeElement(serviceIds, serviceId)
            currentPrice = currentPrice - price;
            serviceNames = this.removeElement(serviceNames, name)
            if (SERVICE_THAY_NHOT.indexOf(serviceId) >= 0) {
                serviceOils = this.removeOil(serviceOils, serviceId)
            }
        } else {
            serviceIds.push(serviceId);
            currentPrice = currentPrice + price;
            serviceNames.push(name)
            if (SERVICE_THAY_NHOT.indexOf(serviceId) >= 0) {
                serviceOils.push({ id: serviceId, name: name })
            }
        }
        console.log(serviceOils)
        this.setState({
            serviceIds: serviceIds,
            totalPrice: currentPrice,
            serviceNames: serviceNames,
            serviceOils: serviceOils
        })
    }

    selectMethodPayment(methodId) {
        this.setState({
            methodPaymentId: methodId
        })
    }

    close() {
        console.log("step close")
        // this.setState({ isFadeIn: false })
        // setTimeout(function () {
        this.setState({ isOpen: false })
        // }.bind(this), 150)
        document.removeEventListener('mousedown', this._handleClickOutside);
        this.props.close && this.props.close()
    }

    render() {
        const services = this.props.app.serviceForm;
        return (
            <div>
                <div id="ModalBooking" style={{ display: `${this.state.isOpen == true ? 'block' : 'none'}` }} className="modal fade in">
                    <div className="modal-dialog modal-lg">
                        <div ref={this.modalRef} className="modal-content">
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
                                                    <a onClick={() => this.selectTabService(TYPE_SERVICE.CO_BAN)} href="javascript:void(0)" className={this.state.tabServiceId == TYPE_SERVICE.CO_BAN ? 'active' : ''}>
                                                        <div className="title">Cơ bản</div>
                                                    </a>
                                                    <a onClick={() => this.selectTabService(TYPE_SERVICE.NANG_CAO)} href="javascript:void(0)" className={this.state.tabServiceId == TYPE_SERVICE.NANG_CAO ? 'active' : ''}>
                                                        <div className="title">Nâng cao</div>
                                                    </a>
                                                    <a onClick={() => this.selectTabService(TYPE_SERVICE.COMBO_TAINHA)} href="javascript:void(0)" className={this.state.tabServiceId == TYPE_SERVICE.COMBO_TAINHA ? 'active' : ''}>
                                                        <div className="title">Combo</div>
                                                    </a>
                                                </div>
                                                <div className="calendar_content">
                                                    <div className="service_content scrollbar" id="scroll-3">
                                                        {(services) ?
                                                            <div className="force-overflow-2">
                                                                {services.map((item) => {

                                                                    let isChecked = this.state.serviceIds.indexOf(item["id"]) >= 0
                                                                    return (
                                                                        <div key={item["id"]} onClick={function (e) {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            this.selectServiceId(item)
                                                                        }.bind(this)} className="service">
                                                                            <label className="container col-md-1 pull-left">
                                                                                <input type="checkbox" checked={isChecked} />
                                                                                <span className="checkmark" />
                                                                            </label>
                                                                            <div className={isChecked ? 'box_select box_right pull-left col-md-11' : 'box_right pull-left col-md-11'}>
                                                                                <img style={{ width: '178px', height: '96px' }} src={item["imgUrl"]} className="pull-left" />
                                                                                <div className="info pull-left">
                                                                                    <div className="name">{item["name"]}</div>
                                                                                </div>
                                                                                {SERVICE_THAY_NHOT.indexOf(item["id"]) >= 0 ? <div className="pull-right chonnhot">Chọn nhớt</div> :
                                                                                    <div className="price pull-right">{item["price"] == 0 ? "Liên hệ" : PriceUtils.toThousand(item["price"])}</div>}
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
                                                    <div className="payment form-group row">
                                                        {(this.state.methodPaymentId == 2 || this.state.methodPaymentId == 3) && <div style={{ textAlign: 'center', color: 'red' }}>Tính năng đang nâng cấp</div>}
                                                        <div className="col-md-3 text-left">Chọn hình thức thanh toán:</div>
                                                        <div className="col-md-9">
                                                            <a href="javascript:void(0)" onClick={e => this.selectMethodPayment(1)} className={this.state.methodPaymentId == 1 ? 'active' : ''}><i className="fa fa-money" />Tiền mặt</a>
                                                            <a href="javascript:void(0)" onClick={e => this.selectMethodPayment(2)} className={this.state.methodPaymentId == 2 ? 'active' : ''}><i className="fa fa-credit-card" /> Thẻ ngân hàng</a>
                                                            <a href="javascript:void(0)" onClick={e => this.selectMethodPayment(3)} className={this.state.methodPaymentId == 3 ? 'active' : ''}><i className="fa fa-credit-card" /> Ví điện tử</a>
                                                        </div>
                                                    </div>
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
                                    {this.state.errorMsg && <div style={{ textAlign: 'center', color: 'red', padding: '5px' }}>{this.state.errorMsg}</div>}
                                    <div className="form-group row text-center">
                                        <button onClick={this.prev} type="button" className="btn btn-fefault step_back m-btn-prev"><i className="fa fa-angle-left" /> QUAY LẠI</button>
                                        {this.state.serviceOils && this.state.serviceOils.length > 0 ?
                                            <button onClick={this.next} type="button" className="btn btn-success2">CHỌN NHỚT</button>
                                            :
                                            <button onClick={this.next} type="button" className="btn btn-success2"><i style={{ marginRight: '10px' }} className="fa fa-check-circle" />XÁC NHẬN</button>
                                        }
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

export default StepTHREE
