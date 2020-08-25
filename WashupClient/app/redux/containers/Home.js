import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'
import BookingStep1Modal from '../../components/BookingStep1Modal';
import BookingStep2Modal from '../../components/BookingStep2Modal';
import BookingStep3Modal from '../../components/BookingStep3Modal';
import BookingStep4Modal from '../../components/BookingStep4Modal';
import AlertUtils from '../../utils/AlertUtils';
import { Model } from '../../constants/Constants';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isStep1: false,
      isStep2: false,
      isStep3: false,
      isStep4: false,
    }
    this.booking = this.booking.bind(this);
    this.onCloseStep1Modal = this.onCloseStep1Modal.bind(this);
    this.bookingOTOService = this.bookingOTOService.bind(this);
    this.bookingXemayService = this.bookingXemayService.bind(this);
    this.nextStep2 = this.nextStep2.bind(this);
    this.nextStep3 = this.nextStep3.bind(this);
    this.nextStep4 = this.nextStep4.bind(this);

    this.prevStep1 = this.prevStep1.bind(this);
    this.prevStep2 = this.prevStep2.bind(this);
    this.onCloseBooking = this.onCloseBooking.bind(this);

  }

  componentDidMount() {
  }


  componentDidMount() {
    window.initOwlCarousel();
    window.initSwiper();
  }


  booking() {
    if (this.phoneInputRef && this.phoneInputRef.value) {
      this.props.appActions.putInforBooking({ "phone": this.phoneInputRef.value })
      this.setState({ isStep1: true })
    } else {
      AlertUtils.showWarning("Vui lòng nhập số điện thoại")
    }
  }

  bookingOTOService() {
    this.props.appActions.putInforBooking({"transportId": Model.OTO})
    this.setState({ isStep1: true })
  }

  bookingXemayService() {
    this.props.appActions.putInforBooking({"transportId": Model.XEMAY})
    this.setState({ isStep1: true })
  }

  nextStep2() {
    this.setState({ isStep1: false, isStep2: true, isStep3: false, isStep4: false });
  }

  nextStep3() {
    this.setState({ isStep1: false, isStep2: false, isStep3: true, isStep4: false });
  }

  nextStep4() {
    this.setState({ isStep1: false, isStep2: false, isStep3: false, isStep4: true });
  }



  prevStep1() {
    this.setState({ isStep1: true, isStep2: false, isStep3: false, isStep4: false });
  }

  prevStep2() {
    this.setState({ isStep1: false, isStep2: true, isStep3: false, isStep4: false });
  }

  onCloseStep1Modal() {
    this.setState({ isStep1: false, isStep2: false, isStep3: false, isStep4: false });
  }

  onCloseBooking() {
    this.setState({ isStep1: false, isStep2: false, isStep3: false, isStep4: false });
  }

  render() {
    return (
      <div>
        <div id="advertisement" className="hidden-xs">
          <img src={require('../../resources/images/advertisement.png')} className="img-responsive" />
        </div>
        <div className="clearfix" />
        <nav id="topmenu" className="navbar">
          <div className="container"><div className="row nav_inner">
            <div className="topleft text-right hidden-xs"><a href="#">
              <i className="fa icon icon_link">&nbsp;</i> <span>Nhượng quyền</span></a>
            </div>
            <div className="menu">
              <div className="logo">
                <div className="topnav-centered">
                  <a href="index.html">
                    <img src={require('../../resources/images/logo/logo-washup.png')} className="img-responsive" />
                  </a>
                </div>
              </div>
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#main-menu">
                <i className="fa fa-bars" />
              </button>
              <div id="main-menu" className="topnav navbar collapse navbar-collapse">
                <a href="#">Dịch vụ</a>
                <a href="#">Lốp xe &amp; Phụ kiện</a>
                <a href="#">Kinh nghiệm chăm sóc xe</a>
                <div className="topnav-right">
                  <a href="#">Tuyển dụng</a>
                  <a href="#">Liên hệ</a>
                  <a href="#"><i className="fa icon_user" /></a>
                  <a href="#" className="language"><i className="fa icon_global" /> VN</a>
                </div>
              </div>
            </div>
            <div className="topright text-left hidden-xs"><a href="#">
              <i className="fa icon icon_map">&nbsp;</i> <span>Hệ thống cửa hàng</span></a>
            </div>
          </div></div>
        </nav>
        <div id="site-banner" />
        <div id="site-service">
          <div className="top_services">
            <div className="container"><div className="row inner">
              <div className="search text-center">
                <div className="col-sm-3 hidden-xs" />
                <div className="col-sm-6 col-xs-12 text-center">
                  <h3 className="title">Dịch vụ sửa xe tại nhà</h3>
                  <div className="input-search input-icons">
                    <form name="frm_search" method="POST" action="#">
                      <i className="fa icon_phone icon" />
                      <input ref={e => this.phoneInputRef = e} type="number" className="form-control input-field search_phone" placeholder="Nhập số điện thoại" />
                      <div onClick={this.booking} className="btn-search">ĐẶT LỊCH NGAY</div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="search_bottom" />
            </div></div>
          </div>
          <div className="container"><div className="row">
            <div className="service">
              <div className="panel_header pd-lr20">
                <h3 className="title col-md-2 col-xs-12 pull-left">Dịch vụ</h3>
                <div className="col-md-8 col-xs-12 text-center">
                  <ul className="service_menu">
                    <li><a href="#" className="active">Vệ sinh cơ bản</a></li>
                    <li><a href="#">Làm đẹp</a></li>
                    <li><a href="#">Bảo dưỡng nhanh</a></li>
                  </ul>
                </div>
                <div className="col-md-2 text-right"><div className="row">
                  <a href="#" className="view_more">Xem tất cả <i className="fa fa-chevron-right" /></a>
                </div></div>
                <div className="clearfix" />
              </div>
              <div className="panel_body pd-lr20">
                <div className="serives_list row">
                  <div className="col col-sm-6 col-xs-12">
                    <div className="form-group">
                      <img src={require('../../resources/images/oto.png')} className="img-responsive img_service" />
                      <div className="item">Rửa xe hơi nước <span className="price">350k</span></div>
                      <div className="item">Tẩy ố kính <span className="price">700k</span></div>
                      <div className="item">Tẩy ố sơn <span className="price">800k</span></div>
                      <div className="item btn-more text-center">Xem thêm</div>
                    </div>
                    <button  onClick={this.bookingOTOService} className="btn btn-block btn-lg btn-primary"><i className="fa fa-calendar-check" /> Đặt lịch ngay</button>
                  </div>
                  <div className="col col-sm-6 col-xs-12">
                    <div className="form-group">
                      <img src={require('../../resources/images/xemay.png')} className="img-responsive img_service" />
                      <div className="item">Rửa siêu sạch <span className="price">2.000k</span></div>
                      <div className="item">Lột keo, đánh bóng xe máy <span className="price">350k</span></div>
                      <div className="item">Phủ Ceramic 9H <span className="price">1.500k</span></div>
                      <div className="space" />
                    </div>
                    <button  onClick={this.bookingXemayService} className="btn btn-block btn-lg btn-primary"><i className="fa fa-calendar-check" /> Đặt lịch ngay</button>
                  </div>
                  <div className="clearfix" />
                </div>
                <div className="clearfix membership">
                  <h3 className="title"><span>Các gói thẻ membership</span></h3>
                  <div className="box">
                    <div id="membership_slider" className="owl-carousel owl-theme">
                      <div className="item">
                        <img src={require('../../resources/images/package5.png')} className="img-responsive" />
                        <div className="price">
                          <div className="col-md-6 col-xs-6 text-left">Giá từ: <span className="price_old">525K</span></div>
                          <div className="col-md-6 col-xs-6 text-right"><span className="price_new">446K</span></div>
                        </div>
                      </div>
                      <div className="item">
                        <img src={require('../../resources/images/package10.png')} className="img-responsive" />
                        <div className="price">
                          <div className="col-md-6 col-xs-6 text-left">Giá từ: <span className="price_old">1.050K</span></div>
                          <div className="col-md-6 col-xs-6 text-right"><span className="price_new">892K</span></div>
                        </div>
                      </div>
                      <div className="item">
                        <img src={require('../../resources/images/package15.png')} className="img-responsive" />
                        <div className="price">
                          <div className="col-md-6 col-xs-6 text-left">Giá từ: <span className="price_old">1.050K</span></div>
                          <div className="col-md-6 col-xs-6 text-right"><span className="price_new">892K</span></div>
                        </div>
                      </div>
                      <div className="item">
                        <img src={require('../../resources/images/package5.png')} className="img-responsive" />
                        <div className="price">
                          <div className="col-md-6 col-xs-6 text-left">Giá từ: <span className="price_old">525K</span></div>
                          <div className="col-md-6 col-xs-6 text-right"><span className="price_new">446K</span></div>
                        </div>
                      </div>
                      <div className="item">
                        <img src={require('../../resources/images/package10.png')} className="img-responsive" />
                        <div className="price">
                          <div className="col-md-6 col-xs-6 text-left">Giá từ: <span className="price_old">1.050K</span></div>
                          <div className="col-md-6 col-xs-6 text-right"><span className="price_new">892K</span></div>
                        </div>
                      </div>
                      <div className="item">
                        <img src={require('../../resources/images/package15.png')} className="img-responsive" />
                        <div className="price">
                          <div className="col-md-6 col-xs-6 text-left">Giá từ: <span className="price_old">1.050K</span></div>
                          <div className="col-md-6 col-xs-6 text-right"><span className="price_new">892K</span></div>
                        </div>
                      </div>
                    </div></div>
                </div>
              </div>
              <div className="panel_footer"><div className="space" /></div>
            </div>
          </div></div>
        </div>
        <div id="site-product">
          <div className="container"><div className="row">
            <div className="panel_header pd-lr20">
              <h3 className="title col-md-5 pull-left">Phụ kiện cho xe</h3>
              <div className="pull-right">
                <a href="#" className="view_more">Xem tất cả <i className="fa fa-chevron-right" /></a>
              </div>
            </div>
            <div id="product_list">
              <div className="swiper-container swiper-container-initialized swiper-container-horizontal">
                <div className="swiper-wrapper" style={{ transform: 'translate3d(-1190px, 0px, 0px)', transition: 'all 0ms ease 0s' }}><div className="item swiper-slide swiper-slide-duplicate" data-swiper-slide-index={2} style={{ width: '178.333px', marginRight: '20px' }}>
                  <img src={require('../../resources/images/phukien3.png')} className="img-responsive" />
                  <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                  <div className="price">650K</div>
                  <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                  <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                </div><div className="item swiper-slide swiper-slide-duplicate" data-swiper-slide-index={3} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien4.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div><div className="item swiper-slide swiper-slide-duplicate" data-swiper-slide-index={4} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien5.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div><div className="item swiper-slide swiper-slide-duplicate" data-swiper-slide-index={5} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien6.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div><div className="item swiper-slide swiper-slide-duplicate" data-swiper-slide-index={6} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien1.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div><div className="item swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index={7} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien2.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div>
                  <div className="item swiper-slide swiper-slide-active" data-swiper-slide-index={0} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien1.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div>
                  <div className="item swiper-slide swiper-slide-next" data-swiper-slide-index={1} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien2.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div>
                  <div className="item swiper-slide" data-swiper-slide-index={2} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien3.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div>
                  <div className="item swiper-slide" data-swiper-slide-index={3} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien4.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div>
                  <div className="item swiper-slide" data-swiper-slide-index={4} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien5.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div>
                  <div className="item swiper-slide" data-swiper-slide-index={5} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien6.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div>
                  <div className="item swiper-slide" data-swiper-slide-index={6} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien1.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div>
                  <div className="item swiper-slide swiper-slide-duplicate-prev" data-swiper-slide-index={7} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien2.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div>
                  <div className="item swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index={0} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien1.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div><div className="item swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next" data-swiper-slide-index={1} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien2.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div><div className="item swiper-slide swiper-slide-duplicate" data-swiper-slide-index={2} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien3.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div><div className="item swiper-slide swiper-slide-duplicate" data-swiper-slide-index={3} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien4.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div><div className="item swiper-slide swiper-slide-duplicate" data-swiper-slide-index={4} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien5.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div><div className="item swiper-slide swiper-slide-duplicate" data-swiper-slide-index={5} style={{ width: '178.333px', marginRight: '20px' }}>
                    <img src={require('../../resources/images/phukien6.png')} className="img-responsive" />
                    <div className="name">Bơm 2 xylanh - MODEL ATJ 1166 (CƠ)</div>
                    <div className="price">650K</div>
                    <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                    <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                  </div></div>
                {/* Add Pagination */}
                <div className="swiper-pagination" />
                {/* Add Arrows */}
                <div className="swiper-button-next" tabIndex={0} role="button" aria-label="Next slide" />
                <div className="swiper-button-prev" tabIndex={0} role="button" aria-label="Previous slide" />
                <span className="swiper-notification" aria-live="assertive" aria-atomic="true" /></div>
            </div>
          </div></div>
        </div>
        <div id="site-news">
          <div className="container"><div className="row">
            <div className="panel_header pd-lr20">
              <h3 className="title col-md-5 pull-left">Kinh nghiệm chăm sóc xe</h3>
              <div className="col-md-7 text-right"><div className="row">
                <a href="#" className="view_more">Xem tất cả <i className="fa fa-chevron-right" /></a>
              </div></div>
              <div className="clearfix" />
            </div>
            <div className="panel_body ls_news">
              <div className="col-sm-4 item">
                <div className="inner news">
                  <div className="img" style={{ background: 'url("images/news1.png")' }} />
                  <div className="content">
                    <h2 className="title">Mẹo chăm sóc vợ 2 đơn giản</h2>
                    <div className="form-group intro">
                      Thường khi xe để lâu ngày hoặc bán ế để lâu trong bãi, các ron cao su, sun roof, nhựa xẽ bị oxi hóa xuống cấp làm xe bị dột...
                    </div>
                    <div className>
                      <a className="readmore" href="#">Xem chi tiết <i className="fa fa-chevron-right" /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 item">
                <div className="inner news">
                  <div className="img" style={{ background: 'url("images/news1.png")' }} />
                  <div className="content">
                    <h2 className="title">Mẹo chăm sóc vợ 2 đơn giản</h2>
                    <div className="form-group intro">
                      Thường khi xe để lâu ngày hoặc bán ế để lâu trong bãi, các ron cao su, sun roof, nhựa xẽ bị oxi hóa xuống cấp làm xe bị dột...
                    </div>
                    <div className>
                      <a className="readmore" href>Xem chi tiết <i className="fa fa-chevron-right" /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 item">
                <div className="inner news">
                  <div className="img" style={{ background: 'url("images/news1.png")' }} />
                  <div className="content">
                    <h2 className="title">Mẹo chăm sóc vợ 2 đơn giản</h2>
                    <div className="form-group intro">
                      Thường khi xe để lâu ngày hoặc bán ế để lâu trong bãi, các ron cao su, sun roof, nhựa xẽ bị oxi hóa xuống cấp làm xe bị dột...
                    </div>
                    <div className>
                      <a className="readmore" href>Xem chi tiết <i className="fa fa-chevron-right" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></div>
        </div>
        <div id="site-nq">
          <div className="container"><div className="row">
            <div className="panel_body">
              <div className="col-md-6 col-xs-12 img">
                <img src={require('../../resources/images/quangcao.png')} className="img-responsive" />
              </div>
              <div className="col-md-6 col-xs-12"><div className="content text-center">
                <div><img src={require('../../resources/images/nhuong_quyen.png')} className="text-center img-responsive" /></div>
                <div className="text">Với nhu cầu thị trường lớn cộng với vốn đầu tư ban đầu ở mức trung bình. Ngành chăm sóc & bán lẻ phụ kiện cho xe hoàn toàn có thể mang lại lợi nhuận ổn định và lâu dài.</div>
                <div><a href="#" className="btn btn-readmore">XEM THÊM</a></div>
              </div></div>
            </div>
          </div></div>
        </div>
        <div id="site-footer">
          <div className="container">
            <div className="panel_body">
              <div className="row">
                <div className="col-sm-4 site-info">
                  <div className="form-group logo">
                    <a href="#"><img src={require('../../resources/images/logo/logo-washup-small.png')} height={50} /></a>
                  </div>
                  <div className="clearfix form-group intro">
                    Wash-Up là chuỗi rửa xe với quy trình rửa xe 7 bước được chuẩn hóa, đảm bảo một chiếc xe sáng bóng, kết hợp cùng quy trình kiểm tra 4 yếu tố an toàn PHANH - LỐP - DẦU - GƯƠNG mang đến cho bạn không chỉ là một chiếc xe sáng bóng mà còn an toàn khi di chuyển.
                </div>
                  <div className="clearfix form-group contact">
                    <i className="fa fa-map-marker icon" />
                    <div className="text">
                      <h4>Công ty Cổ phần thương mại dịch vụ WASHUP</h4>
                      <div>L4.01, khu I, tòa nhà Prince Residence,<br />
                      19-21 Nguyễn Văn Trỗi, P12, Q. Phú Nhuận, TP.HCM</div>
                    </div>
                  </div>
                  <div className="clearfix form-group phone">
                    <i className="fa fa-phone icon" />
                    <div className="text">0964179213</div>
                  </div>
                  <div className="clearfix form-group mail">
                    <i className="fa fa-envelope icon" />
                    <div className="text">
                      <a href="mailto:chuoichamsocxe@washup.vn">chuoichamsocxe@washup.vn</a>
                    </div>
                  </div>
                  <div className="clearfix form-group hotline">
                    <img src={require('../../resources/images/hotline.png')} />
                  </div>
                </div>
                <div className="col-sm-4 connect">
                  <div className="form-group">Kết nối với chúng tôi</div>
                  <div className="social form-group">
                    <a href="#" className="icon_fb"><img src={require('../../resources/images/icons/icon_fb.png')} /></a>
                  </div>
                  <div className="form-group">
                    Trải nghiệm đặt lịch nhanh chóng và nhiều tiện ích khác với ứng dụng Wash-Up
                </div>
                  <div className="apps">
                    <img src={require('../../resources/images/icons/ios-app.png')} height={40} />
                    <img src={require('../../resources/images/icons/androi-app.png')} height={40} />
                  </div>
                </div>
                <div className="col-sm-4 payment">
                  <div className="form-group">Chấp nhận các hình thức thanh toán</div>
                  <div className="cards">
                    <a href="#" className="icon_visa"><img src={require('../../resources/images/visa.png')} /></a>
                    <a href="#" className="icon_master"><img src={require('../../resources/images/mastercard.png')} /></a>
                    <a href="#" className="icon_napas"><img src={require('../../resources/images/napas.png')} /></a>
                  </div>
                  <div className>
                    <img height={52} src={require('../../resources/images/logo/thongbao.png')} />
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
        {this.state.isStep1 && <BookingStep1Modal {...this.props} onNext={this.nextStep2} onClose={this.onCloseStep1Modal} />}
        {this.state.isStep2 && <BookingStep2Modal {...this.props} onPrev={this.prevStep1} onNext={this.nextStep3} />}
        {this.state.isStep3 && <BookingStep3Modal {...this.props} onPrev={this.prevStep2} onNext={this.nextStep4} />}
        {this.state.isStep4 && <BookingStep4Modal {...this.props} onClose={this.onCloseBooking} />}
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
)(Home)
