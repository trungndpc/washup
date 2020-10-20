import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ROLE } from '../../constants/Constants'
import * as appActions from '../actions/app'
import ButtonWithConfirrm from '../../components/ButtonWithConfirrm'

class RegisterUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roleId: ROLE.EMPLOYEE,
            errorMsg: null,
        }
        this._onClickBack = this._onClickBack.bind(this)
        this._onClickRegister = this._onClickRegister.bind(this)
        this.getFormInput = this.getFormInput.bind(this)
    }

    _onClickBack() {
        this.props.history.push('/user');
    }

    _onClickRegister() {
        let data = this.getFormInput();
        this.props.appActions.register(data);
    }

    _onChangeRoleSelect(event) {
        let roleId = event.target.value;
        this.setState({ roleId, roleId })
    }

    getFormInput() {
        let name = this.nameRef.value;
        let phone = this.phoneRef.value;
        let username = this.usernameRef.value;
        if (!name) {
            this.setState({ errorMsg: "Vui lòng nhập tên" })
            return;
        }
        if (!phone) {
            this.setState({ errorMsg: "Vui lòng nhập SDT" })
            return;
        }
        if (!username) {
            this.setState({ errorMsg: "Vui lòng nhập tên đăng nhập" })
            return;
        }

        return {
            name: name,
            phone: phone,
            username: username,
            roleId: this.state.roleId
        }

    }


    render() {
        return (
            <div>
                <div className="breadcomb-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="breadcomb-list">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div className="breadcomb-wp">
                                                <div className="breadcomb-icon">
                                                    <i className="notika-icon notika-windows" />
                                                </div>
                                                <div className="breadcomb-ctn">
                                                    <h2>User</h2>
                                                    <p>26/08/2020</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-3">
                                            <div className="breadcomb-report">
                                                <button onClick={this._onClickBack} className="btn waves-effect" data-original-title="Download Report">Quay lại</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="normal-table-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="form-example-wrap mg-t-30">
                                    <div style={{ color: 'red', textAlign: 'center' }}>{this.state.errorMsg}</div>
                                    <div className="form-example-int form-horizental">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                                                    <label className="hrzn-fm">Họ tên</label>
                                                </div>
                                                <div className="col-lg-8 col-md-7 col-sm-7 col-xs-12">
                                                    <div className="nk-int-st">
                                                        <input ref={e => this.nameRef = e} type="text" className="form-control input-sm" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-example-int form-horizental mg-t-15">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                                                    <label className="hrzn-fm">SDT</label>
                                                </div>
                                                <div className="col-lg-8 col-md-7 col-sm-7 col-xs-12">
                                                    <div className="nk-int-st">
                                                        <input type="text" ref={e => this.phoneRef = e} className="form-control input-sm" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-example-int form-horizental mg-t-15">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                                                    <label className="hrzn-fm">Tên đăng nhập</label>
                                                </div>
                                                <div className="col-lg-8 col-md-7 col-sm-7 col-xs-12">
                                                    <div className="nk-int-st">
                                                        <input ref={e => this.usernameRef = e} type="text" className="form-control input-sm" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                                                    <label className="hrzn-fm">Chức danh</label>
                                                </div>
                                                <div className="col-lg-8 col-md-7 col-sm-7 col-xs-12">
                                                    <div className="nk-int-st">
                                                        <select onChange={this._onChangeRoleSelect} value={this.state.roleId} defaultValue={this.state.roleId} ref={e => this.roleRef} className="status-select">
                                                            <option value={ROLE.EMPLOYEE}>Nhân viên</option>
                                                            <option value={ROLE.CRM}>CRM</option>
                                                            <option value={ROLE.OPERATOR}>Vận hành</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-example-int mg-t-15">
                                        <div className="row">
                                            <div className="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                                            </div>
                                            <div className="col-lg-8 col-md-7 col-sm-7 col-xs-12">
                                                <ButtonWithConfirrm ok={this._onClickRegister}>
                                                    <button className="btn btn-success notika-btn-success waves-effect">Đăng ký</button>
                                                </ButtonWithConfirrm>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
)(RegisterUser)
