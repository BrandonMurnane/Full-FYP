import _ from 'lodash';

// Like mapPaths but for single field
export function mapPath(object, pathArray, callback, prefixPathArray=[]) {
  // if parent object is undefined, default it to {};
  const _object = object === undefined ? {} : object;

  // if not array, cast path string 'innter.outer' to array ['inner', 'outer']
  const _pathArray = Array.isArray(pathArray) ? pathArray : pathArray.split('.');

  // is current path the last in an array
  // eg the leaf of the object literal tree?
  const isPathLeaf = _pathArray.length === 1;
  const pathNode = _pathArray[0];

  // If path node is array then iterate through the array
  if (pathNode.indexOf('[]') !== -1) {
    const realPathNode = pathNode.replace('[]', '');
    const array = _object[realPathNode];
    // if path is not in object;
    if (!_.isArray(array)) return undefined;

    const mappedResult = array.map((value, index) => {
      if (isPathLeaf) return callback(value, [...prefixPathArray, realPathNode, index]);
      return mapPath(value, _pathArray.slice(1), callback, [...prefixPathArray, realPathNode, index]);
    });

    return { [realPathNode]: mappedResult };
  }

  // else maps over values
  const value = _object[pathNode];

  // if path is not in object;
  // if (value === undefined) return undefined;

  // if leaf, returns the value
  if (isPathLeaf) return { [pathNode]: callback(value, [...prefixPathArray, pathNode]) };

  // else drills further into object
  return { [pathNode]: mapPath(value, _pathArray.slice(1), callback, [...prefixPathArray, pathNode]) };
}

// Invokes a callback function on the leaf values of an object that are listed in pathArrays
// Given {foo: 'a', fu: {one: '1', two: '2'}} and fields ['foo', 'foo.one']
// The callback would be invoked with values 'a' and '1'
//
// Call back is given (value, [pathArray])
export function mapPaths(object, pathArrays, callback, prefixPathArray=[]) {
  // const newObject = {};

  const newObject = pathArrays.reduce((acc, pathArray) => {
    const _pathArray = Array.isArray(pathArray) ? pathArray : pathArray.split('.');
    const _prefixPathArray = Array.isArray(prefixPathArray) ? prefixPathArray : prefixPathArray.split('.');
    const value = mapPath(object, _pathArray, callback, _prefixPathArray);
    if (value !== undefined) _.merge(acc, value);
    return acc;
  }, {});

  return newObject;
}

