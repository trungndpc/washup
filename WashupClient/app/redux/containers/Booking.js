import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'
import HeaderBookingModal from '../../components/HeaderBookingModal';
import StepONE from '../../components/bookings/StepONE'
import StepTWO from '../../components/bookings/StepTWO'
import StepTHREE from '../../components/bookings/StepTHREE'



class Booking extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate")
        if (nextProps.isOpenFormBooking) {
            var body = document.getElementsByTagName('body')[0];
            body.className = "modal-open"
            body.style.overflow = "hidden "
        } else {
            var body = document.getElementsByTagName('body')[0];
            body.className = ""
            body.style.overflow = "auto"
        }
        return true;
    }



    render() {
        console.log("render Booking Modal")
        const inforBooking = this.props.app.inforBooking;
        const isOpen = this.props.app.isOpenFormBooking;
        const step = this.props.app.step;
        return (
            <div>
                <div id="ModalBooking" style={{ display: `${isOpen ? 'block' : 'none '}` }} className="modal fade in" >
                    <div className="modal-dialog modal-lg">
                        <div ref={this.modalRef} className="modal-content">
                            <div className="modal-body">
                                <form name="frm_booking" method="POST" action="#">
                                    <HeaderBookingModal {...this.props} step={1} />
                                    <div className="clearfix line">&nbsp;</div>
                                    {step == 1 && <StepONE {...this.props} />}
                                    {step == 2 && <StepTWO {...this.props} />}
                                    {step == 3 && <StepTHREE {...this.props} />}
                                    <div className="clearfix" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {isOpen && <div className="modal-backdrop fade in"></div>}
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
