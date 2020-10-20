import React, { Component } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import {ROLE} from '../constants/Constants'

const animatedComponents = makeAnimated();
class Assignment extends Component {

    constructor(props) {
        super(props)
        this.close = this.close.bind(this)
        this.onClickOKAssignEmployee = this.onClickOKAssignEmployee.bind(this)
    }

    componentDidMount() {
        this.props.appActions.getEmployee(ROLE.EMPLOYEE);
    }

    onClickOKAssignEmployee() {
        if (!this.employeeInputRef.select.state.selectValue[0]) {
            console.log("Vui lòng chọn nhân viên")
        } else {
            let employeeIds = [];
            this.employeeInputRef.select.state.selectValue.forEach(function (item) {
                employeeIds.push(item.value)
            })
            let note = this.noteInputRef && this.noteInputRef.value;
            this.props.appActions.assignEmployee(this.props.orderId, employeeIds, note)
        }
        this.props.close && this.props.close();
    }

    close() {
        this.props.close && this.props.close();
    }

    isChecked(list, id) {
        let rs = false;
        if (list) {
            list.forEach(function (item) {
                if (item.id == id) {
                    rs = true;
                }
            })
        }
        return rs;
    }

    render() {
        const booking = this.props.app.booking && this.props.app.booking;
        const employees = this.props.app.employees;
        const optionsEmp = [];
        let defaultOption = null;
        if (employees) {
            defaultOption = []
            employees.forEach(element => {
                let option = { label: element["fullName"], value: element["id"] };
                optionsEmp.push(option);
                if (this.isChecked(booking["users"], element["id"])) {
                    defaultOption.push(option)
                }
            });
        }

        return (
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="mbas form-example-wrap mg-t-30">
                        {booking["users"] && <div onClick={this.close} className="mbtn-close"><i className="notika-icon notika-close"></i></div>}
                        <div className="cmp-tb-hd cmp-int-hd">
                            <h2>Phân công nhiệm vụ</h2>
                        </div>
                        <div className="form-example-int form-horizental">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                                        <label className="hrzn-fm">Nhân viên</label>
                                    </div>
                                    <div className="col-lg-8 col-md-7 col-sm-7 col-xs-12">
                                        <div className="nk-int-st">
                                            {optionsEmp && optionsEmp.length > 0 && <Select components={animatedComponents} defaultValue={defaultOption} isMulti closeMenuOnSelect={false} ref={e => this.employeeInputRef = e} classNamePrefix="tr" placeholder="Chọn nhân viên" options={optionsEmp} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-example-int form-horizental mg-t-15">
                            <div className="form-group">
                                <div className="row">
                                    <div style={{ marginBottom: '10px' }} className="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                                        <label className="hrzn-fm">Ghi chú</label>
                                    </div>
                                    <div className="col-lg-8 col-md-7 col-sm-7 col-xs-12">
                                        <div className="nk-int-st">
                                            <input style={{ paddingLeft: '10px' }} type="text" ref={e => this.noteInputRef = e} className="form-control input-sm" placeholder="Ghi chú cho nhân viên" />
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
                                    <button onClick={this.onClickOKAssignEmployee} className="btn btn-success notika-btn-success waves-effect">Đồng Ý</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Assignment
