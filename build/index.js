"use strict";

var _app = _interopRequireDefault(require("./app"));
require("./database");
var _config = require("./config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_app["default"].listen(_config.PORT, function () {
  console.log("Server run on port ".concat(_config.PORT));
});