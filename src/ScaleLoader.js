import React, {Component} from 'react'
import PropTypes from 'prop-types'
import assign from 'domkit/appendVendorPrefix'
import insertKeyframesRule from 'domkit/insertKeyframesRule'

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
}

const animationName = insertKeyframesRule(keyframes)

class Loader extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    margin: PropTypes.string,
    radius: PropTypes.string
  }

  static defaultProps = {
      loading: true,
      color: '#ffffff',
      height: '35px',
      width: '4px',
      margin: '2px',
      radius: '2px'
    }

getLineStyle = () => {
    return {
      backgroundColor: this.props.color,
      height: this.props.height,
      width: this.props.width,
      margin: this.props.margin,
      borderRadius: this.props.radius,
      verticalAlign: this.props.verticalAlign
    }
  }

  getAnimationStyle = (i) => {
    const animation = [animationName, '1s', (i * 0.1) + 's', 'infinite', 'cubic-bezier(.2,.68,.18,1.08)'].join(' ')
    const animationFillMode = 'both'

    return {
      animation: animation,
      animationFillMode: animationFillMode
    }
  }


  getStyle = (i) => {
    return assign(
      this.getLineStyle(i),
      this.getAnimationStyle(i),
      {
        display: 'inline-block'
      }
    )
  }

  render () {
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
