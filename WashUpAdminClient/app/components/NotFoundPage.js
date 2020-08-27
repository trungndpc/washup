import React from 'react'
import { Link } from 'react-router-dom'

class NotFoundPage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h4 style={{textAlign: 'center', padding: '50px'}}>404 Page Not Found</h4>
      </div>
    )
  }
}

export default NotFoundPage
