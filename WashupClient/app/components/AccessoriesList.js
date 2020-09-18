import React, { Component } from 'react'
import PriceUtils from '../utils/PriceUtils'
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel2';

class AccessoriesList extends Component {

    componentWillMount() {
        this.props.appActions.getAccessoriesTop();
    }

    render() {
        const options = {
            items: 5,
            loop: true,
            margin: 30,
            responsiveClass: true,
            responsive: {
                0: { items: 1, stagePadding: 100},
                600: { items: 3 },
                1000: { items: 5, loop: false }
            }
        };
        const listAccesories = this.props.app.topAccessories;
        return (
            <div id="site-product">
                <div className="container"><div className="row">
                    <div className="panel_header pd-lr20">
                        <h3 className="title col-md-5 pull-left">Phụ kiện cho xe</h3>
                        <div className="pull-right">
                            <Link className="view_more" to={"/phu-kien"}>Xem tất cả <i className="fa fa-chevron-right" /> </Link>
                        </div>
                    </div>
                    <div >
                        {listAccesories && listAccesories.length > 0 && 
                        <OwlCarousel id="product_list"  options={options} >
                            {listAccesories && listAccesories.map((item, index) => {
                                return (
                                    <div key={item["id"]} className="item">
                                        <img src={item["imgUrl"]} className="img-responsive" />
                                        <div className="name">{item["name"]}</div>
                                        <div className="price">{PriceUtils.toThousand(item["price"])}</div>
                                        <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                                        <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                                    </div>
                                )
                            })}

                        </OwlCarousel>
                        }
                    </div>
                    <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
                </div></div>
            </div >
        )
    }
}

export default AccessoriesList
