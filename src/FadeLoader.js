import React, {Component} from 'react'
import PropTypes from 'prop-types'
import assign from 'domkit/appendVendorPrefix'
import insertKeyframesRule from 'domkit/insertKeyframesRule'

const keyframes = {
  '50%': {
    opacity: 0.3
  },
  '100%': {
    opacity: 1
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
      height: '15px',
      width: '5px',
      margin: '2px',
      radius: '2px'
    }

  
  getLineStyle = (i) => {
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
    const animation = [animationName, '1.2s', (i * 0.12) + 's', 'infinite', 'ease-in-out'].join(' ')
    const animationFillMode = 'both'

    return {
      animation: animation,
      animationFillMode: animationFillMode
    }
  }
  
  getPosStyle = (i) => {
    const radius = '20'
    const quarter = (radius / 2) + (radius / 5.5)

    const lines = {
      l1: {
        top: radius,
        left: 0
      },
      l2: {
        top: quarter,
        left: quarter,
        transform: 'rotate(-45deg)'
      },
      l3: {
        top: 0,
        left: radius,
        transform: 'rotate(90deg)'
      },
      l4: {
        top: -quarter,
        left: quarter,
        transform: 'rotate(45deg)'
      },
      l5: {
        top: -radius,
        left: 0
      },
      l6: {
        top: -quarter,
        left: -quarter,
        transform: 'rotate(-45deg)'
      },
      l7: {
        top: 0,
        left: -radius,
        transform: 'rotate(90deg)'
      },
      l8: {
        top: quarter,
        left: -quarter,
        transform: 'rotate(45deg)'
      }
    }

    return lines['l' + i]
  }
  
  getStyle = (i) => {
    return assign(
      this.getLineStyle(i),
      this.getPosStyle(i),
      this.getAnimationStyle(i),
      {
        position: 'absolute'
      }
    )
  }

  render () {
    if (this.props.loading) {
      const style = {
        position: 'relative',
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
          </div>
        </div>
      )
    }

    return null
  }
}

export default Loader
