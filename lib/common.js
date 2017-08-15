"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllNoChildrenNodes = getAllNoChildrenNodes;
exports.findNode = findNode;
/**
 * get all children from array that each obj has property children
 * @param nodes
 * @returns {Array}
 */
function getAllNoChildrenNodes(nodes) {
  var resultNodes = [];
  if (!(nodes instanceof Array)) {
    throw new TypeError('param is not valid array type');
  }
  (function addChildren(nodes) {
    for (var i = 0; i < nodes.length; i++) {
      var obj = nodes[i];
      if (!obj) {
        continue;
      }
      if (obj.children) {
        addChildren(obj.children);
      } else {
        resultNodes.push(obj);
      }
    }
  })(nodes);
  return resultNodes;
}

/**
 * find node from array that has property children and property objProperty
 * @param nodes
 * @param nodeValue
 * @param objProperty
 * @returns {*}
 */
function findNode(nodes, nodeValue, objProperty) {
  var result = null;
  if (!(nodes instanceof Array) || !(typeof nodeValue === "string" || typeof nodeValue === "number") || !(typeof objProperty === "string")) {
    throw new TypeError('params that is not valid type');
  }
  (function find(nodes, nodeValue) {
    for (var i = 0; i < nodes.length; i++) {
      if (result) {
        break;
      }
      var obj = nodes[i];
      if (!obj) {
        continue;
      }
      if (obj[objProperty].toString() === nodeValue.toString()) {
        result = obj;
        break;
      } else {
        if (obj.children) {
          find(obj.children, nodeValue);
        } else {
          continue;
        }
      }
    }
  })(nodes, nodeValue);
  return result;
}