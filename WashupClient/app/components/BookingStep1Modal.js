import React, { Component } from 'react'

class BookingStep1Modal extends Component {
    
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.next = this.next.bind(this);
    }
  
    componentWillMount() {
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"
    }

    close() {
        var body = document.getElementsByTagName('body')[0];
        body.className = ""
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    next() {
        if (this.props.onNext) {
            this.props.onNext();
        }
    }

    render() {
        return (
            <div>
            <div id="ModalBooking" className="modal fade in" role="dialog" aria-hidden="false" style={{ display: 'block', paddingRight: '15px' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-body"><form name="frm_booking" method="POST" action="#">
                            <div className="main-title">
                                <div className="tab">
                                    <div className="item col-md-3 col-xs-12 active">
                                        Số điện thoại:<div className="info">0933754386</div>
                                        <div className="arrow-up" />
                                    </div>
                                    <div className="item col-md-3 col-xs-12">Địa chỉ nhận xe:</div>
                                    <div className="item col-md-3 col-xs-12">Khung giờ</div>
                                    <div className="item col-md-3 col-xs-12" />
                                </div>
                            </div>
                            <div className="clearfix line">&nbsp;</div>
                            <div className="box_input">
                                <div className="form-group row">&nbsp;</div>
                                <div className="form-group row">
                                    <div className="col-md-3 col-xs-12">Địa chỉ nhận xe:</div>
                                    <div className="col-md-9 col-xs-12">
                                        <input type="text" name="address" defaultValue="156 Nguyễn Lương Bằng, P.Tân Phú, Quận 7" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-3 col-xs-12">Họ tên khách hàng:</div>
                                    <div className="col-md-9 col-xs-12">
                                        <input type="text" name="fullname" defaultValue="A. Nguyên" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-3 col-xs-12">Loại xe:</div>
                                    <div className="col-md-2 col-xs-12">
                                        <label><input type="radio" name="type" defaultValue="oto" defaultChecked /> Ô tô <i className="fa fa-car" /></label>
                                    </div>
                                    <div className="col-md-2 col-xs-12">
                                        <label><input type="radio" name="type" defaultValue="xemay" /> Xe máy <i className="fa fa-motorcycle" /></label>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-3 col-xs-12">Dòng xe:</div>
                                    <div className="col-md-4 col-xs-12">
                                        <select name="car_type" id="car_type" className="form-control">
                                            <option value>Chọn dòng xe</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-3 col-xs-12">Biển số:</div>
                                    <div className="col-md-4 col-xs-12">
                                        <input type="text" name="car_number" defaultValue placeholder="Nhập biển số (VD: 51F3-92457)" className="form-control" />
                                    </div>
                                </div>
                                <hr />
                                <div className="form-group row text-center">
                                    <button onClick={this.close} type="button" className="btn btn-fefault" data-dismiss="modal"><i className="fa fa-angle-left" /> QUAY LẠI</button>
                                    <button onClick={this.next} type="button" className="btn btn-success"><i className="fa fa-calendar-check" /> CHỌN GIỜ RỬA</button>
                                </div>
                            </div>
                            <div className="clearfix" />
                        </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade in"></div>
            </div>
        )
    }
}

export default BookingStep1Modal
