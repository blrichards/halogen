const React = require('react');
const PropTypes = require('prop-types');
const assign = require('domkit/appendVendorPrefix');
const insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
const rotateKeyframes = {
    '100%': {
        transform: 'rotate(360deg)'
    }
};

/**
 * @type {Object}
 */
const bounceKeyframes = {
    '0%, 100%': {
        transform: 'scale(0)'
    },
    '50%': {
        transform: 'scale(1.0)'
    }
};

/**
 * @type {String}
 */
const rotateAnimationName = insertKeyframesRule(rotateKeyframes);

/**
 * @type {String}
 */
const bounceAnimationName = insertKeyframesRule(bounceKeyframes);

const Loader = React.createClass({
    displayName: 'Loader',

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
    getDefaultProps: function () {
        return {
            loading: true,
            color: '#ffffff',
            size: '60px'
        };
    },

    /**
     * @param  {String} size
     * @return {Object}
     */
    getBallStyle: function (size) {
        return {
            backgroundColor: this.props.color,
            width: size,
            height: size,
            borderRadius: '100%',
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function (i) {
        const animation = [i == 0 ? rotateAnimationName : bounceAnimationName, '2s', i == 2 ? '-1s' : '0s', 'infinite', 'linear'].join(' ');
        const animationFillMode = 'forwards';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function (i) {
        const size = parseInt(this.props.size);
        const ballSize = size / 2;

        if (i) {
            return assign(this.getBallStyle(ballSize), this.getAnimationStyle(i), {
                position: 'absolute',
                top: i % 2 ? 0 : 'auto',
                bottom: i % 2 ? 'auto' : 0
            });
        }

        return assign(this.getAnimationStyle(i), {
            width: size,
            height: size,
            position: 'relative'
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function (loading) {
        if (loading) {
            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement(
                    'div',
                    { style: this.getStyle(0) },
                    React.createElement('div', { style: this.getStyle(1) }),
                    React.createElement('div', { style: this.getStyle(2) })
                )
            );
        }

        return null;
    },

    render: function () {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

