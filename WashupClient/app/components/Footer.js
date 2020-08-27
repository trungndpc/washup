import React, { Component } from 'react'

class Footer extends Component {

    render() {
        return (
            <div id="site-footer">
                <div className="container">
                    <div className="panel_body">
                        <div className="row">
                            <div className="col-sm-4 site-info">
                                <div className="form-group logo">
                                    <a href="#"><img src={require('../resources/images/logo/logo-washup-small.png')} height={50} /></a>
                                </div>
                                <div className="clearfix form-group contact">
                                    <i className="fa fa-map-marker icon" />
                                    <div className="text">
                                        <h4>Công ty Cổ phần thương mại dịch vụ WASHUP</h4>
                                        <div>L4.01, khu I, tòa nhà Prince Residence,<br />
                                            19-21 Nguyễn Văn Trỗi, P12, Q. Phú Nhuận, TP.HCM
                                    </div>
                                    </div>
                                </div>
                                <div className="clearfix form-group mail">
                                    <i className="fa fa-envelope icon" />
                                    <div className="text">
                                        <a href="mailto:chuoichamsocxe@washup.vn">chuoichamsocxe@washup.vn</a>
                                    </div>
                                </div>
                                <div className="clearfix form-group hotline">
                                    <img src={require('../resources/images/hotline.png')} />
                                </div>
                            </div>
                            <div className="col-sm-4 connect">
                                <div className="form-group">Kết nối với chúng tôi</div>
                                <div className="social form-group">
                                    <a target="_blank" href="https://www.facebook.com/washupvietnamofficial" className="icon_fb"><img src={require('../resources/images/icons/icon_fb.png')} /></a>
                                </div>
                            </div>
                            <div className="col-sm-4 payment">
                                <div className="form-group">Chấp nhận các hình thức thanh toán</div>
                                <div className="cards">
                                    <a href="#" className="icon_visa"><img src={require('../resources/images/visa.png')} /></a>
                                    <a href="#" className="icon_master"><img src={require('../resources/images/mastercard.png')} /></a>
                                    <a href="#" className="icon_napas"><img src={require('../resources/images/napas.png')} /></a>
                                </div>
                                <div className>
                                    <img height={52} src={require('../resources/images/logo/thongbao.png')} />
                                </div>
                            </div>
                            <div className="clearfix" />
                        </div>
                        <div className="copyright">
                            Copyright©2020 Wash-Up, Inc, All Right Reserved
                            <div className="pull-right">
                                <a href="#">Điều khoản</a>
                                <span>.</span>
                                <a href="#">Thỏa thuận sử dụng</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer
