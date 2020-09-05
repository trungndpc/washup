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
import NewsList from '../../components/NewsList';
import Footer from '../../components/Footer';
import PriceUtils from '../../utils/PriceUtils'
import AccessoriesList from '../../components/AccessoriesList';
import Header from '../../components/Header';
import MembershipList from '../../components/MembershipList';
import DailyActivitiesList from '../../components/DailyActivitiesList';
import { Link } from "react-router-dom";


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isStep1: false,
      isStep2: false,
      isStep3: false,
      isStep4: false,
      tabServiceId: 1
    }
    this.booking = this.booking.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.bookingOTOService = this.bookingOTOService.bind(this);
    this.bookingXemayService = this.bookingXemayService.bind(this);
    this.nextStep2 = this.nextStep2.bind(this);
    this.nextStep3 = this.nextStep3.bind(this);
    this.nextStep4 = this.nextStep4.bind(this);

    this.prevStep1 = this.prevStep1.bind(this);
    this.prevStep2 = this.prevStep2.bind(this);
    this.onCloseBooking = this.onCloseBooking.bind(this);
    this.formatPhone = this.formatPhone.bind(this);
    this.changeTabService = this.changeTabService.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this)

  }

  componentDidMount() {
    this.props.appActions.getServiceByServiceGroupId(this.state.tabServiceId);
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.booking();
    }
    return;
  }


  booking() {
    if (this.phoneInputRef && this.phoneInputRef.value) {
      if(this.phoneInputRef.value.match(/\d/g).length < 10) {
      AlertUtils.showWarning("Vui lòng nhập đủ số điện thoại")
        return;
      }
      this.props.appActions.putInforBooking({ "phone": this.phoneInputRef.value })
      this.setState({ isStep1: true })
    } else {
      AlertUtils.showWarning("Vui lòng nhập số điện thoại")
    }
  }

  bookingOTOService() {
    window.open('https://www.messenger.com/t/washupvietnamofficial', '_blank');
  }

  bookingXemayService() {
    window.open('https://www.messenger.com/t/washupvietnamofficial', '_blank');
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

  onCloseModal() {
    this.setState({ isStep1: false, isStep2: false, isStep3: false, isStep4: false });
  }

  onCloseBooking() {
    this.setState({ isStep1: false, isStep2: false, isStep3: false, isStep4: false });
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
    this.props.appActions.getServiceByServiceGroupId(tabServiceId);
  }

  render() {
    let serviceTraOTO = this.props.app.services[Model.OTO]
    const otoService = (serviceTraOTO && serviceTraOTO[this.state.tabServiceId]) ? serviceTraOTO[this.state.tabServiceId] : []
    let serviceTraXEMAY = this.props.app.services[Model.XEMAY]
    const xeMayService = (serviceTraXEMAY && serviceTraXEMAY[this.state.tabServiceId]) ? serviceTraXEMAY[this.state.tabServiceId] : []
    return (
      <div>
        <Header />
        <div id="site-banner" />
        <div id="site-service">
          <div className="top_services">
            <div className="container"><div className="row inner">
              <div className="search text-center">
                <div className="col-sm-3 hidden-xs" />
                <div className="col-sm-6 col-xs-12 text-center">
                  <h3 className="title">Rửa xe tận nhà</h3>
                  <div className="input-search input-icons">
                    {/* <form name="frm_search"  onKeyDown={this._handleKeyDown}  > */}
                      <i className="fa icon_phone icon" />
                      <input onKeyDown={this._handleKeyDown}  onChange={this.formatPhone} ref={e => this.phoneInputRef = e} type="tel" pattern="[0-9]{4}.[0-9]{3}.[0-9]{3}" className="form-control input-field search_phone" placeholder="Nhập số điện thoại" />
                      <div onClick={this.booking} className="btn-search">ĐẶT LỊCH NGAY</div>
                    {/* </form> */}
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
                    <li onClick={() => { this.changeTabService(1) }}><a onClick={() => { this.changeTabService(1) }} href="javascript:void(0)" className={this.state.tabServiceId == 1 ? 'active' : ''}>Vệ sinh cơ bản</a></li>
                    <li onClick={() => { this.changeTabService(3) }}><a onClick={() => { this.changeTabService(1) }} href="javascript:void(0)" className={this.state.tabServiceId == 3 ? 'active' : ''}>Làm đẹp</a></li>
                    <li onClick={() => { this.changeTabService(2) }}><a onClick={() => { this.changeTabService(1) }} href="javascript:void(0)" className={this.state.tabServiceId == 2 ? 'active' : ''}>Bảo dưỡng nhanh</a></li>
                  </ul>
                </div>
                <div className="col-md-2 text-right"><div className="row">
                  <Link to={"/dich-vu"} className="view_more">Xem tất cả <i className="fa fa-chevron-right" /></Link>
                </div></div>
                <div className="clearfix" />
              </div>
              <div className="panel_body pd-lr20">
                <div className="serives_list row">
                  <div className="col col-sm-6 col-xs-12">
                    <div className="form-group">
                      <img src={require('../../resources/images/oto.png')} className="img-responsive img_service" />
                      {otoService && otoService.slice(0, 3).map((item, index) => {
                        return (
                          <div key={item["id"]} className="item">{item["name"]}
                            {item["price"] == 0 && <span style={{ float: 'right', color: '#ff6c00', fontWeight: '600' }}>Liên hệ</span>}
                            {item["price"] > 0 &&
                              <span className="price">{PriceUtils.toThousand(item["price"])}</span>
                            }
                          </div>
                        )
                      })}

                      <div className="item btn-more text-center">Xem thêm</div>
                    </div>
                    <button onClick={this.bookingOTOService} className="btn btn-block btn-lg btn-primary"><i className="fa fa-calendar-check" /> Tư vấn ngay</button>
                  </div>
                  <div className="col col-sm-6 col-xs-12">
                    <div className="form-group">
                      <img src={require('../../resources/images/xemay.png')} className="img-responsive img_service" />
                      {xeMayService && xeMayService.slice(0, 3).map((item, index) => {
                        return (
                          <div key={item["id"]} className="item">{item["name"]}
                            {item["price"] == 0 && <span style={{ float: 'right', color: '#ff6c00', fontWeight: '600' }}>Liên hệ</span>}
                            {item["price"] > 0 &&
                              <span className="price">{PriceUtils.toThousand(item["price"])}</span>
                            }
                          </div>
                        )
                      })}
                      <div className="space" />
                    </div>
                    <button onClick={this.bookingXemayService} className="btn btn-block btn-lg btn-primary"><i className="fa fa-calendar-check" /> Tư vấn ngay</button>
                  </div>
                  <div className="clearfix" />
                </div>
                <MembershipList />
              </div>
              <div className="panel_footer"><div className="space" /></div>
            </div>
          </div></div>
        </div>
        <AccessoriesList {...this.props} />
        <NewsList />
        <DailyActivitiesList {...this.props}  />
        {/* <div id="site-nq">
          <div className="container"><div className="row">
            <div className="panel_body">
              <div className="col-md-6 col-xs-12 img">
                <img src={require('../../resources/images/quangcao.jpg')} className="img-responsive" />
              </div>
              <div className="col-md-6 col-xs-12"><div className="content text-center">
                <div><img src={require('../../resources/images/nhuong_quyen.png')} className="text-center img-responsive" /></div>
                <div className="text">Với nhu cầu thị trường lớn cộng với vốn đầu tư ban đầu ở mức trung bình. Ngành chăm sóc & bán lẻ phụ kiện cho xe hoàn toàn có thể mang lại lợi nhuận ổn định và lâu dài.</div>
                <div><a href="#" className="btn btn-readmore">XEM THÊM</a></div>
              </div></div>
            </div>
          </div></div>
        </div> */}
        <Footer />
        {this.state.isStep1 && <BookingStep1Modal {...this.props} onNext={this.nextStep2} onClose={this.onCloseModal} />}
        {this.state.isStep2 && <BookingStep2Modal {...this.props} onPrev={this.prevStep1} onClose={this.onCloseModal} onNext={this.nextStep3} />}
        {this.state.isStep3 && <BookingStep3Modal {...this.props} onPrev={this.prevStep2} onClose={this.onCloseModal} onNext={this.nextStep4} />}
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
