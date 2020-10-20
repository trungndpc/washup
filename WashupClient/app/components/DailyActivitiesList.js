import React, { Component } from 'react'
import PriceUtils from '../utils/PriceUtils'
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel2';



class DailyActivitiesList extends Component {

    componentWillMount() {
        this.props.appActions.getActivityTop();
    }

    render() {
        const options = {
            items: 3,
            loop: true,
            margin: 30,
            responsiveClass: "true",
            responsive: {
                0: { items: 1, stagePadding: 100 },
                320: { items: 2 },
                600: { items: 2 },
                1000: { items: 3, loop: true }
            }
        };

        const activities = this.props.app.activities;
        return (
            <div id="site-activy">
                <div className="container"><div className="row">
                    <div className="panel_header pd-lr20">
                        <h3 className="title col-md-5 pull-left">KỸ THUẬT VIÊN</h3>
                    </div>
                    <div id="activy_list">
                        {activities && activities.length > 0 && <OwlCarousel className="owl-carousel owl-theme" options={options} >
                            {activities && activities.map((item, index) => {
                                return (
                                    <div key={item["id"]} className="item" >
                                        <img src={item["imgUrl"]} className="img-responsive" />
                                    </div>
                                )
                            })}

                        </OwlCarousel>
                        }
                    </div>
                </div></div>
            </div>
        )
    }
}

export default DailyActivitiesList
