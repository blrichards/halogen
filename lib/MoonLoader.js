import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'domkit/appendVendorPrefix';
import insertKeyframesRule from 'domkit/insertKeyframesRule';

const keyframes = {
  '100%': {
    transform: 'rotate(360deg)'
  }
};

const animationName = insertKeyframesRule(keyframes);

class Loader extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.getBallStyle = size => {
      return {
        width: size,
        height: size,
        borderRadius: '100%',
        verticalAlign: this.props.verticalAlign
      };
    }, this.getAnimationStyle = () => {
      const animation = [animationName, '0.6s', '0s', 'infinite', 'linear'].join(' ');
      const animationFillMode = 'forwards';

      return {
        animation: animation,
        animationFillMode: animationFillMode
      };
    }, this.getStyle = i => {
      const size = parseInt(this.props.size);
      const moonSize = size / 7;

      if (i === 1) {
        return assign(this.getBallStyle(moonSize), this.getAnimationStyle(i), {
          backgroundColor: this.props.color,
          opacity: '0.8',
          position: 'absolute',
          top: size / 2 - moonSize / 2
        });
      } else if (i === 2) {
        return assign(this.getBallStyle(size), {
          border: moonSize + 'px solid ' + this.props.color,
          opacity: 0.1
        });
      } else {
        return assign(this.getAnimationStyle(i), {
          position: 'relative'
        });
      }
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

