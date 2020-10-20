import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ROLE } from '../../constants/Constants'
import { findRoleEnum } from '../../constants/Role'
import * as appActions from '../actions/app'
import ButtonWithConfirrm from '../../components/ButtonWithConfirrm';
import { use } from 'chai'

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roleId: ROLE.EMPLOYEE
        }
        this._onChangeRole = this._onChangeRole.bind(this)
        this._onClickRegister = this._onClickRegister.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        this.props.appActions.getEmployee(this.state.roleId)
    }

    resetPassword(userId) {
        this.props.appActions.resetPassword(userId);
    }

    deleteUser(userId) {
        this.props.appActions.deleteUser(userId)
    }

    _onChangeRole(event) {
        let roleId = event.target.value;
        this.setState({ roleId, roleId })
        this.props.appActions.getEmployee(roleId)
    }

    _onClickRegister() {
        this.props.history.push('/user/register');
    }

    render() {
        const user = this.props.app.employees;
        const labelRole = findRoleEnum(this.state.roleId);
        console.log(labelRole)
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
                                                <button onClick={this._onClickRegister} className="btn waves-effect" data-original-title="Download Report"><i className="notika-icon notika-sent" />Đăng ký</button>
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
                            <div className="col-lg-12" style={{ textAlign: 'right' }}>
                                <select onChange={this._onChangeRole} className="status-select">
                                    <option value={ROLE.EMPLOYEE}>Nhân viên</option>
                                    <option value={ROLE.CRM}>CRM</option>
                                    <option value={ROLE.OPERATOR}>Vận hành</option>
                                    <option value={ROLE.ADMIN}>Admin</option>
                                </select>
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="normal-table-list mg-t-30">
                                    <div className="bsc-tbl-st">
                                        <table className="table table-striped table-overview">
                                            <thead>
                                                <tr>
                                                    <th className="m_code">#</th>
                                                    <th className="m_phone">SDT</th>
                                                    <th className="m_name">Tên</th>
                                                    <th className="m_bienso">Email</th>
                                                    <th className="m_schedule">Chức vụ</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {user && user.map((item, index) => {
                                                    return (
                                                        <tr key={item["id"]}>
                                                            <td>{index}</td>
                                                            <td>{item["phone"]}</td>
                                                            <td>{item["fullName"]}</td>
                                                            <td>{item["email"]}</td>
                                                            <td>{labelRole}</td>
                                                            <td>
                                                                <ButtonWithConfirrm ok={() => {this.resetPassword(item["id"])}}>
                                                                    <button className="btn btn-primary primary-icon-notika waves-effect">Reset</button>
                                                                </ButtonWithConfirrm>
                                                            </td>
                                                            <td>
                                                                <ButtonWithConfirrm ok={() => {this.deleteUser(item["id"])}}>
                                                                    <button className="btn btn-danger notika-btn-danger waves-effect">Xóa </button>
                                                                </ButtonWithConfirrm>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* {pageOrder && <div style={{ textAlign: 'center', padding: '30px' }}> <Pagination defaultCurrent={pageOrder.page} pageSize={10} onChange={this.changePageNumber} total={pageOrder["totalPage"] * 10} /> </div>} */}
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
)(User)
