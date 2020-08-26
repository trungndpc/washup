import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
  }



  render() {
    //DEBUG
    if (process.env.NODE_ENV === 'development') {
      console.log('Render: ', 'ListItem')
    }

    return (
      <div>
        <div className="notika-status-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="wb-traffic-inner notika-shadow sm-res-mg-t-30 tb-res-mg-t-30">
                  <div className="website-traffic-ctn">
                    <h2><span className="counter">50,000</span></h2>
                    <p>Total Website Traffics</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="wb-traffic-inner notika-shadow sm-res-mg-t-30 tb-res-mg-t-30">
                  <div className="website-traffic-ctn">
                    <h2><span className="counter">90,000</span>k</h2>
                    <p>Website Impressions</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="wb-traffic-inner notika-shadow sm-res-mg-t-30 tb-res-mg-t-30 dk-res-mg-t-30">
                  <div className="website-traffic-ctn">
                    <h2>$<span className="counter">40,000</span></h2>
                    <p>Total Online Sales</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="wb-traffic-inner notika-shadow sm-res-mg-t-30 tb-res-mg-t-30 dk-res-mg-t-30">
                  <div className="website-traffic-ctn">
                    <h2><span className="counter">1,000</span></h2>
                    <p>Total Support Tickets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sale-statistic-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-md-8 col-sm-7 col-xs-12">
                <div className="sale-statistic-inner notika-shadow mg-tb-30">
                  <div className="curved-inner-pro">
                    <div className="curved-ctn">
                      <h2>Sales Statistics</h2>
                      <p>Vestibulum purus quam scelerisque, mollis nonummy metus</p>
                    </div>
                  </div>
                  <div id="curved-line-chart" className="flot-chart-sts flot-chart" />
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-5 col-xs-12">
                <div className="statistic-right-area notika-shadow mg-tb-30 sm-res-mg-t-0">
                  <div className="past-day-statis">
                    <h2>For The Past 30 Days</h2>
                    <p>Fusce eget dolor id justo luctus the commodo vel pharetra nisi. Donec velit of libero.</p>
                  </div>
                  <div className="dash-widget-visits" />
                  <div className="past-statistic-an">
                    <div className="past-statistic-ctn">
                      <h3><span className="counter">3,20,000</span></h3>
                      <p>Page Views</p>
                    </div>
                    <div className="past-statistic-graph">
                      <div className="stats-bar" />
                    </div>
                  </div>
                  <div className="past-statistic-an">
                    <div className="past-statistic-ctn">
                      <h3><span className="counter">1,03,000</span></h3>
                      <p>Total Clicks</p>
                    </div>
                    <div className="past-statistic-graph">
                      <div className="stats-line" />
                    </div>
                  </div>
                  <div className="past-statistic-an">
                    <div className="past-statistic-ctn">
                      <h3><span className="counter">24,00,000</span></h3>
                      <p>Site Visitors</p>
                    </div>
                    <div className="past-statistic-graph">
                      <div className="stats-bar-2" />
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
)(Dashboard)
