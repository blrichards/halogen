'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _appendVendorPrefix = require('domkit/appendVendorPrefix');

var _appendVendorPrefix2 = _interopRequireDefault(_appendVendorPrefix);

var _insertKeyframesRule = require('domkit/insertKeyframesRule');

var _insertKeyframesRule2 = _interopRequireDefault(_insertKeyframesRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var keyframes = {
  '50%': {
    opacity: 0.3
  },
  '100%': {
    opacity: 1
  }
};

var animationName = (0, _insertKeyframesRule2.default)(keyframes);

var Loader = function (_Component) {
  _inherits(Loader, _Component);

  function Loader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Loader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Loader.__proto__ || Object.getPrototypeOf(Loader)).call.apply(_ref, [this].concat(args))), _this), _this.getLineStyle = function (i) {
      return {
        backgroundColor: _this.props.color,
        height: _this.props.height,
        width: _this.props.width,
        margin: _this.props.margin,
        borderRadius: _this.props.radius,
        verticalAlign: _this.props.verticalAlign
      };
    }, _this.getAnimationStyle = function (i) {
      var animation = [animationName, '1.2s', i * 0.12 + 's', 'infinite', 'ease-in-out'].join(' ');
      var animationFillMode = 'both';

      return {
        animation: animation,
        animationFillMode: animationFillMode
      };
    }, _this.getPosStyle = function (i) {
      var radius = '20';
      var quarter = radius / 2 + radius / 5.5;

      var lines = {
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
    }, _this.getStyle = function (i) {
      return (0, _appendVendorPrefix2.default)(_this.getLineStyle(i), _this.getPosStyle(i), _this.getAnimationStyle(i), {
        position: 'absolute'
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Loader, [{
    key: 'render',
    value: function render() {
      if (this.props.loading) {
        var style = {
          position: 'relative',
          fontSize: 0
        };

        return _react2.default.createElement(
          'div',
          { id: this.props.id, className: this.props.className },
          _react2.default.createElement(
            'div',
            { style: style },
            _react2.default.createElement('div', { style: this.getStyle(1) }),
            _react2.default.createElement('div', { style: this.getStyle(2) }),
            _react2.default.createElement('div', { style: this.getStyle(3) }),
            _react2.default.createElement('div', { style: this.getStyle(4) }),
            _react2.default.createElement('div', { style: this.getStyle(5) }),
            _react2.default.createElement('div', { style: this.getStyle(6) }),
            _react2.default.createElement('div', { style: this.getStyle(7) }),
            _react2.default.createElement('div', { style: this.getStyle(8) })
          )
        );
      }

      return null;
    }
  }]);

  return Loader;
}(_react.Component);

Loader.propTypes = {
  loading: _propTypes2.default.bool,
  color: _propTypes2.default.string,
  height: _propTypes2.default.string,
  width: _propTypes2.default.string,
  margin: _propTypes2.default.string,
  radius: _propTypes2.default.string
};
Loader.defaultProps = {
  loading: true,
  color: '#ffffff',
  height: '15px',
  width: '5px',
  margin: '2px',
  radius: '2px'
};
exports.default = Loader;

