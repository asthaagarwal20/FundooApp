"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var notecontroller = _interopRequireWildcard(require("../controllers/note.controller"));

var _auth = require("../middlewares/auth.middleware");

var _radis = require("../middlewares/radis.middleware");

var _user = require("../validators/user.validator");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = _express["default"].Router();

router.post('', _auth.userAuth, notecontroller.addNewNote);
router.get('', _auth.userAuth, notecontroller.getAllNote);
router.get('/:noteid', _auth.userAuth, notecontroller.getNote);
router.put('/:noteid', _auth.userAuth, notecontroller.updateNote);
router["delete"]('/:noteid', _auth.userAuth, notecontroller.deleteNote);
router.put('/archieve/:noteid', _auth.userAuth, notecontroller.archieveNote);
router.put('/trash/:noteid', _auth.userAuth, notecontroller.trashNote);
var _default = router;
exports["default"] = _default;