import React from 'react'
import ReactDOM from 'react-dom'
import Home from './Home.js'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
ReactDOM.render(<Home />,
  document.getElementById('root'))
registerServiceWorker()
