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
          <div style={{textAlign: 'center', fontSize: '40px', fontWeight: '600', padding: '60px'}}>Coming soon...</div>
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
