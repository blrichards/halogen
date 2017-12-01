import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'domkit/appendVendorPrefix';
import insertKeyframesRule from 'domkit/insertKeyframesRule';

const keyframes = {
  '0%': {
    transform: 'rotate(0deg)'
  },
  '50%': {
    transform: 'rotate(180deg)'
  },
  '100%': {
    transform: 'rotate(360deg)'
  }
};

const animationName = insertKeyframesRule(keyframes);

class Loader extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.getBallStyle = () => {
      return {
        backgroundColor: this.props.color,
        width: this.props.size,
        height: this.props.size,
        margin: this.props.margin,
        borderRadius: '100%',
        verticalAlign: this.props.verticalAlign
      };
    }, this.getAnimationStyle = () => {
      const animation = [animationName, '1s', '0s', 'infinite', 'cubic-bezier(.7,-.13,.22,.86)'].join(' ');
      const animationFillMode = 'both';

      return {
        animation: animation,
        animationFillMode: animationFillMode
      };
    }, this.getStyle = i => {
      if (i) {
        return assign(this.getBallStyle(i), {
          opacity: '0.8',
          position: 'absolute',
          top: 0,
          left: i % 2 ? -28 : 25
        });
      }

      return assign(this.getBallStyle(i), this.getAnimationStyle(), {
        display: 'inline-block',
        position: 'relative'
      });
    }, _temp;
  }

  render() {
    if (this.props.loading) {
      return React.createElement(
        'div',
        { id: this.props.id, className: this.props.className },
        React.createElement(
          'div',
          { style: this.getStyle() },
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
  size: '15px',
  margin: '2px'
};
export default Loader;

