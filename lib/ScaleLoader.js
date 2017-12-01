import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'domkit/appendVendorPrefix';
import insertKeyframesRule from 'domkit/insertKeyframesRule';

const keyframes = {
  '0%': {
    transform: 'scaley(1.0)'
  },
  '50%': {
    transform: 'scaley(0.4)'
  },
  '100%': {
    transform: 'scaley(1.0)'
  }
};

const animationName = insertKeyframesRule(keyframes);

class Loader extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.getLineStyle = () => {
      return {
        backgroundColor: this.props.color,
        height: this.props.height,
        width: this.props.width,
        margin: this.props.margin,
        borderRadius: this.props.radius,
        verticalAlign: this.props.verticalAlign
      };
    }, this.getAnimationStyle = i => {
      const animation = [animationName, '1s', i * 0.1 + 's', 'infinite', 'cubic-bezier(.2,.68,.18,1.08)'].join(' ');
      const animationFillMode = 'both';

      return {
        animation: animation,
        animationFillMode: animationFillMode
      };
    }, this.getStyle = i => {
      return assign(this.getLineStyle(i), this.getAnimationStyle(i), {
        display: 'inline-block'
      });
    }, _temp;
  }

  render() {
    if (this.props.loading) {
      return React.createElement(
        'div',
        { id: this.props.id, className: this.props.className },
        React.createElement('div', { style: this.getStyle(1) }),
        React.createElement('div', { style: this.getStyle(2) }),
        React.createElement('div', { style: this.getStyle(3) }),
        React.createElement('div', { style: this.getStyle(4) }),
        React.createElement('div', { style: this.getStyle(5) })
      );
    }

    return null;
  }
}

Loader.propTypes = {
  loading: PropTypes.bool,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  margin: PropTypes.string,
  radius: PropTypes.string
};
Loader.defaultProps = {
  loading: true,
  color: '#ffffff',
  height: '35px',
  width: '4px',
  margin: '2px',
  radius: '2px'
};
export default Loader;

