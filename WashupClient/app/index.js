/* eslint-disable import/default */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import configureStore from './redux/store/configure-store'
import App from './redux/containers/App'
import { BrowserRouter } from 'react-router-dom'

  
import './resources/css/bootstrap.min.css';
import './resources/css/font-awesome.css'
import './resources/owl-carousel/owl.carousel.min.css'
import './resources/owl-carousel/owl.theme.default.min.css'
import './resources/css/swiper-bundle.min.css'
import './resources/css/style.css'
import './resources/css/style.responsive.css'
import './resources/css/modal.css'

import './resources/js/jquery-1.11.2.min.js'
import './resources/js/jquery-ui.js'
import './resources/js/bootstrap.min.js'
import './resources/owl-carousel/owl.carousel.js'
import './resources/js/swiper-bundle.min.js'
import './resources/js/main.js'





const store = configureStore()

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('washupclient')
)
