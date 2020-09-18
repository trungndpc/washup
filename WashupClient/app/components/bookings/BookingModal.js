import React, { Component } from 'react'
import StepONE from './StepONE'
import StepTWO from './StepTWO'
import StepTHREE from './StepTHREE'


class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _renderStep: 1,
            _openStep: 0
        }
        this.open = this.open.bind(this);
        this.openStepOne = this.openStepOne.bind(this)
        this.openStepTwo = this.openStepTwo.bind(this);
        this.openStepThree = this.openStepThree.bind(this)
    }

    open() {
        this.openStepOne()
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"
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


    render() {
        return (
            <div>
                {(this.state._renderStep == 1 || this.state._renderStep == 2) && <StepONE ok={this.openStepTwo} ref={e => this.stepOneRef = e} {...this.props} />}
                {(this.state._renderStep == 1 || this.state._renderStep == 2) && <StepTWO ok={this.openStepThree} prev={this.openStepOne} ref={e => this.stepTwoRef = e} {...this.props} />}
                {(this.state._renderStep == 2 || this.state._renderStep == 3 || this.state._renderStep == 4) && <StepTHREE ok={this.openStepThree} prev={this.openStepOne} ref={e => this.stepThreeRef = e} {...this.props} />}

            </div>
        )
    }
}

export default BookingModal
