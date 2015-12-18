import {
  defualt as React,
  Component
}from 'react';

import _ from 'lodash';
import d3 from 'd3';

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

  componentWillReceiveProps(nextProps) {
    const {
      ease,
      duration,
      fps,
      delay
    } = this.props;

    var that = this;

    if(that.animateTimeout) clearTimeout(that.animateTimeout);
    if(that.animateInterval) clearInterval(that.animateInterval);

    var frame = 0;
    var time = fps * duration / 1000;
    var updateState = this.updateState.bind(this);
    var filter = _.omit(this.state, ['ease', 'duration', 'fps', 'delay']);

    d3.interpolators.push((a, b) => { d3.ease(ease); });

    // register interpolate
    this.interpolate = {};
    _.forIn(filter, function(val, key) {
      that.interpolate[key] = d3.interpolate(that.state[key], nextProps[key])
    })

    this.animateTimeout = setTimeout(() => {
      that.animateInterval = setInterval(() => {
        frame++;

        var newState = {};
        _.forIn(filter, function(val, key) {
          newState[key] = that.interpolate[key](frame / time)
        })

        updateState(newState);

        if(frame >= time) clearInterval(that.animateInterval);

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
