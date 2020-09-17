/* eslint-disable import/default */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import configureStore from './redux/store/configure-store'
import App from './redux/containers/App'
import { BrowserRouter } from 'react-router-dom'

import 'antd/dist/antd.css'
import './resources/css/bootstrap.min.css'
import './resources/css/font-awesome.min.css'
import './resources/css/meanmenu.min.css'
import './resources/css/owl.carousel.css'
import './resources/css/owl.theme.css'
import './resources/css/owl.transitions.css'
import './resources/css/animate.css'
import './resources/css/normalize.css'
import './resources/css/main.css'
import './resources/css/style.css'
import './resources/css/waves.min.css'
import './resources/css/notika-custom-icon.css'
import './resources/css/button.css'
import './resources/css/mstyle.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './resources/css/responsive.css'

import './resources/js/jquery-1.12.4.min.js'
import './resources/js/jquery.meanmenu.js'
import './resources/js/autosize.min.js'
import './resources/js/bootstrap.min'
import './resources/js/main.js'


const store = configureStore()

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('washupadminclient')
)
