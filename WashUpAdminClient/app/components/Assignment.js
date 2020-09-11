import React, { Component } from 'react'

class Assignment extends Component {

    render() {
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
                                            <input type="text" className="form-control input-sm" placeholder="Nguyễn Văn A" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-example-int form-horizental mg-t-15">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                                        <label className="hrzn-fm">Ghi chú</label>
                                    </div>
                                    <div className="col-lg-8 col-md-7 col-sm-7 col-xs-12">
                                        <div className="nk-int-st">
                                            <input type="text" className="form-control input-sm" placeholder="....." />
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
                                    <button className="btn btn-success notika-btn-success waves-effect">Đồng Ý</button>
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
