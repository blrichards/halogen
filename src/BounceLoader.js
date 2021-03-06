import React, {Component} from 'react'
import PropTypes from 'prop-types'
import assign from 'domkit/appendVendorPrefix'
import insertKeyframesRule from 'domkit/insertKeyframesRule'

const keyframes = {
  '0%, 100%': {
    transform: 'scale(0)'
  },
  '50%': {
    transform: 'scale(1.0)'
  }
}

const animationName = insertKeyframesRule(keyframes)

class BounceLoader extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.string
  }

  static defaultProps = {
    loading: true,
    color: '#ffffff',
    size: '60px'
  }

  getBallStyle = () => {
    return {
      backgroundColor: this.props.color,
      width: this.props.size,
      height: this.props.size,
      borderRadius: '100%',
      opacity: 0.6,
      position: 'absolute',
      top: 0,
      left: 0,
      verticalAlign: this.props.verticalAlign
    }
  }

  getAnimationStyle = (i) => {
    const animation = [animationName, '2s', i === 1 ? '1s' : '0s', 'infinite', 'ease-in-out'].join(' ')
    const animationFillMode = 'both'

    return {
      animation: animation,
      animationFillMode: animationFillMode
    }
  }

  getStyle = (i) => {
    if (i) {
      return assign(
        this.getBallStyle(i),
        this.getAnimationStyle(i)
      )
    }

    return assign(
      {
        width: this.props.size,
        height: this.props.size,
        position: 'relative'
      }
    )
  }

  render() {
    if (this.props.loading) {
      return (
        <div id={this.props.id} className={this.props.className}>
          <div style={this.getStyle()}>
            <div style={this.getStyle(1)}/>
            <div style={this.getStyle(2)}/>
          </div>
        </div>
      )
    }

    return null
  }
}

export default BounceLoader
