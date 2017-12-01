import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'domkit/appendVendorPrefix';
import insertKeyframesRule from 'domkit/insertKeyframesRule';

const rightRotateKeyframes = {
  '0%': {
    transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
  },
  '100%': {
    transform: 'rotateX(180deg) rotateY(360deg) rotateZ(360deg)'
  }
};

const leftRotateKeyframes = {
  '0%': {
    transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
  },
  '100%': {
    transform: 'rotateX(360deg) rotateY(180deg) rotateZ(360deg)'
  }
};

const rightRotateAnimationName = insertKeyframesRule(rightRotateKeyframes);

const leftRotateAnimationName = insertKeyframesRule(leftRotateKeyframes);

class Loader extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.getCircleStyle = size => {
      return {
        width: size,
        height: size,
        border: size / 10 + 'px solid ' + this.props.color,
        opacity: 0.4,
        borderRadius: '100%',
        verticalAlign: this.props.verticalAlign
      };
    }, this.getAnimationStyle = i => {
      const animation = [i === 1 ? rightRotateAnimationName : leftRotateAnimationName, '2s', '0s', 'infinite', 'linear'].join(' ');
      const animationFillMode = 'forwards';
      const perspective = '800px';

      return {
        perspective: perspective,
        animation: animation,
        animationFillMode: animationFillMode
      };
    }, this.getStyle = i => {
      const size = parseInt(this.props.size);

      if (i) {
        return assign(this.getCircleStyle(size), this.getAnimationStyle(i), {
          position: 'absolute',
          top: 0,
          left: 0
        });
      }

      return {
        width: size,
        height: size,
        position: 'relative'
      };
    }, _temp;
  }

  render() {
    if (this.props.loading) {
      return React.createElement(
        'div',
        { id: this.props.id, className: this.props.className },
        React.createElement(
          'div',
          { style: this.getStyle(0) },
          React.createElement('div', { style: this.getStyle(1) }),
          React.createElement('div', { style: this.getStyle(2) })
        )
      );
    }

    return null;
  }
}

Loader.propTypes = {
  loading: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.string,
  margin: PropTypes.string
};
Loader.defaultProps = {
  loading: true,
  color: '#ffffff',
  size: '60px'
};
export default Loader;

