"use strict";

var React = require('react');
var ReactDOM = require('react-dom');

var Animation = require('../../src/index').Animation;
var LineChart = require('react-d3-basic').LineChart;

var data1 = require('../data/user.json');
var data2 = require('../data/user2.json')
var chartSeries = [
  {
    field: 'age',
    name: 'Age',
    color: '#ff7f0e',
    style: {
      "strokeWidth": 2,
      "strokeOpacity": .2,
      "fillOpacity": .2
    }
  }
]
var chartSeries2 = [
  {
    field: 'age',
    name: 'Age',
    color: 'green',
    style: {
      "strokeWidth": 5,
      "strokeOpacity": 1,
      "fillOpacity": .2
    }
  }
]
,
x = function(d) {
  return d.index;
}

module.exports = React.createClass({
  getInitialState: function() {
    return {
      chartSeries: chartSeries,
      data: data1,
      position: 1
    }
  },
  onClick: function() {
    if(this.state.position === 1) {
      this.setState({
        data: data2,
        chartSeries: chartSeries2,
        position: 2
      })
    }else {
      this.setState({
        data: data1,
        chartSeries: chartSeries,
        position: 1
      })
    }
  },
  render: function() {
    return (
      <div>
        <button onClick={this.onClick}>toggle</button>
        <Animation
          chartSeries= {this.state.chartSeries}
          data= {this.state.data}
          x= {x}
        >
          {function(state) {
            return (
              <LineChart
                width= {500}
                height= {500}
                data= {state.data}
                chartSeries= {state.chartSeries}
                x= {x}
              />
            )
          }}
        </Animation>
      </div>
    )
  }
})