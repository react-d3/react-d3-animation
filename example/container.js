import React, { Component } from 'react'
import {Nav, NavItem} from 'react-bootstrap'

export default class ContainerExample extends Component {
	constructor(props) {
		super(props)
	}

	render() {

		const route = this.props.routes[1].path || 'container'

		return (
			<div>
				<nav className="navbar navbar-default navbar-fixed-top">
				  <div className="container">
				    <div className="navbar-header">
				      <a className="navbar-brand" href="/example">
				        React-d3 animate
				      </a>
				    </div>
				  </div>
				</nav>
				<div style={{marginTop: '50px', padding: '30px'}}>
					<Nav bsStyle="pills" justified activeKey={route}>
	          <NavItem eventKey="animate" href="/example/animate">Animate</NavItem>
	          <NavItem eventKey="line" href="/example/line">Line</NavItem>
	          <NavItem eventKey="bar" href="/example/bar">Bar</NavItem>
	          <NavItem eventKey="pie" href="/example/pie">Pie</NavItem>
	        </Nav>
	      </div>
				{this.props.children}
			</div>
		)
	}
}