"use strict";

var React = require('react');
var ReactDOM = require('react-dom');

var Animation = require('../../lib/index').Animation;
var LineChart = require('react-d3-basic').LineChart;

(function() {

  var data1 = require('../data/user.json');
  var data2 = require('../data/user2.json')
  var chartSeries = [
      {
        field: 'age',
        name: 'Age',
        color: '#ff7f0e',
        style: {
          "stroke-width": 2,
          "stroke-opacity": .2,
          "fill-opacity": .2
        }
      }
    ],
    x = function(d) {
      return d.index;
    }

  var Container = React.createClass({
    getInitialState: function() {
      return {
        width: 600,
        height: 400,
        series: chartSeries,
        data: data1
      }
    },
    onClick: function() {
      this.setState({
        width: this.state.width === 600? 400: 600,
        height: this.state.width === 600? 600: 400,
        series: this.state.width === 600? [{
          field: 'age',
          name: 'Age',
          color: 'green',
          style: {
            "stroke-width": 5,
            "stroke-opacity": 1,
            "fill-opacity": .2
          }
        }]: chartSeries,
        data: this.state.width === 600? data2: data1
      })
    },
    render: function() {
      return (
        <div>
          <button onClick={this.onClick}>toggle</button>
          <Animation
            width= {this.state.width}
            height= {this.state.height}
            chartSeries= {this.state.series}
            data= {this.state.data}
            x= {x}
            delay= {1000}
          >
            {function(state) {
              return (
                <LineChart
                  width= {state.width}
                  height= {state.height}
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

  ReactDOM.render(
    <Container/>
  , document.getElementById('blank-line')
  )
})()
