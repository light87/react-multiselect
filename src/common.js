/**
 * get all children from array that each obj has property children
 * @param nodes
 * @returns {Array}
 */
export function getAllNoChildrenNodes(nodes) {
  let resultNodes = [];
  if (!(nodes instanceof Array)) {
    throw new TypeError('param is not valid array type');
  }
  (function addChildren(nodes) {
    for (let i = 0; i < nodes.length; i++) {
      let obj = nodes[i];
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
export function findNode(nodes, nodeValue, objProperty) {
  let result = null;
  if (!(nodes instanceof Array) || !(typeof nodeValue==="string"||typeof nodeValue==="number") || !(typeof objProperty === "string")) {
    throw new TypeError('params that is not valid type');
  }
  (function find(nodes, nodeValue) {
    for (let i = 0; i < nodes.length; i++) {
      if (result) {
        break;
      }
      let obj = nodes[i];
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
