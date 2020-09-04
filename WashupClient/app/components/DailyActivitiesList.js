import React, { Component } from 'react'
import PriceUtils from '../utils/PriceUtils'
import { Link } from "react-router-dom";


class DailyActivitiesList extends Component {

    componentWillMount() {
        this.props.appActions.getActivityTop();
    }

    render() {
        const activities = this.props.app.activities;
        return (
            <div id="site-activy">
                <div className="container"><div className="row">
                    <div className="panel_header pd-lr20">
                        <h3 className="title col-md-5 pull-left">NHẬT KÝ HÀNG NGÀY</h3>
                    </div>
                    <div id="product_list">
                        <div className="swiper-container swiper-container-initialized swiper-container-horizontal">
                            <div className="swiper-wrapper" style={{ transform: 'translate3d(-1190px, 0px, 0px)', transition: 'all 0ms ease 0s' }}>
                                {activities && activities.map((item, index) => {
                                    return (
                                        <div key={item["id"]} className="item swiper-slide swiper-slide-duplicate" data-swiper-slide-index={2} style={{ width: '178.333px', marginRight: '20px' }}>
                                            <img src={item["imgUrl"]} className="img-responsive" />
                                                <div className="name" style={{fontWeight: '600'}}>{item["title"]}</div>
                                                <div >{item["subTitle"]}</div>
                                        </div>
                                    )
                                })}

                            </div>
                            {/* <div className="swiper-pagination" /> */}
                            {/* <div className="swiper-button-next" tabIndex={0} role="button" aria-label="Next slide" /> */}
                            {/* <div className="swiper-button-prev" tabIndex={0} role="button" aria-label="Previous slide" />  */}
                        </div>
                    </div>
                </div></div>
            </div>
        )
    }
}

export default DailyActivitiesList
