"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserValidator = exports.newNoteValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var newUserValidator = function newUserValidator(req, res, next) {
  var schema = _joi["default"].object({
    firstname: _joi["default"].string().min(4).required(),
    lastname: _joi["default"].string().min(4).required(),
    email: _joi["default"].string().email().min(4).required(),
    password: _joi["default"].string().min(4).required()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error,
      value = _schema$validate.value;

  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.newUserValidator = newUserValidator;

var newNoteValidator = function newNoteValidator(req, res, next) {
  var schema = _joi["default"].object({
    title: _joi["default"].string().required(),
    description: _joi["default"].string().required(),
    color: _joi["default"].string().optional()
  });

  var _schema$validate2 = schema.validate(req.body),
      error = _schema$validate2.error,
      value = _schema$validate2.value;

  if (error) {
    throw new Error("Invalid Data");
  } else {
    next();
  }
};

exports.newNoteValidator = newNoteValidator;