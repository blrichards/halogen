import React, {Component} from 'react'
import PropTypes from 'prop-types'
import assign from 'domkit/appendVendorPrefix'
import insertKeyframesRule from 'domkit/insertKeyframesRule'

const keyframes = {
  '33%': {
    transform: 'translateY(10px)'
  },
  '66%': {
    transform: 'translateY(-10px)'
  },
  '100%': {
    transform: 'translateY(0)'
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
    const animation = [animationName, '0.6s', (i * 0.07) + 's', 'infinite', 'ease-in-out'].join(' ')
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
