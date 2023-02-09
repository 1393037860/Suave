/**
 * @description 节流函数
 * @param {function} callback 回调函数
 * @param {number} delay 延时时间
 * @returns {function}
 */
export const throttleFun = (callback, delay = 100) => {
    if (callback && typeof callback === 'function') {
        let delayer = null;
        return function (...args) {
            if (!delayer) {
                let _this = this;
                delayer = setTimeout(function () {
                    // 绑定this进去
                    callback.apply(_this, args);
                    clearTimeout(delayer);
                    delayer = null;
                }, delay);
            }
        };
    }
};
/**
 * @description dom节点查询
 * @param {string} selector 节点
 * @param {boolean} all true- selectAll false- select
 * @returns {array}
 */
export function querySelectorFun(selector = '', all = false) {
    return new Promise(resolve => {
        uni.createSelectorQuery().in(this)[all ? 'selectAll' : 'select'](selector).boundingClientRect(rect => {
            resolve(rect);
        }).exec();
    });
}
/**
 * @description 数组判断
 * @param {array} array 数组
 * @returns {boolean}
 */
export function arrayDetectionFun(array) {
    return Array.isArray(array) && array.length > 0;
}