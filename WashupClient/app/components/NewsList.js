import React, { Component } from 'react'
import OwlCarousel from 'react-owl-carousel2';


class NewsList extends Component {

    render() {
        const options = {
            items: 1,
            loop: false,
            margin: 30,
            responsiveClass: true,
            responsive: {
                0: { items: 1, },
                600: { items: 3 },
                1000: { items: 3, loop: false }
            }
        };
        return (
            <div id="site-news">
                <div className="container"><div className="row">
                    <div className="panel_header pd-lr20">
                        <h3 className="title col-md-5 pull-left">Kinh nghiệm chăm sóc xe</h3>
                        {/* <div className="col-md-7 text-right">
                            <div className="row">
                                <a href="#" className="view_more">Xem tất cả <i className="fa fa-chevron-right" /></a>
                            </div>
                        </div> */}
                        <div className="clearfix" />
                    </div>
                    <div className="clearfix" />
                    <div className="panel_body ls_news">
                        <OwlCarousel  options={options} >

                            <div className="item">
                                <div className="inner news">
                                    <div className="img" style={{ backgroundImage: "url(" + require('../resources/images/news/hanh-dong-ton-hai-xe-cung.jpg') + ")" }} />
                                    <div className="content">
                                        <h2 className="title">Điểm danh những hành động gây tổn hại đến xế cưng</h2>
                                        <div className="form-group intro">
                                            Ngược đãi #1: Chạy Chậm Cũng Là Một Cái Tội.Chạy quá nhanh ngoài việc nguy hiểm cho mình cho người còn đối diện với nguy cơ bị các chú CA...</div>
                                        <div className>
                                            <a className="readmore" href="#">Xem chi tiết <i className="fa fa-chevron-right" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="inner news">
                                    <div className="img" style={{ backgroundImage: "url(" + require('../resources/images/news/5-dieu-nhat-dinh-phai-lam.jpg') + ")" }} />
                                    <div className="content">
                                        <h2 className="title">5 điều nhất định phải làm để  xe bạn luôn đẹp</h2>
                                        <div className="form-group intro">
                                            Xe máy không chỉ là phương tiện đi lại mà còn là người bạn đồng hành cùng bạn trên mọi nẻo đường, là một phần vẻ ngoài của bạn.  </div>
                                        <div className>
                                            <a className="readmore" href>Xem chi tiết <i className="fa fa-chevron-right" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="inner news">
                                    <div className="img" style={{ backgroundImage: "url(" + require('../resources/images/news/vai-loi-khuyen-ngay-mua-bao.jpg') + ")" }} />
                                    <div className="content">
                                        <h2 className="title">Một vài lời khuyên khi đi xe máy trong ngày mưa bão</h2>
                                        <div className="form-group intro">
                                            Mùa mưa bão mang đến rất nhiều rủi ro cho người sử dụng xe máy, đặc biệt là phụ nữ vì tay lái yếu. Vì vậy khi chạy xe tron...</div>
                                        <div className>
                                            <a className="readmore" href>Xem chi tiết <i className="fa fa-chevron-right" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div>
                </div></div>
            </div>
        )
    }
}

export default NewsList
