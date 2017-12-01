import React, {Component} from 'react'
import PropTypes from 'prop-types'
import assign from 'domkit/appendVendorPrefix'
import insertKeyframesRule from 'domkit/insertKeyframesRule'

const keyframes = {
  '0%': {
    transform: 'scale(1)'
  },
  '50%': {
    transform: 'scale(0.5)',
    opacity: 0.7
  },
  '100%': {
    transform: 'scale(1)',
    opacity: 1
  }
}

const animationName = insertKeyframesRule(keyframes)

const random = (top) => {
  return Math.random() * top
}

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
    const animationDuration = ((random(100) / 100) + 0.6) + 's'
    const animationDelay = ((random(100) / 100) - 0.2) + 's'

    const animation = [animationName, animationDuration, animationDelay, 'infinite', 'ease'].join(' ')
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
      const style = {
        width: (parseFloat(this.props.size) * 3) + parseFloat(this.props.margin) * 6,
        fontSize: 0
      }

      return (
        <div id={this.props.id} className={this.props.className}>
          <div style={style}>
            <div style={this.getStyle(1)}/>
            <div style={this.getStyle(2)}/>
            <div style={this.getStyle(3)}/>
            <div style={this.getStyle(4)}/>
            <div style={this.getStyle(5)}/>
            <div style={this.getStyle(6)}/>
            <div style={this.getStyle(7)}/>
            <div style={this.getStyle(8)}/>
            <div style={this.getStyle(9)}/>
          </div>
        </div>
      )
    }

    return null
  }
}

export default Loader
