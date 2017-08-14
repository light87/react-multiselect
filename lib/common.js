"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllNoChildrenNodes = getAllNoChildrenNodes;
exports.findNode = findNode;
exports.getPositionTop = getPositionTop;
exports.getPositionLeft = getPositionLeft;
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

function getPositionTop(divElement) {
  var actualTop = 0;
  if (divElement) {
    actualTop = divElement.offsetTop || 0;
    divElement.paddingTop && (actualTop -= divElement.paddingTop);
    var current = divElement.offsetParent;
    while (current !== null && current !== undefined) {
      current.offsetTop && (actualTop += current.offsetTop);
      current.paddingTop && (actualTop -= current.paddingTop);
      current = current.offsetParent;
    }
  }
  return actualTop;
}

function getPositionLeft(divElement) {
  var actualLeft = 0;
  if (divElement) {
    actualLeft = divElement.offsetLeft || 0;
    divElement.paddingLeft && (actualLeft -= divElement.paddingLeft);
    var current = divElement.offsetParent;
    while (current !== null && current !== undefined) {
      current.offsetLeft && (actualLeft += current.offsetLeft);
      current.paddingLeft && (actualLeft -= current.paddingLeft);
      current = current.offsetParent;
    }
  }
  return actualLeft;
}