import React, {Component} from 'react'
import PropTypes from 'prop-types'
import assign from 'domkit/appendVendorPrefix'
import insertKeyframesRule from 'domkit/insertKeyframesRule'


const keyframes = {
  '0%': {
    transform: 'rotate(0deg) scale(1)'
  },
  '50%': {
    transform: 'rotate(180deg) scale(0.8)'
  },
  '100%': {
    transform: 'rotate(360deg) scale(1)'
  }
}


const animationName = insertKeyframesRule(keyframes)

class Loader extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.string
  }
  static defaultProps = {
      loading: true,
      color: '#ffffff',
      size: '35px'
    }

  getBallStyle = () => {
    return {
      width: this.props.size,
      height: this.props.size,
      border: '2px solid',
      borderColor: this.props.color,
      borderBottomColor: 'transparent',
      borderRadius: '100%',
      background: 'transparent !important',
      verticalAlign: this.props.verticalAlign
    }
  }

  getAnimationStyle = () => {
    const animation = [animationName, '0.75s', '0s', 'infinite', 'linear'].join(' ')
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

  render () {
    if (this.props.loading) {
      return (
        <div id={this.props.id} className={this.props.className}>
          <div style={this.getStyle()}/>
        </div>
      )
    }

    return null
  }
}

export default Loader
