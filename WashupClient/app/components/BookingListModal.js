import React, { Component } from 'react'
import PriceUtils from '../utils/PriceUtils'
import { Link } from "react-router-dom";


class BookingListModal extends Component {

    constructor(props) {
        super(props)
    }



    componentWillMount() {
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"
    }

    render() {
        return (
            <div id="ModalBookingNotify" className="modal fade in" role="dialog" aria-hidden="false" style={{ display: 'block' }}>
                <div style={{width: '900px'}} className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body"><div className="main-title">
                            <div className="tab"><h3 className="title">Lịch đã đặt</h3>
                            </div>
                        </div>
                            <div className="clearfix line">&nbsp;</div>
                            <div className="box_input booking-list-modal">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col"></th>
                                            <th scope="col">Biển số</th>
                                            <th scope="col">Địa chỉ</th>
                                            <th scope="col">Thời gian</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="row">1</td>
                                            <td></td>
                                            <td>29D 01245</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr className={"active"}>
                                            <td scope="row">2</td>
                                            <td></td>
                                            <td>29D 01245</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <td scope="row">3</td>
                                            <td></td>
                                            <td>29D 01245</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                            <div className="form-group text-center">
                                {/* <div>Bạn có chắc chắn hủy lịch đã đặt?</div>
                                    <div className="clearfix"><br /></div> */}
                                <button type="button" className="btn btn-success back_home">Tiếp tục</button>
                                <div className="clearfix"><br /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookingListModal
