"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.resetpassword = exports.newUser = exports.login = exports.getUser = exports.getAllUsers = exports.forgotpassword = exports.deleteUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _helper = require("../utils/helper");

var _rabbitMq = require("../config/rabbitMq");

var getAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].find();

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

  return function getAllUsers() {
    return _ref.apply(this, arguments);
  };
}();

exports.getAllUsers = getAllUsers;

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var data, result, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              email: body.email
            });

          case 2:
            data = _context2.sent;

            if (!(data == null)) {
              _context2.next = 7;
              break;
            }

            throw new Error('User does not exist');

          case 7:
            _context2.next = 9;
            return _bcrypt["default"].compare(body.password, data.password);

          case 9:
            result = _context2.sent;

            if (!(result == true)) {
              _context2.next = 15;
              break;
            }

            token = _jsonwebtoken["default"].sign({
              firstname: data.firstname,
              id: data._id,
              email: data.email
            }, process.env.SECRET_KEY);
            return _context2.abrupt("return", token);

          case 15:
            throw new Error('incorrect password');

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function login(_x) {
    return _ref2.apply(this, arguments);
  };
}(); //create new user


exports.login = login;

var newUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var data1, saltRounds, salt, hashPassword, data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user["default"].findOne({
              email: body.email
            });

          case 2:
            data1 = _context3.sent;

            if (!(data1 == null)) {
              _context3.next = 19;
              break;
            }

            saltRounds = 10;
            _context3.next = 7;
            return _bcrypt["default"].genSalt(saltRounds);

          case 7:
            salt = _context3.sent;
            _context3.next = 10;
            return _bcrypt["default"].hash(body.password, salt);

          case 10:
            hashPassword = _context3.sent;
            body.password = hashPassword;
            _context3.next = 14;
            return _user["default"].create(body);

          case 14:
            data = _context3.sent;
            (0, _rabbitMq.publisher)(data);
            return _context3.abrupt("return", data);

          case 19:
            throw new Error('User already registered');

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function newUser(_x2) {
    return _ref3.apply(this, arguments);
  };
}(); //update single user


exports.newUser = newUser;

var updateUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _user["default"].findByIdAndUpdate({
              _id: _id
            }, body, {
              "new": true
            });

          case 2:
            data = _context4.sent;
            return _context4.abrupt("return", data);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateUser(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}(); //delete single user


exports.updateUser = updateUser;

var deleteUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _user["default"].findByIdAndDelete(id);

          case 2:
            return _context5.abrupt("return", '');

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteUser(_x5) {
    return _ref5.apply(this, arguments);
  };
}(); //get single user


exports.deleteUser = deleteUser;

var getUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
    var data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _user["default"].findById(id);

          case 2:
            data = _context6.sent;
            return _context6.abrupt("return", data);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getUser(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getUser = getUser;

var forgotpassword = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(body) {
    var searchdata, token, sendingmail;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _user["default"].findOne({
              email: body.email
            });

          case 2:
            searchdata = _context7.sent;

            if (!(body.email == searchdata.email)) {
              _context7.next = 11;
              break;
            }

            token = _jsonwebtoken["default"].sign({
              id: searchdata._id,
              email: searchdata.email
            }, process.env.NEWSECRETKEY);
            _context7.next = 7;
            return (0, _helper.mailSend)(searchdata.email, token);

          case 7:
            sendingmail = _context7.sent;
            return _context7.abrupt("return", sendingmail);

          case 11:
            throw new Error('email does not matched');

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function forgotpassword(_x7) {
    return _ref7.apply(this, arguments);
  };
}();

exports.forgotpassword = forgotpassword;

var resetpassword = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(body) {
    var saltRounds, salt, hashPassword, data;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            console.log("body is", body);
            saltRounds = 10;
            _context8.next = 4;
            return _bcrypt["default"].genSalt(saltRounds);

          case 4:
            salt = _context8.sent;
            _context8.next = 7;
            return _bcrypt["default"].hash(body.password, salt);

          case 7:
            hashPassword = _context8.sent;
            //console.log(hashpassword);
            body.password = hashPassword;
            _context8.next = 11;
            return _user["default"].findOneAndUpdate({
              email: body.email
            }, {
              password: hashPassword
            });

          case 11:
            data = _context8.sent;
            console.log("data is ", data);
            return _context8.abrupt("return", data);

          case 14:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function resetpassword(_x8) {
    return _ref8.apply(this, arguments);
  };
}();

exports.resetpassword = resetpassword;