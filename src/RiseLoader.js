import React, {Component} from 'react'
import PropTypes from 'prop-types'
import assign from 'domkit/appendVendorPrefix'
import insertKeyframesRule from 'domkit/insertKeyframesRule'

const riseAmount = 30

const keyframesEven = {
  '0%': {
    transform: 'scale(1.1)'
  },
  '25': {
    transform: 'translateY(-' + riseAmount + 'px)'
  },
  '50%': {
    transform: 'scale(0.4)'
  },
  '75%': {
    transform: 'translateY(' + riseAmount + 'px)'
  },
  '100%': {
    transform: 'translateY(0) scale(1.0)'
  }
}

const keyframesOdd = {
  '0%': {
    transform: 'scale(0.4)'
  },
  '25': {
    transform: 'translateY(' + riseAmount + 'px)'
  },
  '50%': {
    transform: 'scale(1.1)'
  },
  '75%': {
    transform: 'translateY(-' + riseAmount + 'px)'
  },
  '100%': {
    transform: 'translateY(0) scale(0.75)'
  }
}

const animationNameEven = insertKeyframesRule(keyframesEven)
const animationNameOdd = insertKeyframesRule(keyframesOdd)

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
    const animation = [i % 2 === 0 ? animationNameEven : animationNameOdd, '1s', '0s', 'infinite', 'cubic-bezier(.15,.46,.9,.6)'].join(' ')
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
          <div style={this.getStyle(4)}/>
          <div style={this.getStyle(5)}/>
        </div>
      )
    }

    return null
  }
}

export default Loader
