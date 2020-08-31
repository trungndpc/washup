import React, { Component } from 'react'
import PriceUtils from '../utils/PriceUtils'

class AccessoriesList extends Component {

    componentWillMount() {
        this.props.appActions.getAccessoriesTop();
    }

    render() {
        const listAccesories = this.props.app.topAccessories;
        console.log(listAccesories)
        return (
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
                            <div className="swiper-wrapper" style={{ transform: 'translate3d(-1190px, 0px, 0px)', transition: 'all 0ms ease 0s' }}>
                                {listAccesories && listAccesories.map((item, index) => {
                                    return (
                                        <div key={item["id"]} className="item swiper-slide swiper-slide-duplicate" data-swiper-slide-index={2} style={{ width: '178.333px', marginRight: '20px' }}>
                                            <img src={item["imgUrl"]} className="img-responsive" />
                                                <div className="name">{item["name"]}</div>
                                                <div className="price">{PriceUtils.toThousand(item["price"])}</div>
                                            <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                                            <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                                        </div>
                                    )
                                })}

                            </div>
                            {/* Add Pagination */}
                            {/* <div className="swiper-pagination" /> */}
                            {/* Add Arrows */}
                            {/* <div className="swiper-button-next" tabIndex={0} role="button" aria-label="Next slide" />
                            <div className="swiper-button-prev" tabIndex={0} role="button" aria-label="Previous slide" /> */}
                            <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
                        </div>
                    </div>
                </div></div>
            </div>
        )
    }
}

export default AccessoriesList
