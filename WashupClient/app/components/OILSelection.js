import React, { Component } from 'react'
import { OIL_BRAND } from '../constants/Constants'
import Select from 'react-select'
import PriceUtils from '../utils/PriceUtils'


class OILSelection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            brandOptions: null,
            oilOptions: null,
            selectedBrandOption: null,
            selectedOilOption: null
        }
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeOil = this.onChangeOil.bind(this);
        this.getOilOptions = this.getOilOptions.bind(this);
        this.getBrandOptions = this.getBrandOptions.bind(this);
        this.getValue = this.getValue.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps != this.props || nextState.selectedBrandOption != this.state.selectedBrandOption) {
            if (nextProps.oils || this.props.oils) {
                nextState.brandOptions = this.getBrandOptions(nextProps.oils);
                if (!nextState.selectedBrandOption && nextState.brandOptions) {
                    nextState.selectedBrandOption = nextState.brandOptions[0];
                }

                if (nextState.selectedBrandOption) {
                    nextState.oilOptions = this.getOilOptions(nextState.selectedBrandOption.value, nextProps.oils)
                    if ((!nextState.selectedOilOption || nextState.selectedBrandOption != this.state.selectedBrandOption ) 
                        && nextState.oilOptions) {
                        nextState.selectedOilOption = nextState.oilOptions[0]
                    }
                }
            }


        }
        return true;
    }



    getBrandOptions(oils) {
        let mapOIL = new Map();
        oils.forEach(oil => {
            mapOIL.set(oil.manufacturer, true);
        });

        let optionsBrandOils = [];
        for (const key in OIL_BRAND) {
            if (mapOIL.has(OIL_BRAND[key])) {
                optionsBrandOils.push({ value: OIL_BRAND[key], label: key })
            }
        }
        return optionsBrandOils;
    }

    getOilOptions(brandId, oils) {
        let options = [];
        for (const key in oils) {
            const oil = oils[key];
            if (oil.manufacturer == brandId) {
            options.push({ value: oil.id, label: <span>{oil["name"]} - <span style={{ color: 'red' }}> {PriceUtils.toThousand(oil["price"])} </span></span> });
            }
        }
        return options;
    }

    onChangeBrand(option) {
        this.setState({ selectedBrandOption: option })
    }

    onChangeOil(option) {
        this.setState({ selectedOilOption: option })
    }

    getValue() {
        return this.state.selectedOilOption.value;
    }


    render() {

        return (
            <div className="item">
                <div className="form-group row">
                    <div className="col-md-3 text-left">{this.props.children}</div>
                    <div className="colo col-md-3">
                        {this.state.brandOptions &&
                            <Select value={this.state.selectedBrandOption} onChange={this.onChangeBrand} options={this.state.brandOptions} />
                        }
                    </div>
                    <div className="colo col-md-6">
                        {this.state.oilOptions &&
                            <Select value={this.state.selectedOilOption} onChange={this.onChangeOil} options={this.state.oilOptions} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default OILSelection
