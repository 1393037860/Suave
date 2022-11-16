/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
    if (!source || !["[object Object]", "[object Array]"].includes(Object.prototype.toString.call(source))) {
        return source;
    }

    const targetObj = source.constructor === Array ? [] : {};
    Object.keys(source).forEach(keys => {
        if (source[keys] && (Object.prototype.toString.call(source[keys]) === "[object Object]" || Object.prototype.toString.call(source[keys]) === "[object Array]")) {
            targetObj[keys] = deepClone(source[keys]);
        } else {
            targetObj[keys] = source[keys];
        }
    });
    return targetObj;
}