import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'domkit/appendVendorPrefix';
import insertKeyframesRule from 'domkit/insertKeyframesRule';

const keyframes = {
  '25%': {
    transform: 'rotateX(180deg) rotateY(0)'
  },
  '50%': {
    transform: 'rotateX(180deg) rotateY(180deg)'
  },
  '75%': {
    transform: 'rotateX(0) rotateY(180deg)'
  },
  '100%': {
    transform: 'rotateX(0) rotateY(0)'
  }
};

const animationName = insertKeyframesRule(keyframes);

class Loader extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.getSquareStyle = () => {
      return {
        backgroundColor: this.props.color,
        width: this.props.size,
        height: this.props.size,
        verticalAlign: this.props.verticalAlign
      };
    }, this.getAnimationStyle = i => {
      const animation = [animationName, '3s', '0s', 'infinite', 'cubic-bezier(.09,.57,.49,.9)'].join(' ');
      const animationFillMode = 'both';
      const perspective = '100px';

      return {
        perspective: perspective,
        animation: animation,
        animationFillMode: animationFillMode
      };
    }, this.getStyle = i => {
      return assign(this.getSquareStyle(i), this.getAnimationStyle(i), {
        display: 'inline-block'
      });
    }, _temp;
  }

  render() {
    if (this.props.loading) {
      return React.createElement(
        'div',
        { id: this.props.id, className: this.props.className },
        React.createElement('div', { style: this.getStyle() })
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
  size: '50px'
};
export default Loader;

