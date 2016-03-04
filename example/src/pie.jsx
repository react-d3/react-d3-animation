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
  PieChart
} from 'react-d3-basic';

import {Animation} from '../../src'

const data = require('../data/app.json')
const data2 = require('../data/app2.json')
const chartSeries = [
  {
    "field": "Windows",
    "name": "Windows",
    "style": {
      "fill-opacity": .2
    }
  },
  {
    "field": "Mac OS",
    "name": "Mac OS",
    style: {
      "fill-opacity": .5
    }
  },
  {
    "field": "Android",
    "name": "Android"
  }
]

const chartSeries2 = [
  {
    "field": "Windows",
    "name": "Windows",
    "style": {
      "fill-opacity": .2
    }
  },
  {
    "field": "Mac OS",
    "name": "Mac OS",
    style: {
      "fill-opacity": .5
    }
  },
  {
    "field": "Android",
    "name": "Android"
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

    var name = function(d) {
      return d.OS;
    },
    value = function(d) {
      return +d.cnt;
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
              <PieChart
                width= {500}
                height= {500}
                data= {state.data}
                chartSeries= {state.chartSeries}
                value = {value}
                name = {name}
              />
            )
          }}
        </Animation>
      </div>
    )
  }
}
