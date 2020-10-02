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
            _isOpen : false,
        }
        this.open = this.open.bind(this);
        this.openStepOne = this.openStepOne.bind(this)
        this.openStepTwo = this.openStepTwo.bind(this)
        this.openStepThree = this.openStepThree.bind(this)
        this.openStepFour = this.openStepFour.bind(this)
        this.openStepOil = this.openStepOil.bind(this)
        this.close = this.close.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate")
        if (nextProps.isOpenFormBooking) {
            this.open();
        }else {
            this.close()
        }
        return this.state != nextState
    }

    open() {
        this.setState({_isOpen: true})
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
        this.stepTwoRef && this.stepTwoRef.open();
    }

    openStepThree() {
        this.setState({
            _renderStep: 3
        })
        this.stepThreeRef && this.stepThreeRef.open();
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
        console.log("close")
        this.setState({
            _renderStep: 1,
            _isOpen: false
        })
        var body = document.getElementsByTagName('body')[0];
        body.className = ""
        body.style.overflow = "auto"
    }


    render() {
        console.log("render Booking Modal")
        return (
            <div>
                {(this.state._renderStep == 1 || this.state._renderStep == 2) && <StepONE ok={this.openStepTwo} ref={e => this.stepOneRef = e} close={this.close} {...this.props} />}
                {(this.state._renderStep == 1 || this.state._renderStep == 2 || this.state._renderStep == 3) && <StepTWO ok={this.openStepThree} prev={this.openStepOne} ref={e => this.stepTwoRef = e} close={this.close} {...this.props} />}
                {(this.state._renderStep == 2 || this.state._renderStep == 3 || this.state._renderStep == 4 || this.state._renderStep == 5) && <StepTHREE nextOil={this.openStepOil} ok={this.openStepFour} prev={this.openStepTwo} ref={e => this.stepThreeRef = e} close={this.close} {...this.props} />}
                {this.state._renderStep == 4 && <StepOIL ok={this.openStepFour}  prev={this.openStepThree} {...this.props} />}
                {this.state._renderStep == 5 && <StepFOUR prev={this.openStepThree}  close={this.close} {...this.props} />}
                {this.state._isOpen && <div className="modal-backdrop fade in"></div>}
            </div>
        )
    }
}

export default BookingModal
