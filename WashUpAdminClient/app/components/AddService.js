import React, { Component } from 'react'
import TimeUtils from '../utils/TimeUtils'

class AddService extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tabServiceId: 1,
            tabScheduleId: 1,
            listServiceId : this.props.listCurrentServices,
            timeSchedule: this.props.timeSchedule
        }
        this.onClickTabService = this.onClickTabService.bind(this)
        this.onChangeTabSchedule = this.onChangeTabSchedule.bind(this)
        this.onChangeService = this.onChangeService.bind(this)
        this.onChangeTimeSchedule = this.onChangeTimeSchedule.bind(this)
        this.getValueUpdate = this.getValueUpdate.bind(this)
    }

    componentDidMount() {
        this.props.appActions.getServices(this.props.transportId, this.state.tabServiceId);
        this.props.appActions.getSchedule();
    }


    onClickTabService(id) {
        this.setState({ tabServiceId: id })
        this.props.appActions.getServices(this.props.transportId, id);
    }

    onChangeTabSchedule(id) {
        this.setState({tabScheduleId: id})
    }

    getValueUpdate() {
        return {
            "fullName" : this.fullNameInputRef.value,
            "address" : this.addressInputRef.value,
            "serviceIds" : this.state.listServiceId,
            "timeSchedule" : this.state.timeSchedule
        }
    }

    removeElement(array, elem) {
        var index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    }

    onChangeService(id) {
        if (this.state.listServiceId.indexOf(id) >= 0) {
            let tmpServiceIds= [...this.state.listServiceId];
            tmpServiceIds = this.removeElement(tmpServiceIds, id);
            this.setState({listServiceId: tmpServiceIds});
        }else{
            let tmpServiceIds= [...this.state.listServiceId];
            tmpServiceIds.push(id);
            this.setState({listServiceId: tmpServiceIds});
        }
    }

    onChangeTimeSchedule(time) {
        this.setState({timeSchedule: time})
    }


    render() {

        const services = this.props.app.services;
        const booking = this.props.app.booking && this.props.app.booking;
        const schedules = this.props.app.schedules && this.props.app.schedules[this.state.tabScheduleId]
        return (
            <div>
                <div className="row" style={{ marginBottom: '30px' }}>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-element-list mg-t-30">
                            <div className="cmp-tb-hd">
                                <h2>Thông tin cơ bản</h2>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group ic-cmp-int">
                                        <div className="form-ic-cmp">
                                            <i className="notika-icon notika-wifi" />
                                        </div>
                                        <div className="nk-int-st">
                                            <input type="text" ref={e => this.fullNameInputRef = e} defaultValue={booking["fullName"]} className="form-control input-sm"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group ic-cmp-int">
                                        <div className="form-ic-cmp">
                                            <i className="notika-icon notika-wifi" />
                                        </div>
                                        <div className="nk-int-st">
                                            <input type="text" ref={e => this.addressInputRef = e} defaultValue={booking["pickUpAddress"]} className="form-control input-sm"  />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="widget-tabs-int">
                            <div className="tab-hd">
                                <h2>Dịch vụ</h2>
                            </div>
                            <div className="widget-tabs-list">
                                <ul className="nav nav-tabs">
                                    <li className={this.state.tabServiceId == 1 ? "active" : ""}><a onClick={() => this.onClickTabService(1)} data-toggle="tab" href="#home">Vệ sinh cơ bản</a></li>
                                    <li className={this.state.tabServiceId == 3 ? "active" : ""}><a onClick={() => this.onClickTabService(3)} data-toggle="tab" href="#menu1">Làm đẹp</a></li>
                                    <li className={this.state.tabServiceId == 2 ? "active" : ""}><a onClick={() => this.onClickTabService(2)} data-toggle="tab" href="#menu2">Bảo dưởng nhanh</a></li>
                                </ul>
                                <div className="tab-content tab-custom-st">
                                    <div id="home" className="tab-pane fade in active">
                                        <div className="tab-ctn">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th></th>
                                                        <th>Tên dịch vụ</th>
                                                        <th>Giá </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {services && services.map((item, index) => {
                                                        var isCheked = this.state.listServiceId.indexOf(item["id"]) >= 0;
                                                        return (
                                                            <tr key={item["key"]}>
                                                                <td>{index + 1}</td>
                                                                <td><input onChange={(event => {this.onChangeService(item["id"])})} checked={isCheked} type="checkbox" /></td>
                                                                <td>{item["name"]}</td>
                                                                <td>{item["price"]}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="widget-tabs-int">
                            <div className="tab-hd">
                                <h2>Lịch</h2>
                            </div>
                            <div className="widget-tabs-list">
                                <ul className="nav nav-tabs">
                                    <li className={this.state.tabScheduleId == 1 ? "active" : ""}><a onClick={() => this.onChangeTabSchedule(1)}  href="#hn">Hôm nay</a></li>
                                    <li className={this.state.tabScheduleId == 2 ? "active" : ""}><a onClick={() => this.onChangeTabSchedule(2)}  href="#nm">Ngày mai</a></li>
                                    <li className={this.state.tabScheduleId == 3 ? "active" : ""}><a onClick={() => this.onChangeTabSchedule(3)}  href="#nk">Ngày kia</a></li>
                                </ul>
                                <div className="tab-content tab-custom-st">
                                    <div id="home" className="tab-pane fade in active">
                                        <div className="tab-ctn">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th></th>
                                                        <th>Thời gian</th>
                                                        <th>Trạng thái</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {schedules && schedules.map((item, index) => {
                                                        const isCheked = this.state.timeSchedule == item["time"];
                                                        return (
                                                            <tr key={item["key"]}>
                                                                <td>{index + 1}</td>
                                                                <td><input checked={isCheked} onChange={() => this.onChangeTimeSchedule(item["time"])} type="radio" name="schedule"/></td>
                                                                <td>{TimeUtils.timeSchedule(item["time"])}</td>
                                                                <td>{item["status"] == 1 ? "Còn Trống" : "Đã đầy"}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default AddService