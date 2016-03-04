import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRedirect} from 'react-router'
import Container from './container'

import Animate from './src/animate'
import Line from './src/line'
import Bar from './src/bar'
import Pie from './src/pie'

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
        

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/example" component={Container}>
      <IndexRedirect to="animate"/>
    	<Route path="animate" component={Animate}/>
      <Route path="line" component={Line}/>
      <Route path="bar" component={Bar}/>
      <Route path="pie" component={Pie}/>
    </Route>
  </Router>
), document.getElementById('root'))