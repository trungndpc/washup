import React, { Component } from 'react'
import PriceUtils from '../utils/PriceUtils'
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel2';



class MembershipList extends Component {

    componentWillMount() {
    }

    componentDidMount() {
        // window.initOwlCarousel();
    }

    render() {
        const options = {
            items: 3,
            loop: true,
            margin: 30,
            responsiveClass: "true",
            responsive: {
                0: { items: 1, stagePadding: 100},
                320: {items: 2},
                600: { items: 3 },
                1000: { items: 4, loop: false }
            }
        };

        return (
            <div className="clearfix membership">
                <h3 className="title"><span style={{fontWeight:'600', fontStyle: 'normal'}}>Deal Hot!!!</span></h3>
                <div className="box">
                    <OwlCarousel id="membership_slider" className="owl-carousel owl-theme" options={options} >
                        <div className="item">
                            <img src={require('../resources/images/combo/4-cb1.png')} className="img-responsive" />
                            {/* <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">3.850K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">2.950K</span></div>
                            </div> */}
                        </div>
                        {/* <div className="item">
                            <img src={require('../resources/images/combo/7-cb5.png')} className="img-responsive" />
                            <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">150K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">140K</span></div>
                            </div>
                        </div> */}
                        <div className="item">
                            <img src={require('../resources/images/combo/4-cb2.png')} className="img-responsive" />
                            {/* <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">450K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">399K</span></div>
                            </div> */}
                        </div>
                        <div className="item">
                            <img src={require('../resources/images/combo/7-cb4.png')} className="img-responsive" />
                            {/* <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">210K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">180K</span></div>
                            </div> */}
                        </div>
                        <div className="item">
                            <img src={require('../resources/images/combo/7-cb3.png')} className="img-responsive" />
                            {/* <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">1.600K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">1.200K</span></div>
                            </div> */}
                        </div>
                        <div className="item">
                            <img src={require('../resources/images/combo/4-cb3.png')} className="img-responsive" />
                            {/* <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">1.400K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">900K</span></div>
                            </div> */}
                        </div>
                        <div className="item">
                            <img src={require('../resources/images/combo/4-cb5.png')} className="img-responsive" />
                            {/* <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">190K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">150K</span></div>
                            </div> */}
                        </div>
                        <div className="item">
                            <img src={require('../resources/images/combo/4-cb6.png')} className="img-responsive" />
                            {/* <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">135K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">120K</span></div>
                            </div> */}
                        </div>
                        <div className="item">
                            <img src={require('../resources/images/combo/7-cb1.png')} className="img-responsive" />
                            {/* <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">4.600K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">3.450k</span></div>
                            </div> */}
                        </div>

                        <div className="item">
                            <img src={require('../resources/images/combo/7-cb2.png')} className="img-responsive" />
                            {/* <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">510K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">499K</span></div>
                            </div> */}
                        </div>

                        {/* <div className="item">
                            <img src={require('../resources/images/the-thanh-vien/ttv32.jpg')} className="img-responsive" />
                            <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">1.573K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">1.473K</span></div>
                            </div>
                        </div>
                        <div className="item">
                            <img src={require('../resources/images/the-thanh-vien/ttv33.jpg')} className="img-responsive" />
                            <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">661K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">561K</span></div>
                            </div>
                        </div>
                        <div className="item">
                            <img src={require('../resources/images/the-thanh-vien/ttv34.jpg')} className="img-responsive" />
                            <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">1.129K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">1.029K</span></div>
                            </div>
                        </div>
                        <div className="item">
                            <img src={require('../resources/images/the-thanh-vien/ttv35.jpg')} className="img-responsive" />
                            < div className="price" >
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">738K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">638K</span></div>
                            </div>
                        </div>
                        <div className="item">
                            <img src={require('../resources/images/the-thanh-vien/ttv36.jpg')} className="img-responsive" />
                            <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">325K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">225K</span></div>
                            </div>
                        </div>
                        <div className="item">
                            <img src={require('../resources/images/the-thanh-vien/ttv37.jpg')} className="img-responsive" />
                            <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">525K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">425K</span></div>
                            </div>
                        </div>
                        <div className="item">
                            <img src={require('../resources/images/the-thanh-vien/ttv38.jpg')} className="img-responsive" />
                            <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">483K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">383K</span></div>
                            </div>
                        </div>
                        <div className="item">
                            <img src={require('../resources/images/the-thanh-vien/ttv39.jpg')} className="img-responsive" />
                            <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">240K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">140K</span></div>
                            </div>
                        </div>
                        <div className="item">
                            <img src={require('../resources/images/the-thanh-vien/ttv40.jpg')} className="img-responsive" />
                            <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">355K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">255K</span></div>
                            </div>
                        </div>
                        <div className="item">
                            <img src={require('../resources/images/the-thanh-vien/ttv41.jpg')} className="img-responsive" />
                            <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">1.035K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">935K</span></div>
                            </div>
                        </div>
                        <div className="item">
                            <img src={require('../resources/images/the-thanh-vien/ttv42.jpg')} className="img-responsive" />
                            <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">568K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">468K</span></div>
                            </div>
                        </div>
                        <div className="item">
                            <img src={require('../resources/images/the-thanh-vien/ttv43.jpg')} className="img-responsive" />
                            <div className="price">
                                <div className="col-md-7 col-xs-7 text-left">Giá từ: <span className="price_old">1.503K</span></div>
                                <div className="col-md-5 col-xs-5 text-right"><span className="price_new">1.403K</span></div>
                            </div>
                        </div> */}
                    </OwlCarousel>
                </div>
            </div>
        )
    }
}

export default MembershipList
