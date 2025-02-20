/**
 * Immutably sets a value inside an object. Like `lodash#set`, but returning a
 * new object. Treats nullish initial values as empty objects. Clones any
 * nested objects. Supports arrays, too.
 *
 * @param {Object}              object Object to set a value in.
 * @param {number|string|Array} path   Path in the object to modify.
 * @param {*}                   value  New value to set.
 * @return {Object} Cloned object with the new value set.
 */
export function setImmutably(
  object: object,
  path: number | string | Array<any>,
  value: any,
): object {
  // Normalize path
  path = Array.isArray(path) ? [...path] : [path];

  // Shallowly clone the base of the object
  object = Array.isArray(object) ? [...object] : { ...object };

  const leaf = path.pop();

  // Traverse object from root to leaf, shallowly cloning at each level
  let prev = object;
  for (const key of path) {
    const lvl = prev[key];
    prev = prev[key] = Array.isArray(lvl) ? [...lvl] : { ...lvl };
  }

  prev[leaf] = value;

  return object;
}

/**
 * Debounce functions for better performance
 * Source: https://www.joshwcomeau.com/snippets/javascript/debounce/
 *
 * @param  {Function} fn The function to debounce
 * @param  {number} wait The time, in milliseconds, to wait before calling the function
 * @return {Function} The debounced function
 */
export const debounce = (callback, wait = 50) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

/**
 * Throttle a function so that it is only called once within a given time interval.
 *
 * @param {Function} fn - The function to throttle
 * @param {Number} wait - The time interval, in milliseconds, to wait between calls to the function
 * @return {Function} - Returns a throttled version of the original function
 */
export function throttle(fn, wait = 20) {
  let time = Date.now();
  return function (...args) {
    if (time + wait - Date.now() < 0) {
      fn(...args);
      time = Date.now();
    }
  };
}
