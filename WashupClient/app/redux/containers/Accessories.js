import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PriceUtils from '../../utils/PriceUtils';


class Accessories extends React.Component {
    constructor(props) {
        super(props)

    }

    componentWillMount() {
        this.props.appActions.getAccessories();
    }

    componentDidMount() {
    }


    render() {
        const listAccessories = this.props.app.accessories ? this.props.app.accessories : [];
        return (
            <div>
                <Header />
                <div id="product-banner"></div>
                <div id="product-wrapper">
                    <div className="container"><div className="row">
                        <div className="product-inner row">
                            <div className="col-md-3 col-sm-3 col-xs-12 colleft">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#menu-catalog">
                                    <i className="fa fa-bars" /> DANH MỤC
                                </button>
                                <div id="menu-catalog" className="navbar collapse navbar-collapse">
                                    <div className="module menu_catalog">
                                        <div className="main-title"><span>Loại sản phẩm</span></div>
                                        <ul><li><a href="#">Nhớt</a>
                                            <ul><li><a href="#">Xe máy</a></li>
                                                <li><a href="#">Xe ô tô</a></li>
                                            </ul>
                                        </li>
                                            <li><a href="#">Chăm sóc xe</a>
                                                <ul><li><a href="#">Chăm sóc ngoại thất</a></li>
                                                    <li><a href="#">Chăn sóc nội thất</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="#">Phụ kiện</a>
                                                <ul><li><a href="#">Phụ kiên ngoại thất</a></li>
                                                    <li><a href="#">Phụ kiện nội thất</a></li>
                                                    <li><a href="#">Phụ kiện khác</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="#">Phụ gia</a></li>
                                        </ul>
                                    </div>
                                    <div clas="module menu_branch">
                                        <div className="main-title"><span>Thương hiệu</span></div>
                                        <ul><li><label><input type="checkbox" name="chk_branch[]" defaultValue={1} /> Castrol</label></li>
                                            <li><label><input type="checkbox" name="chk_branch[]" defaultValue={1} /> Motul</label></li>
                                            <li><label><input type="checkbox" name="chk_branch[]" defaultValue={1} /> Liqui Moly</label></li>
                                            <li><label><input type="checkbox" name="chk_branch[]" defaultValue={1} /> 3M</label></li>
                                            <li><label><input type="checkbox" name="chk_branch[]" defaultValue={1} /> Sonax</label></li>
                                        </ul>
                                    </div>
                                    <div clas="module menu_typecar">
                                        <div className="main-title"><span>Chủng loại xe</span></div>
                                        <ul><li><label><input type="checkbox" name="chk_typecar[]" defaultValue={1} /> Xe số</label></li>
                                            <li><label><input type="checkbox" name="chk_typecar[]" defaultValue={1} /> Xe ga</label></li>
                                            <li><label><input type="checkbox" name="chk_typecar[]" defaultValue={1} /> Ô tô 4 chỗ</label></li>
                                            <li><label><input type="checkbox" name="chk_typecar[]" defaultValue={1} /> Ô tô 7 chỗ</label></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9 col-sm-9 col-xs-12 colright">
                                <ul className="catalog_list hidden-xs">
                                    <li><a href="#" className="active">Phụ kiện</a></li>
                                    <li><a href="#">Lốp xe</a></li>
                                </ul>
                                <div className="box_filter">
                                    <div className="main-title pull-left">Tất cả sản phẩm</div>
                                    <div className="pull-right filter">
                                        <div className="choose pull-right">
                                            <div className="grid active"><i className="fa fa-th" /></div>
                                            <div className="list"><i className="fa fa-list" /></div>
                                        </div>
                                        <select name="order_filter" className="form-control pull-right">
                                            <option value>Sắp xếp theo</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="products_grid">
                                    <div className="shadow">&nbsp;</div>
                                    {listAccessories && listAccessories.slice(0, 9).map((item, index) => {
                                        return (
                                            <div className="item col-md-4 col-sm-6 col-xs-12">
                                                <img src={item["imgUrl"]} className="img-responsive" />
                                                <div className="name">{item["name"]}</div>
                                                <div className="price">{PriceUtils.toThousand(item["price"])}</div>
                                                <a href="#" className="btn read_more"><i className="fa icon_info" /> Xem chi tiết</a>
                                                <div className="btn btn-primary btn_buy"><i className="fa fa-cart-plus" /> Mua ngay</div>
                                            </div>
                                        )
                                    })}


                                </div>
                                <nav aria-label="Page navigation" className="text-center">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true"><i className="fa fa-chevron-left" /></span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                        </li>
                                        <li className="page-item cur_page"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#">4</a></li>
                                        <li className="page-item"><a className="page-link" href="#">5</a></li>
                                        <li className="page-item"><a className="page-link" href="#">6</a></li>
                                        <li className="page-item"><a className="page-link" href="#">7</a></li>
                                        <li className="page-item"><a className="page-link" href="#">8</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true"><i className="fa fa-chevron-right" /></span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
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
)(Accessories)
