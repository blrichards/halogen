const React = require('react');
const PropTypes = require('prop-types');
const assign = require('domkit/appendVendorPrefix');
const insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
const rightRotateKeyframes = {
    '0%': {
        transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'

    },
    '100%': {
        transform: 'rotateX(180deg) rotateY(360deg) rotateZ(360deg)'
    }
};

/**
 * @type {Object}
 */
const leftRotateKeyframes = {
    '0%': {
        transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
    },
    '100%': {
        transform: 'rotateX(360deg) rotateY(180deg) rotateZ(360deg)'
    }
};

/**
 * @type {String}
 */
const rightRotateAnimationName = insertKeyframesRule(rightRotateKeyframes);

/**
 * @type {String}
 */
const leftRotateAnimationName = insertKeyframesRule(leftRotateKeyframes);

const Loader = React.createClass({
    /**
     * @type {Object}
     */
    propTypes: {
        loading: PropTypes.bool,
        color: PropTypes.string,
        size: PropTypes.string,
        margin: PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function() {
        return {
            loading: true,
            color: '#ffffff',
            size: '60px'
        };
    },

    /**
     * @param {String} size
     * @return {Object}
     */
    getCircleStyle: function(size) {
        return {
            width: size,
            height: size,
            border: size/10 +'px solid ' + this.props.color,
            opacity: 0.4,
            borderRadius: '100%',
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function(i) {
        const animation = [i==1? rightRotateAnimationName: leftRotateAnimationName, '2s', '0s', 'infinite', 'linear'].join(' ');
        const animationFillMode = 'forwards';
        const perspective = '800px';

        return {
            perspective: perspective,
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function(i) {
        const size = parseInt(this.props.size);

        if (i) {
            return assign(
                this.getCircleStyle(size),
                this.getAnimationStyle(i),
                {
                    position: 'absolute',
                    top: 0,
                    left: 0
                }
            );
        }

        return {
            width: size,
            height: size,
            position: 'relative'
        };
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function(loading) {
        if (loading) {
            return (
                <div id={this.props.id} className={this.props.className}>
                    <div style={this.getStyle(0)}>
                        <div style={this.getStyle(1)}></div>
                        <div style={this.getStyle(2)}></div>
                    </div>
                </div>
            );
        }

        return null;
    },

    render: function() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;
