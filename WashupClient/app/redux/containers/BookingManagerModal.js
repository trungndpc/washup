import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'

import PhoneSearchModal from '../../components/PhoneSearchModal'

class BookingManagerModal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.app.isOpenSearchPhone != nextProps.app.isOpenSearchPhone) {
            if ( nextProps.app.isOpenSearchPhone) {
                var body = document.getElementsByTagName('body')[0];
                body.className = "modal-open"
                body.style.overflow = "hidden"
            } else {
                var body = document.getElementsByTagName('body')[0];
                body.className = ""
                body.style.overflow = "auto"
            }
        }

        return nextProps.app.isOpenSearchPhone != this.props.app.isOpenSearchPhone || this.state != nextState || 
        nextProps.app.findOrderByPhonerErrorMSG != this.props.app.findOrderByPhonerErrorMSG;
    }


    render() {
        const isOpenSearchPhone = this.props.app.isOpenSearchPhone;
        return (
            <div>
                {isOpenSearchPhone && <PhoneSearchModal {...this.props} />}
                {isOpenSearchPhone && <div className="modal-backdrop fade in"></div>}
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
)(BookingManagerModal)
