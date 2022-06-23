"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redis = redis;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _radis = require("../config/radis");

function redis(_x, _x2, _x3) {
  return _redis.apply(this, arguments);
}

function _redis() {
  _redis = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _radis.client.get('getnotes');

          case 3:
            data = _context.sent;

            if (data == null) {
              next();
            } else {
              res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: JSON.parse(data),
                message: 'Notes fetched from redis'
              });
            }

            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _redis.apply(this, arguments);
}