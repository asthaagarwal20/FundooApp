"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mailSend = exports.mail = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var nodemailer = require("nodemailer");

require('dotenv').config();

var mailSend = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, token) {
    var transporter;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // create reusable transporter object using the default SMTP transport
            transporter = nodemailer.createTransport({
              host: "smtp.ethereal.email",
              port: 587,
              service: 'gmail',
              secure: false,
              // true for 465, false for other ports
              auth: {
                user: process.env.SENDER_EMAIL,
                // generated ethereal user
                pass: process.env.PASSWORD // generated ethereal password

              }
            }); // send mail with defined transport object

            _context.next = 3;
            return transporter.sendMail({
              from: process.env.SENDER_EMAIL,
              // sender address
              to: email,
              // list of receivers
              subject: "Link for reset password",
              // Subject line
              html: "<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href=\"http://localhost:5000/".concat(token, "\">click here</a></h1>")
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function mailSend(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.mailSend = mailSend;

var mail = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email) {
    var transporter;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // create reusable transporter object using the default SMTP transport
            transporter = nodemailer.createTransport({
              host: "smtp.ethereal.email",
              port: 587,
              service: 'gmail',
              secure: false,
              // true for 465, false for other ports
              auth: {
                user: process.env.SENDER_EMAIL,
                // generated ethereal user
                pass: process.env.PASSWORD // generated ethereal password

              }
            }); // send mail with defined transport object

            _context2.next = 3;
            return transporter.sendMail({
              from: process.env.SENDER_EMAIL,
              // sender address
              to: email,
              // list of receivers
              subject: "Rabbitmq 2",
              // Subject line
              html: "<h1>Hello,<br><br>User Registration successful!</h1>"
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function mail(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.mail = mail;