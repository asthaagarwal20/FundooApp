"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  color: {
    type: String
  },
  isArchieve: {
    type: Boolean
  },
  isDeleted: {
    type: Boolean
  },
  userid: {
    type: String
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Note', userSchema);

exports["default"] = _default;