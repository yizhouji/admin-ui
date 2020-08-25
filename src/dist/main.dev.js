"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/stable");

require("regenerator-runtime/runtime");

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _locales = _interopRequireDefault(require("./locales"));

var _request = require("./utils/request");

var _proLayout = _interopRequireWildcard(require("@ant-design-vue/pro-layout"));

var _themePluginConfig = _interopRequireDefault(require("../config/themePluginConfig"));

var _antDesignVue = require("ant-design-vue");

var _bootstrap = _interopRequireDefault(require("./core/bootstrap"));

require("./core/lazy_use");

require("./permission");

require("./utils/filter");

require("./global.less");

var _vuePrintNb = _interopRequireDefault(require("vue-print-nb"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// with polyfills
// permission control
// global filter
_vue["default"].use(_antDesignVue.FormModel);

_vue["default"].use(_request.VueAxios);

_vue["default"].use(_vuePrintNb["default"]);

var height = document.body.offsetHeight || document.documentElement.clientHeight || document.body.offsetHeight;
_vue["default"].prototype.$message = _antDesignVue.message;

_antDesignVue.message.config({
  duration: 2,
  // 持续时间
  top: height / 2 + 'px',
  // 到页面顶部距离
  maxCount: 3 // 最大显示数, 超过限制时，最早的消息会被自动关闭

});

_vue["default"].config.productionTip = false; // mount axios to `Vue.$http` and `this.$http`

_vue["default"].component('pro-layout', _proLayout["default"]);

_vue["default"].component('page-header-wrapper', _proLayout.PageHeaderWrapper);

window.umi_plugin_ant_themeVar = _themePluginConfig["default"].theme;
new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  i18n: _locales["default"],
  created: _bootstrap["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');