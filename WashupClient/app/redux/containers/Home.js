import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'
import AlertUtils from '../../utils/AlertUtils';
import { Model, TYPE_SERVICE } from '../../constants/Constants';
import Footer from '../../components/Footer';
import PriceUtils from '../../utils/PriceUtils'
import Header from '../../components/Header';
import MembershipList from '../../components/MembershipList';
import MLink from '../../components/MLink'
import BookingModal from '../../components/bookings/BookingModal';
import DailyActivitiesList from '../../components/DailyActivitiesList';
import InstallApp from '../../components/InstallApp'
import AdsPopup from '../../components/AdsPopup'


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabServiceId: TYPE_SERVICE.CO_BAN
    }
    this.booking = this.booking.bind(this);
    this.bookingOTOService = this.bookingOTOService.bind(this);
    this.bookingXemayService = this.bookingXemayService.bind(this);
    this.formatPhone = this.formatPhone.bind(this);
    this.changeTabService = this.changeTabService.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this.openSearchBookingbyPhone = this.openSearchBookingbyPhone.bind(this);

  }

  componentDidMount() {
    this.props.appActions.getHomeInfo()
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.booking();
    }
    return;
  }


  openSearchBookingbyPhone() {
    this.props.appActions.changeStatusSearchPhoneModal(true);
  }

  booking() {
    if (this.phoneInputRef && this.phoneInputRef.value) {
      if (this.phoneInputRef.value.match(/\d/g).length < 10 || this.phoneInputRef.value.match(/\d/g).length > 10) {
        AlertUtils.showWarning("Vui lòng nhập đủ số điện thoại")
        return;
      }
      this.props.appActions.changeModeBookingModal(1);
      this.props.appActions.putInforBooking({ "phone": this.phoneInputRef.value })
      this.bookingModalRef && this.bookingModalRef.open();
    } else {
      AlertUtils.showWarning("Vui lòng nhập số điện thoại")
    }
  }

  bookingOTOService() {
    this.props.appActions.changeModeBookingModal(1);
    this.props.appActions.putInforBooking({ "transportId": Model.OTO })
    this.bookingModalRef && this.bookingModalRef.open();
  }

  bookingXemayService() {
    this.props.appActions.changeModeBookingModal(1);
    this.props.appActions.putInforBooking({ "transportId": Model.XEMAY })
    this.bookingModalRef && this.bookingModalRef.open();
  }

  formatPhone(e) {
    var value = e.target.value;
    if (value) {
      value = value.replace(/\D/g, '');
      let rs = "";
      for (var i = 0; i < value.length; i++) {
        if (i == 4 || i == 7) {
          rs = rs + "." + value.charAt(i)
        } else {
          rs = rs + value.charAt(i)
        }
      }
      this.phoneInputRef.value = rs;
    }
  }

  changeTabService(tabServiceId) {
    this.setState({
      tabServiceId: tabServiceId
    })
  }

  render() {
    let storeService = this.props.app.storeServices;
    let otoServices = [];
    if (storeService) {
      let otoGroupService = storeService[Model.OTO];
      if (otoGroupService) {
        otoServices = otoGroupService[this.state.tabServiceId]
      }
    }
    let xemayServices = [];
    if (storeService) {
      let xemayGroupService = storeService[Model.XEMAY];
      if (xemayGroupService) {
        xemayServices = xemayGroupService[this.state.tabServiceId];
      }
    }
    return (
      <div>
        <AdsPopup />
        <Header {...this.props} />
        <div id="site-banner" />
        <div id="site-service">
          <div className="top_services">
            <div className="container"><div className="row inner">
              <div className="search text-center">
                <div className="col-sm-3 hidden-xs" />
                <div className="col-sm-6 col-xs-12 text-center">
                  <h3 className="title">Rửa xe tận nhà</h3>
                  <div className="input-search input-icons">
                    <i className="fa icon_phone icon" />
                    <input onKeyDown={this._handleKeyDown} onChange={this.formatPhone} ref={e => this.phoneInputRef = e} type="tel" pattern="[0-9]{4}.[0-9]{3}.[0-9]{3}" className="form-control input-field search_phone" placeholder="Nhập số điện thoại" />
                    <div onClick={this.booking} className="btn-search">ĐẶT LỊCH NGAY</div>
                  </div>
                </div>
              </div>
              <div className="search_bottom" />
            </div></div>
          </div>
          <div className="container"><div className="row">
            <div className="service">
              <div className="panel_header pd-lr20">
                <div className="row">
                  <h3 className="title col-md-12">Dịch vụ</h3>
                </div>
                <div className="row">
                  <div className="col-md-8 col-xs-8 text-center">
                    <ul className="service_menu">
                      <li onClick={() => { this.changeTabService(TYPE_SERVICE.CO_BAN) }}><a onClick={() => { this.changeTabService(TYPE_SERVICE.CO_BAN) }} href="javascript:void(0)" className={this.state.tabServiceId == TYPE_SERVICE.CO_BAN ? 'active' : ''}>Cơ bản</a></li>
                      <li onClick={() => { this.changeTabService(TYPE_SERVICE.NANG_CAO) }}><a onClick={() => { this.changeTabService(TYPE_SERVICE.NANG_CAO) }} href="javascript:void(0)" className={this.state.tabServiceId == TYPE_SERVICE.NANG_CAO ? 'active' : ''}>Nâng cao</a></li>
                      <li onClick={() => { this.changeTabService(TYPE_SERVICE.COMBO_TAINHA) }}><a onClick={() => { this.changeTabService(TYPE_SERVICE.COMBO_TAINHA) }} href="javascript:void(0)" className={this.state.tabServiceId == TYPE_SERVICE.COMBO_TAINHA ? 'active' : ''}>Combo</a></li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-xs-4 text-right btn_view_more_servie">
                    <div className="row">
                      <MLink to={"/dich-vu"} className="view_more">Xem tất cả <i className="fa fa-chevron-right" /></MLink>
                    </div>
                  </div>
                </div>

                <div className="clearfix" />
              </div>
              <div className="panel_body ">
                <div className="serives_list row">
                  <div className="col col-sm-6 col-xs-12">
                    <div className="form-group">
                      <img src={require('../../resources/images/oto.png')} className="img-responsive img_service" />
                      {otoServices && otoServices.slice(0, 3).map((item, index) => {
                        return (
                          <div key={item["id"]} className="item row">
                            <p className="name_service">
                              {item["name"]}
                            </p>
                            {item["price"] == 0 && <span style={{ float: 'right', color: '#ff6c00', fontWeight: '600' }}>Liên hệ</span>}
                            {item["price"] > 0 &&
                              <span className="price">{PriceUtils.toThousand(item["price"])}</span>
                            }
                          </div>
                        )
                      })}

                      <div onClick={function () { window.openNotifycation() }} className="item btn-more text-center">Xem thêm</div>
                    </div>
                    <button onClick={this.bookingOTOService} className="btn btn-block btn-lg btn-primary"><span className="content"><i className="fa fa-calendar-check" /> Đặt lịch ngay</span></button>
                  </div>
                  <div className="col col-sm-6 col-xs-12">
                    <div className="form-group">
                      <img src={require('../../resources/images/xemay.png')} className="img-responsive img_service" />
                      {xemayServices && xemayServices.slice(0, 3).map((item, index) => {
                        return (
                          <div key={item["id"]} className="item">
                            <p className="name_service">
                              {item["name"]}
                            </p>
                            {item["price"] == 0 && <span style={{ float: 'right', color: '#ff6c00', fontWeight: '600' }}>Liên hệ</span>}
                            {item["price"] > 0 &&
                              <span className="price">{PriceUtils.toThousand(item["price"])}</span>
                            }
                          </div>
                        )
                      })}
                      <div className="space" />
                    </div>
                    <button onClick={this.bookingXemayService} className="btn btn-block btn-lg btn-primary"><span className="content"><i className="fa fa-calendar-check" /> Đặt lịch ngay </span></button>
                  </div>
                  <div className="clearfix" />
                </div>
                {/* <MembershipList /> */}
              </div>
              <div className="panel_footer"><div className="space" /></div>
            </div>
          </div></div>
        </div>
        <InstallApp />
        <DailyActivitiesList {...this.props} />
        <Footer />

        <div id="schedule_now">
          <a href="javascript:void(0)" title="Đặt lịch rửa xe tận nhà">
            <div className="orange">
              <i className="fa fa-calendar" /> <span>RỬA XE TẬN NHÀ</span>
            </div>
            <div onClick={this.openSearchBookingbyPhone} className="blue">XEM LẠI LỊCH ĐÃ ĐẶT</div>
          </a>
        </div>

        <BookingModal ref={e => this.bookingModalRef = e} {...this.props} />
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
