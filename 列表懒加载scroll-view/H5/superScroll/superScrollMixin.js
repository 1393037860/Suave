let dataArr = [];
export const superScrollMixin = {
    data() {
        return {};
    },
    methods: {
        // 数据添加
        supAddFun(data) {
            dataArr = data;
        },
        // 数据读取
        supReadFun() {
            return dataArr;
        },
    }
};