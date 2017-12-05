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

var animations = {};

var PacmanLoader = function (_Component) {
  _inherits(PacmanLoader, _Component);

  function PacmanLoader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PacmanLoader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PacmanLoader.__proto__ || Object.getPrototypeOf(PacmanLoader)).call.apply(_ref, [this].concat(args))), _this), _this.getBallStyle = function () {
      return {
        backgroundColor: _this.props.color,
        width: _this.props.size,
        height: _this.props.size,
        margin: _this.props.margin,
        borderRadius: '100%',
        verticalAlign: _this.props.verticalAlign
      };
    }, _this.getAnimationStyle = function (i) {
      var size = _this.props.size;
      var animationName = animations[size];

      if (!animationName) {
        var keyframes = {
          '75%': {
            opacity: 0.7
          },
          '100%': {
            transform: 'translate(' + -4 * size + 'px,' + -size / 4 + 'px)'
          }
        };
        animationName = animations[size] = (0, _insertKeyframesRule2.default)(keyframes);
      }

      var animation = [animationName, '1s', i * 0.25 + 's', 'infinite', 'linear'].join(' ');
      var animationFillMode = 'both';

      return {
        animation: animation,
        animationFillMode: animationFillMode
      };
    }, _this.getStyle = function (i) {
      if (i === 1) {
        var s1 = _this.props.size + 'px solid transparent';
        var s2 = _this.props.size + 'px solid ' + _this.props.color;

        return {
          width: 0,
          height: 0,
          borderRight: s1,
          borderTop: s2,
          borderLeft: s2,
          borderBottom: s2,
          borderRadius: _this.props.size
        };
      }

      return (0, _appendVendorPrefix2.default)(_this.getBallStyle(i), _this.getAnimationStyle(i), {
        width: 10,
        height: 10,
        transform: 'translate(0, ' + -_this.props.size / 4 + 'px)',
        position: 'absolute',
        top: 25,
        left: 100
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PacmanLoader, [{
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
            _react2.default.createElement('div', { style: this.getStyle(5) })
          )
        );
      }

      return null;
    }
  }]);

  return PacmanLoader;
}(_react.Component);

PacmanLoader.propTypes = {
  loading: _propTypes2.default.bool,
  color: _propTypes2.default.string,
  size: _propTypes2.default.number,
  margin: _propTypes2.default.number
};
PacmanLoader.defaultProps = {
  loading: true,
  color: '#ffffff',
  size: 25,
  margin: 2
};
exports.default = PacmanLoader;

