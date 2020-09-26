import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'

class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div className="login-content">
                    {/* Login */}
                    <div className="nk-block toggled" id="l-login">
                        <div className="nk-form">
                            <div className="input-group">
                                <span className="input-group-addon nk-ic-st-pro"><i className="notika-icon notika-support" /></span>
                                <div className="nk-int-st">
                                    <input type="text" className="form-control" placeholder="Username" />
                                </div>
                            </div>
                            <div className="input-group mg-t-15">
                                <span className="input-group-addon nk-ic-st-pro"><i className="notika-icon notika-edit" /></span>
                                <div className="nk-int-st">
                                    <input type="password" className="form-control" placeholder="Password" />
                                </div>
                            </div>
                            <div className="fm-checkbox">
                                <label className><div className="icheckbox_square-green" style={{ position: 'relative' }}><input type="checkbox" className="i-checks" style={{ position: 'absolute', opacity: 0 }} /><ins className="iCheck-helper" style={{ position: 'absolute', top: '0%', left: '0%', display: 'block', width: '100%', height: '100%', margin: '0px', padding: '0px', background: 'rgb(255, 255, 255)', border: '0px', opacity: 0 }} /></div> <i /> Keep me signed in</label>
                            </div>
                        </div>
                    </div>
                </div>
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
)(Login)
