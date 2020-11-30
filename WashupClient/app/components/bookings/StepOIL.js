import React, { Component } from 'react'
import HeaderBookingModal from '../HeaderBookingModal';
import ServiceModel from '../../models/ServiceModel';
import OILSelection from '../OILSelection';

class StepOIL extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            errorMsg: null,
        }
        this.ref = {}
        this.modalRef = React.createRef()
        this.next = this.next.bind(this)
        this.prev = this.prev.bind(this)
        this._handleClickOutside = this._handleClickOutside.bind(this);
        this.submit = this.submit.bind(this)

    }

    _handleClickOutside(event) {
        if (this.modalRef && !this.modalRef.current.contains(event.target)) {
            this.close();
        }
    }

    componentDidMount() {
        this.props.appActions.getOil();
        document.addEventListener('mousedown', this.__handleClickOutside);
    }



    prev() {
        document.removeEventListener('mousedown', this._handleClickOutside);
        this.setState({
            isOpen: false
        })
        this.props.prev()
    }


    next() {
        this.submit();
        document.removeEventListener('mousedown', this._handleClickOutside);
        this.props.ok();
    }

    submit() {
        let rs = {};
        for (const serviceId in this.ref) {
            let oilId = this.ref[serviceId].getValue();
            rs[serviceId] = oilId;
        }
        let booking = {...this.props.app.inforBooking};
        let services = [...booking.services]
        booking.services = ServiceModel.submitOil(services, rs);
        this.props.appActions.putInforBooking(booking)
    }



    render() {
        const services = ServiceModel.getOilService(this.props.app.inforBooking.services)
        const oils = this.props.app.oils ? this.props.app.oils : []

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
                                            {services && services.map((service) => {
                                                let lstOil = oils.filter(oil => oil.serviceIds.includes(service.id))
                                                return (
                                                    <OILSelection ref={e => this.ref[service.id] = e} key={service.id} oils={lstOil}>{service.name}</OILSelection>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <hr />
                                    {this.state.errorMsg && <div style={{ textAlign: 'center', color: 'red', padding: '5px' }}>{this.state.errorMsg}</div>}
                                    <div className="form-group row text-center">
                                        <button onClick={this.prev} type="button" className="btn btn-fefault btn-prev-step3">QUAY LẠI</button>
                                        <button onClick={this.next} type="button" className="btn btn-success btn-next-step3">ĐỒNG Ý</button>
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
