const React = require('react');
const PropTypes = require('prop-types');
const assign = require('domkit/appendVendorPrefix');
const insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
const keyframes = {
    '50%': {
        opacity: 0.3
    },
    '100%': {
        opacity: 1
    }
};

/**
 * @type {String}
 */
const animationName = insertKeyframesRule(keyframes);

const Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: PropTypes.bool,
        color: PropTypes.string,
        height: PropTypes.string,
        width: PropTypes.string,
        margin: PropTypes.string,
        radius: PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function () {
        return {
            loading: true,
            color: '#ffffff',
            height: '15px',
            width: '5px',
            margin: '2px',
            radius: '2px'
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getLineStyle: function (i) {
        return {
            backgroundColor: this.props.color,
            height: this.props.height,
            width: this.props.width,
            margin: this.props.margin,
            borderRadius: this.props.radius,
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function (i) {
        const animation = [animationName, '1.2s', i * 0.12 + 's', 'infinite', 'ease-in-out'].join(' ');
        const animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getPosStyle: function (i) {
        const radius = '20';
        const quarter = radius / 2 + radius / 5.5;

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
        };

        return lines['l' + i];
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function (i) {
        return assign(this.getLineStyle(i), this.getPosStyle(i), this.getAnimationStyle(i), {
            position: 'absolute'
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function (loading) {
        if (loading) {
            const style = {
                position: 'relative',
                fontSize: 0
            };

            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement(
                    'div',
                    { style: style },
                    React.createElement('div', { style: this.getStyle(1) }),
                    React.createElement('div', { style: this.getStyle(2) }),
                    React.createElement('div', { style: this.getStyle(3) }),
                    React.createElement('div', { style: this.getStyle(4) }),
                    React.createElement('div', { style: this.getStyle(5) }),
                    React.createElement('div', { style: this.getStyle(6) }),
                    React.createElement('div', { style: this.getStyle(7) }),
                    React.createElement('div', { style: this.getStyle(8) })
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

