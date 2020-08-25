"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Salerooms = Salerooms;
exports.getMarkets = getMarkets;

var _request = _interopRequireDefault(require("@/utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var indexApi = {
  salerooms: '/warehouse/indexs/salerooms',
  markets: '/warehouse/indexs/markets'
};

function Salerooms(parameter) {
  return (0, _request["default"])({
    url: indexApi.salerooms,
    method: 'get',
    params: parameter
  });
}

function getMarkets(parameter) {
  return (0, _request["default"])({
    url: indexApi.markets,
    method: 'get',
    params: parameter
  });
}