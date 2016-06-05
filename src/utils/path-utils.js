/**
 * Original code from "react-inspector"
 * Author: xyc (https://github.com/xyc)
 * Source: https://github.com/xyc/react-inspector
 */

export const DEFAULT_ROOT_PATH='$';

// this works for showNonenumerable === false
const isExpandableNoShowNonenumerable = (data) => (
  typeof data === 'object' && data !== null && Object.keys(data).length > 0
);

// this works for showNonenumerable === true
const isExpandableShowNonenumerable = (data) => (
  (typeof data === 'object' && data !== null) || typeof data === 'function'
);

// generate isExpandable function
export const getIsExpandable = (showNonenumerable) => {
  if (!showNonenumerable)
    return isExpandableNoShowNonenumerable;
  return isExpandableShowNonenumerable;
};

export const getPathsState = (showNonenumerable, expandLevel, expandPaths, data, rootName, initialState = {}) => {
  const isExpandable = getIsExpandable(showNonenumerable);
  let wildcardPaths = [];
  if (expandLevel !== undefined){
    wildcardPaths = wildcardPaths.concat(wildcardPathsFromLevel(expandLevel));
  }

  wildcardPaths = wildcardPaths.concat(expandPaths);

  const paths = pathsFromWildcardPaths(isExpandable, wildcardPaths, data, DEFAULT_ROOT_PATH);
  const pathsState = paths.reduce((obj, path) => { obj[path] = true; return obj; }, initialState);

  return pathsState;
};

/**
 * Convert wild card paths to concrete paths by recursive traversal
 */
export const pathsFromWildcardPaths = (isExpandable, wildcardPaths, data) => {
  const paths = [];
  if (wildcardPaths === undefined){
    return paths;
  }
  wildcardPaths.map((wildcardPath)=>{
    if (typeof wildcardPath === 'string'){
      const names = wildcardPath.split('.'); // wildcard names
      // recursively populate paths with wildcard paths
      function populatePaths(curObject, curPath, i){
        const WILDCARD = '*';
        if (i === names.length){
          paths.push(curPath);
          return;
        }
        const name = names[i];
        if (i === 0){
          if (isExpandable(curObject) && (name === DEFAULT_ROOT_PATH || name === WILDCARD)){
            populatePaths(curObject, DEFAULT_ROOT_PATH, i + 1);
          }
        } else {
          if (name === WILDCARD){ // matches anything
            for(const propertyName in curObject){
              if (curObject.hasOwnProperty(propertyName)){
                const propertyValue = curObject[propertyName];
                if (isExpandable(propertyValue)){
                  populatePaths(propertyValue, curPath + '.' + propertyName, i + 1);
                } else {
                  continue;
                }
              }
            }
          } else {
            const propertyValue = curObject[name];
            if (isExpandable(propertyValue)){
              populatePaths(propertyValue, curPath + '.' + name, i + 1);
            }
          }
        }
      }
      populatePaths(data, '', 0);
    }
  });
  return paths;
};

export const wildcardPathsFromLevel = (level) => {
  if (level < 0){
    return undefined;
  }
  if (level === 0){
    return [];
  }
  let path = DEFAULT_ROOT_PATH;
  const wildcardPaths = [path];
  for(let i = 1; i < level; i++){
    path += '.*';
    wildcardPaths.push(path);
  }
  return wildcardPaths;
};