import React from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import PriceUtils from '../../utils/PriceUtils'


class SelectOil extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.appActions.getOil();
    }

    getValue() {
        return this.oilRef.select 
            && this.oilRef.select.state 
            && this.oilRef.select.state.selectValue[0] 
            && this.oilRef.select.state.selectValue[0].value
            && this.oilRef.select.state.selectValue[0].value.id;
    }

    render() {
        const all = this.props.app.oils;
        const oilAfterFilter = all && all.filter((item) => item.serviceIds.indexOf(this.props.serviceId) >= 0);
        var oilOptions = [];
        oilAfterFilter && oilAfterFilter.forEach(item => {
            oilOptions.push({ value: item, label: item["name"] + " - " + PriceUtils.toThousand(item["price"])})
        });
        return (
            <div className="row">
                <div className="col-md-2 title">{this.props.children}</div>
                <div className="col-md-9">
                    <Select ref={e => this.oilRef = e}  options={oilOptions} />
                </div>
            </div>
        )
    }
}

export default SelectOil
