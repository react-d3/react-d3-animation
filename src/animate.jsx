import {
  defualt as React,
  PropTypes,
  Component
}from 'react';

import _ from 'lodash';
import d3 from 'd3';
import D3Timer from 'd3-timer'

export default class Animation extends Component {
  constructor(props) {
    super(props);

    this.state = this.props;
  }

  static defaultProps = {
    ease: 'circle',
    duration: 250,
    delay: 0,
    fps: 60
  }

  static propTypes = {
    ease: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    delay: PropTypes.number.isRequired,
    fps: PropTypes.number.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const {
      ease,
      duration,
      fps,
      delay
    } = this.props;

    var that = this;

    if(that.animateTimeout) that.animateTimeout.stop();
    if(that.animateInterval) that.animateInterval.stop();

    var frame = 0;
    var time = fps * duration / 1000;
    var updateState = this.updateState.bind(this);
    var filter = _.omit(this.state, ['ease', 'duration', 'fps', 'delay']);

    d3.interpolators.push((a, b) => { d3.ease(ease); });

    // register interpolate
    this.interpolate = {};
    _.forIn(filter, function(val, key) {
      if(_.isObject(val) || _.isNumber(val) || _.isString(val) || _.isArray(val))
        that.interpolate[key] = d3.interpolate(that.state[key], nextProps[key])
    })

    this.animateTimeout = D3Timer.timeout(() => {
      that.animateInterval = D3Timer.interval(() => {
        frame++;

        var newState = {};
        _.forIn(filter, function(val, key) {
          if(_.isObject(val) || _.isNumber(val) || _.isString(val) || _.isArray(val))
            newState[key] = that.interpolate[key](frame / time)
        })

        updateState(newState);

        if(frame >= time) that.animateInterval.stop();

      }, 1000 / time)
    }, delay)
  }

  updateState(props) {
    this.setState(props);
  }

  render() {
    return this.props.children(this.state);
  }
}
