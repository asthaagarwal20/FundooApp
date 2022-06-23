"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNote = exports.trashNote = exports.getNote = exports.getAllNote = exports.deleteNote = exports.archieveNote = exports.addNote = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _note = _interopRequireDefault(require("../models/note.model"));

var _radis = require("../config/radis");

var addNote = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _note["default"].create(body);

          case 2:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addNote(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.addNote = addNote;

var getAllNote = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userid) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _note["default"].find(userid);

          case 2:
            data = _context2.sent;

            if (!(data == null)) {
              _context2.next = 7;
              break;
            }

            throw new Error('no notes for the user');

          case 7:
            _context2.next = 9;
            return _radis.client.set('getnotes', JSON.stringify(data));

          case 9:
            return _context2.abrupt("return", data);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAllNote(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAllNote = getAllNote;

var getNote = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('retriving particualr note: ', id);
            _context3.next = 3;
            return _note["default"].findById(id);

          case 3:
            data = _context3.sent;

            if (!(data == null)) {
              _context3.next = 6;
              break;
            }

            throw new Error('note by this id do not exist');

          case 6:
            return _context3.abrupt("return", data);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getNote(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getNote = getNote;

var updateNote = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log('id is ' + id);
            _context4.next = 3;
            return _note["default"].findByIdAndUpdate({
              _id: id,
              userid: body.userid
            }, body, {
              "new": true
            });

          case 3:
            data = _context4.sent;
            console.log('data is' + data);
            return _context4.abrupt("return", data);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateNote(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateNote = updateNote;

var deleteNote = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_id) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _note["default"].findByIdAndDelete(_id);

          case 2:
            return _context5.abrupt("return", '');

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteNote(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteNote = deleteNote;

var archieveNote = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
    var temp, data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _note["default"].findById(id);

          case 2:
            temp = _context6.sent;

            if (!(temp == null)) {
              _context6.next = 5;
              break;
            }

            throw new Error('Note does not exist');

          case 5:
            temp.isArchieve = true;
            _context6.next = 8;
            return _note["default"].findByIdAndUpdate({
              _id: id
            }, temp, {
              "new": true
            });

          case 8:
            data = _context6.sent;
            return _context6.abrupt("return", data);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function archieveNote(_x7) {
    return _ref6.apply(this, arguments);
  };
}();

exports.archieveNote = archieveNote;

var trashNote = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(id) {
    var temp, data;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _note["default"].findById(id);

          case 2:
            temp = _context7.sent;

            if (!(temp == null)) {
              _context7.next = 5;
              break;
            }

            throw new Error('Note does not exist');

          case 5:
            temp.isDeleted = true;
            _context7.next = 8;
            return _note["default"].findByIdAndUpdate({
              _id: id
            }, temp, {
              "new": true
            });

          case 8:
            data = _context7.sent;
            return _context7.abrupt("return", data);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function trashNote(_x8) {
    return _ref7.apply(this, arguments);
  };
}();

exports.trashNote = trashNote;