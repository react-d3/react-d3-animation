"use strict";

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {
  Xaxis,
  Yaxis,
  Xgrid,
  Ygrid,
  Legend
} from 'react-d3-core';

import {
  Bar,
  Chart
} from 'react-d3-shape';

import {Animation} from '../../src'

const data = require('../data/app.json')
const data2 = require('../data/app2.json')
const chartSeries = [
  {
    field: 'cnt',
    name: 'Count',
    style: {
      'fillOpacity': .5,
      'fill': 'green'
    }
  }
]

const chartSeries2 = [
  {
    field: 'cnt',
    name: 'Count',
    style: {
      'fillOpacity': .5,
      'fill': 'pink'
    }
  }
]

// Example
export default class BarAnimate extends Component {
  
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
    this.mouseOver = this.mouseOver.bind(this)
    this.mouseOut = this.mouseOut.bind(this)

    this.state = {
      data: data2,
      chartSeries: chartSeries2,
      position: 2
    }
  }

  onClick() {

    if(this.state.position === 1) {
      this.setState({
        data: data2,
        chartSeries: chartSeries2,
        position: 2
      })
    }else {
      this.setState({
        data: data,
        chartSeries: chartSeries,
        position: 1
      })
    }
  }

  mouseOver(e, d) {
    console.log(e, d)
    ReactDOM.findDOMNode(e.currentTarget).setAttribute('stroke', 'red')
  }

  mouseOut(e, d) {
    console.log(e, d)
    ReactDOM.findDOMNode(e.currentTarget).setAttribute('stroke', 'none')
  }

  render() {

    var x = function(d) {
      return d.OS;
    },
    xScale = 'ordinal',
    y = function(d) {
      return +d;
    }

    return (
      <div>
        <button onClick={this.onClick}>toggle</button>
        <Animation
          data= {this.state.data}
          chartSeries= {this.state.chartSeries}
          >
          {(state) => {
            return(
              <Chart
                x= {x}
                xScale= {xScale}
                y= {y}
                width= {500}
                height= {300}
                data= {state.data}
                chartSeries= {state.chartSeries}
                >
                <Bar
                  chartSeries= {state.chartSeries}
                  onMouseOver= {this.mouseOver}
                  onMouseOut= {this.mouseOut}
                />
                <Xaxis/>
                <Yaxis/>
              </Chart>
            )
          }}
        </Animation>
      </div>
    )
  }
}
