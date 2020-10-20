import React, { Component } from 'react'
import StepONE from './StepONE'
import StepTWO from './StepTWO'
import StepTHREE from './StepTHREE'
import StepFOUR from './StepFOUR'
import StepOIL from './StepOIL';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _renderStep: 1,
            _openStep: 0,
            _isOpen: false,
        }
        this.open = this.open.bind(this);
        this.openStepOne = this.openStepOne.bind(this)
        this.openStepTwo = this.openStepTwo.bind(this)
        this.openStepThree = this.openStepThree.bind(this)
        this.openStepFour = this.openStepFour.bind(this)
        this.openStepOil = this.openStepOil.bind(this)
        this.close = this.close.bind(this)
        this.openWithStep = this.openWithStep.bind(this);
        window.openBookingModal = this.openWithStep;
        window.closeFormModal = this.close;
    }

    openWithStep(step) {
        this.setState({ _isOpen: true })
        switch (step) {
            case 1: this.openStepOne(); break;
            case 2: this.openStepTwo(); break;
            case 3: this.openStepThree(); break;
            case 4: this.openStepFour(); break;
        }
        console.log("openWithStep")
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"
        body.style.overflow = "hidden"
    }

    open() {
        this.setState({ _isOpen: true })
        this.openStepOne()
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"
        body.style.overflow = "hidden "
    }

    openStepOne() {
        this.setState({
            _renderStep: 1
        })
        this.stepOneRef && this.stepOneRef.open();
    }

    openStepTwo() {
        this.setState({
            _renderStep: 2
        })
    }

    openStepThree() {
        this.setState({
            _renderStep: 3
        })
    }

    openStepOil() {
        this.setState({
            _renderStep: 4
        })
    }

    openStepFour() {
        this.setState({
            _renderStep: 5
        })
    }



    close() {
        this.setState({
            _renderStep: 1,
            _isOpen: false
        })
        let mode = this.props.app.modeBookingModel;
        if (mode == 2) {
            this.props.appActions.putInforBooking(null);
        }
        this.props.appActions.changeModeBookingModal(0);
        var body = document.getElementsByTagName('body')[0];
        body.className = ""
        body.style.overflow = "auto"
    }


    render() {
        return (
            <div>
                {<StepONE ok={this.openStepTwo} ref={e => this.stepOneRef = e} close={this.close} {...this.props} />}
                {this.state._renderStep == 2 && <StepTWO ok={this.openStepThree} prev={this.openStepOne} ref={e => this.stepTwoRef = e} close={this.close} {...this.props} />}
                {this.state._renderStep == 3 && <StepTHREE nextOil={this.openStepOil} ok={this.openStepFour} prev={this.openStepTwo} ref={e => this.stepThreeRef = e} close={this.close} {...this.props} />}
                {this.state._renderStep == 4 && <StepOIL ok={this.openStepFour} prev={this.openStepThree} {...this.props} />}
                {this.state._renderStep == 5 && <StepFOUR prev={this.openStepThree} close={this.close} {...this.props} />}
                {this.state._isOpen && <div className="modal-backdrop fade in"></div>}
            </div>
        )
    }
}

export default BookingModal
