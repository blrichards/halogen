import React, {Component} from 'react'
import PropTypes from 'prop-types'
import assign from 'domkit/appendVendorPrefix'
import insertKeyframesRule from 'domkit/insertKeyframesRule'

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

  getAnimationStyle = () => {
    const animation = [animationName, '1s', '0s', 'infinite', 'cubic-bezier(.7,-.13,.22,.86)'].join(' ')
    const animationFillMode = 'both'

    return {
      animation: animation,
      animationFillMode: animationFillMode,
    }
  }

  getStyle = (i) => {
    if (i) {
      return assign(
        this.getBallStyle(i),
        {
          opacity: '0.8',
          position: 'absolute',
          top: 0,
          left: i % 2 ? -28 : 25
        }
      )
    }

    return assign(
      this.getBallStyle(i),
      this.getAnimationStyle(),
      {
        display: 'inline-block',
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

export default Loader
