export const superScrollMixin = {
    data() {
        return {};
    },
    methods: {
        /**
         * @description dom节点查询
         * @param {Object} target 滚动信息
         * @param {Boolean} nodeFlag 返回查询节点信息
         * @param {String} selectorName 查询节点名称
         * @param {Function} SupAcceptFun 固定函数名, 在调用页面写一个 SupAcceptFun 接收参数
         */
        scrollFun(evnet = {}, nodeFlag = false, selectorName = '', dataArr = []) {
            let { target } = evnet;
            if (nodeFlag && selectorName) {
                this.querySelectorFun(selectorName, true).then(result => {
                    if (this.arrayDetectionFun(result)) {
                        result.map((iterator, index) => {
                            let { top } = iterator;
                            let dataItem = dataArr[index];
                            if (dataItem) {
                                if (top < this.$webviewHeight && !dataItem.requestFlag) {
                                    dataItem.requestFlag = true;
                                    this.SupAcceptFun({ target, index });
                                }
                            }
                        });
                    } else {
                        this.SupAcceptFun({ target });
                    }
                });
            } else {
                this.SupAcceptFun({ target });
            }
        }
    }
};