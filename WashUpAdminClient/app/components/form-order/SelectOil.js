import React from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'


class SelectOil extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.appActions.getOil();
    }

    render() {
        const oilInfo = this.props.data;
        console.log(oilInfo)
        const all = this.props.app.oils;
        const brandSeriesId = this.props.brandSeriesId;
        console.log(brandSeriesId)
        const oilAfterFilter = all && all.filter((item) => item.brandSeries.id == brandSeriesId && item.type == oilInfo.type);
        var oilOptions = [];
        oilAfterFilter && oilAfterFilter.forEach(item => {
            oilOptions.push({ value: item, label: item["name"] + " - " + item["currentPrice"]})
        });
        return (
            <div className="row">
                <div className="col-md-2 title">{this.props.children}</div>
                <div className="col-md-9">
                    <Select  options={oilOptions} />
                </div>
            </div>
        )
    }
}

export default SelectOil
