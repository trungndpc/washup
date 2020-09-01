import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PriceUtils from '../../utils/PriceUtils';
import { Model } from '../../constants/Constants'
import MembershipList from '../../components/MembershipList';


class Service extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabServiceId: 1

        }

    }

    componentWillMount() {
        this.props.appActions.getServiceByServiceGroupId(this.state.tabServiceId);
    }

    componentDidMount() {
    }


    render() {
        let serviceTraOTO = this.props.app.services[Model.OTO]
        const otoService = (serviceTraOTO && serviceTraOTO[this.state.tabServiceId]) ? serviceTraOTO[this.state.tabServiceId] : []
        let serviceTraXEMAY = this.props.app.services[Model.XEMAY]
        const xeMayService = (serviceTraXEMAY && serviceTraXEMAY[this.state.tabServiceId]) ? serviceTraXEMAY[this.state.tabServiceId] : []
        return (
            <div>
                <Header />
                <div id="service-banner"></div>
                <div id="service-wrapper">
                    <div className="container"><div className="row">
                        <div className="service-inner row">
                            <div className="servie-top" />
                            <div className="service_menu text-center">
                                <ul><li><a href="#" className="active">Vệ sinh cơ bản</a></li>
                                    <li><a href="#">Làm đẹp</a></li>
                                    <li><a href="#">Bảo dưỡng nhanh</a></li>
                                </ul>
                            </div>
                            <div className="service_list serives_list">
                                <div className="col-sm-12 service_car">
                                    <div className="header text-center"><img src={require("../../resources/images/service_title_oto.jpg")} className="img-responsive" /></div>
                                    <div className="content">
                                        {otoService && otoService.map((item, index) => {
                                            return (
                                                <div className="col-md-3 col-sm-6 col-xs-12 item">

                                                    <div className="inner">
                                                        <div className="img" style={{ background: 'url("' + item["imgUrl"] +'")' }} />
                                                        <h2 className="title text-center">{item["name"]}</h2>
                                                        <div className="price text-center">650K</div>
                                                        <div className="button">
                                                            <button className="btn btn-block btn-primary"><i className="fa fa-calendar-check" /> Đặt lịch ngay</button></div>
                                                        <div className="clearfix" />
                                                    </div>
                                                </div>
                                            )
                                        })}


                                    </div>
                                </div>
                                <div className="col-sm-12 service_car">
                                    <div className="header text-center"><img src={require("../../resources/images/service_title_xemay.jpg")} className="img-responsive" /></div>
                                    <div className="content">
                                        <div className="col-md-3 col-sm-6 col-xs-12 item">
                                            <div className="inner">
                                                <div className="img" style={{ background: 'url("images/news1.png")' }} />
                                                <h2 className="title text-center">Rửa xe ngoài ô tô 4 chỗ</h2>
                                                <div className="price text-center">650K</div>
                                                <div className="button">
                                                    <button className="btn btn-block btn-primary"><i className="fa fa-calendar-check" /> Đặt lịch ngay</button></div>
                                                <div className="clearfix" />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6 col-xs-12 item">
                                            <div className="inner">
                                                <div className="img" style={{ background: 'url("images/news1.png")' }} />
                                                <h2 className="title text-center">Rửa xe ngoài ô tô 4 chỗ</h2>
                                                <div className="price text-center">650K</div>
                                                <div className="button">
                                                    <button className="btn btn-block btn-primary"><i className="fa fa-calendar-check" /> Đặt lịch ngay</button></div>
                                                <div className="clearfix" />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6 col-xs-12 item">
                                            <div className="inner">
                                                <div className="img" style={{ background: 'url("images/news1.png")' }} />
                                                <h2 className="title text-center">Rửa xe ngoài ô tô 4 chỗ</h2>
                                                <div className="price text-center">650K</div>
                                                <div className="button">
                                                    <button className="btn btn-block btn-primary"><i className="fa fa-calendar-check" /> Đặt lịch ngay</button></div>
                                                <div className="clearfix" />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6 col-xs-12 item">
                                            <div className="inner">
                                                <div className="img" style={{ background: 'url("images/news1.png")' }} />
                                                <h2 className="title text-center">Rửa xe ngoài ô tô 4 chỗ</h2>
                                                <div className="price text-center">650K</div>
                                                <div className="button">
                                                    <button className="btn btn-block btn-primary"><i className="fa fa-calendar-check" /> Đặt lịch ngay</button></div>
                                                <div className="clearfix" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix" />
                                <div className="col-xs-12">
                                    <div style={{ padding: '0 15px' }}>
                                        <MembershipList />
                                    </div>
                                </div>
                                <div className="clearfix" />
                            </div>
                            <div className="panel_footer"><div className="space" /></div>
                        </div>
                    </div></div>
                    <div className="clearix" />
                </div>
                <Footer />
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
)(Service)
