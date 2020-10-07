import React, { Component } from 'react'
import PriceUtils from '../utils/PriceUtils'
import { Link } from "react-router-dom";


class PhoneSearchModal extends Component {

    constructor(props) {
        super(props)
    }



    componentWillMount() {
        var body = document.getElementsByTagName('body')[0];
        body.className = "modal-open"
    }

    render() {
        return (
            <div className="modal fade in" role="dialog" aria-hidden="false" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div>
                            <h3 style={{fontSize: 'x-large', textTransform: 'uppercase', fontWeight: '600', textAlign: 'center', color: '#1B3A6A'}}>Thông tin lịch đã đặt</h3>
                        </div>
                        <div className="modal-body">
                            <div className="box_input booking-list-modal">
                                <div class="form-row align-items-center">
                                        <div className="input-group">
                                            <div style={{
                                                padding: '0 15px',
                                                fontSize: 'larger',
                                                backgroundColor: '#ced4da'
                                            }} className="input-group-prepend">
                                                <div style={{fontSize: 'larger' }} className="input-group-text">@</div>
                                            </div>
                                            <input type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="09x.xxx.xxx">
                                            </input>
                                        </div>
                                    <div className="form-group text-center">
                                        <button style={{width: '100%', backgroundColor: '#FFDB71', height: '38px', border: 'none', color: 'black'}} type="button" className="btn btn-success back_home">Tiếp tục</button>
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

export default PhoneSearchModal
