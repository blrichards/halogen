import React, {Component} from 'react'
import PropTypes from 'prop-types'
import assign from 'domkit/appendVendorPrefix'
import insertKeyframesRule from 'domkit/insertKeyframesRule'

const keyframes = {
  '0%': {
    transform: 'scale(1)',
    opacity: 1
  },
  '45%': {
    transform: 'scale(0.1)',
    opacity: 0.7
  },
  '80%': {
    transform: 'scale(1)',
    opacity: 1
  }
}

const animationName = insertKeyframesRule(keyframes)

class Loader extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.string,
    margin: PropTypes.string
  }

  static defaultProps = {
    loading: true,
    color: '#ffffff',
    size: '15px',
    margin: '2px'
  }

  getBallStyle = () => {
    return {
      backgroundColor: this.props.color,
      width: this.props.size,
      height: this.props.size,
      margin: this.props.margin,
      borderRadius: '100%',
      verticalAlign: this.props.verticalAlign
    }
  }

  getAnimationStyle = (i) => {
    const animation = [animationName, '0.75s', (i * 0.12) + 's', 'infinite', 'cubic-bezier(.2,.68,.18,1.08)'].join(' ')
    const animationFillMode = 'both'

    return {
      animation: animation,
      animationFillMode: animationFillMode
    }
  }

  getStyle = (i) => {
    return assign(
      this.getBallStyle(i),
      this.getAnimationStyle(i),
      {
        display: 'inline-block'
      }
    )
  }

  render() {
    if (this.props.loading) {
      return (
        <div id={this.props.id} className={this.props.className}>
          <div style={this.getStyle(1)}/>
          <div style={this.getStyle(2)}/>
          <div style={this.getStyle(3)}/>
        </div>
      )
    }

    return null
  }
}

export default Loader
