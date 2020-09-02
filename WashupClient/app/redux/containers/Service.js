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
        this.changeTabService = this.changeTabService.bind(this);

    }

    componentWillMount() {
        this.props.appActions.getServiceByServiceGroupId(this.state.tabServiceId);
    }

    componentDidMount() {
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
                <div id="service-banner"></div>
                <div id="service-wrapper">
                    <div className="container"><div className="row">
                        <div className="service-inner row">
                            <div className="servie-top" />
                            <div className="service_menu text-center">
                                <ul>
                                    <li onClick={() => { this.changeTabService(1) }}><a href="javascript:void(0)" className={this.state.tabServiceId == 1 ? 'active' : ''}>Vệ sinh cơ bản</a></li>
                                    <li onClick={() => { this.changeTabService(3) }}><a href="javascript:void(0)" className={this.state.tabServiceId == 3 ? 'active' : ''}>Làm đẹp</a></li>
                                    <li onClick={() => { this.changeTabService(2) }}><a href="javascript:void(0)" className={this.state.tabServiceId == 2 ? 'active' : ''}>Bảo dưỡng nhanh</a></li>
                                </ul>
                            </div>
                            <div className="service_list serives_list">
                                <div className="col-sm-12 service_car">
                                    <div className="header text-center"><img src={require("../../resources/images/service_title_oto.jpg")} className="img-responsive" /></div>
                                    <div className="content">
                                        {otoService && otoService.map((item, index) => {
                                            return (
                                                <div key={item["id"]} className="col-md-3 col-sm-6 col-xs-12 item">

                                                    <div className="inner">
                                                        <div className="img" style={{ backgroundImage: 'url("' + item["imgUrl"] + '")' }} />
                                                        <h2 className="title text-center">{item["name"]}</h2>
                                                        <div className="price text-center">{PriceUtils.toThousand(item["price"])}</div>
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
                                        {xeMayService && xeMayService.map((item, index) => {
                                            return (
                                                <div key={item["id"]} className="col-md-3 col-sm-6 col-xs-12 item">
                                                    <div className="inner">
                                                        <div className="img" style={{ backgroundImage: 'url("' + item["imgUrl"] + '")' }} />
                                                        <h2 className="title text-center">{item["name"]}</h2>
                                                        <div className="price text-center">{PriceUtils.toThousand(item["price"])}</div>
                                                        <div className="button">
                                                            <button className="btn btn-block btn-primary"><i className="fa fa-calendar-check" /> Đặt lịch ngay</button></div>
                                                        <div className="clearfix" />
                                                    </div>
                                                </div>
                                            )
                                        })}


                                    </div>
                                </div>
                                <div className="clearfix" />

                            </div>
                            <div style={{ backgroundColor: '#fff' }} className="col-xs-12">
                                <div style={{ padding: '0 15px' }}>
                                    <MembershipList />
                                </div>
                            </div>
                            <div className="clearfix" />
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
