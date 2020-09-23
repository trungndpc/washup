import React, { Component } from 'react'
import Select from 'react-select'

class Assignment extends Component {

    constructor(props) {
        super(props)
        this.onClickOKAssignEmployee = this.onClickOKAssignEmployee.bind(this)
    }

    componentDidMount() {
        this.props.appActions.getEmployee();
    }

    onClickOKAssignEmployee() {
        if (!this.employeeInputRef.select.state.selectValue[0]) {
            console.log("Vui lòng chọn nhân viên")
        } else {
            let employeeId = this.employeeInputRef.select.state.selectValue[0].value;
            let note = this.noteInputRef && this.noteInputRef.value;
            this.props.appActions.assignEmployee(this.props.orderId, employeeId, note)
        }
    }

    render() {
        const employees = this.props.app.employees;
        const optionsEmp = [];
        if (employees) {
            employees.forEach(element => {
                optionsEmp.push({ label: element["fullName"], value: element["id"] })
            });
        }

        return (
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-example-wrap mg-t-30">
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
                                            <Select ref={e => this.employeeInputRef = e} classNamePrefix="tr" placeholder="Chọn nhân viên" options={optionsEmp} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-example-int form-horizental mg-t-15">
                            <div className="form-group">
                                <div className="row">
                                    <div style={{marginBottom: '10px'}} className="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                                        <label className="hrzn-fm">Ghi chú</label>
                                    </div>
                                    <div className="col-lg-8 col-md-7 col-sm-7 col-xs-12">
                                        <div className="nk-int-st">
                                            <input  style={{paddingLeft: '10px'}} type="text" ref={e => this.noteInputRef = e} className="form-control input-sm" placeholder="Ghi chú cho nhân viên" />
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
