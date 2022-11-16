<template>
    <!-- 封装el-tree组织树组件 -->
    <div class="organization" :style="{ minHeight: minHeight, height: height }">
        <!-- 搜索框 -->
        <el-input v-model="designation" :placeholder="hint" clearable size="small" prefix-icon="el-icon-search" @input="inputFun" />

        <!-- 组织树 -->
        <div ref="boxRef" class="treeBox">
            <el-tree class="tree-border" v-bind="$attrs" v-on="$listeners" :filter-node-method="filterNode" :empty-text='treeText' ref="treeRef">
                <span class="tree-node" ref="child" slot-scope="{ node }" @mouseover="mouseFun" v-if="flag">{{node.label}}</span>
                <span class="tree-node" ref="child" slot-scope="{ node }" @mouseover="mouseFun" v-else>
                    <el-tooltip class="item" effect="dark" :content="node.label" placement="top-start">
                        <span>{{ node.label}}</span>
                    </el-tooltip>
                </span>
            </el-tree>
        </div>
    </div>
</template>

<script>
import {deepClone} from './util.js'
export default {
    props: {
        // 占位符
        hint: {
            type: String,
            default: "请输入机房名称",
        },
        // 最小高度
        minHeight: {
            type: String,
            default: "100%",
        },
        // 高度
        height: {
            type: String,
            default: "100%",
        },
    },
    data() {
        return {
            designation: "", // 组织树名称
            flag: true,
            treeText: "加载中，请稍后",
        };
    },
    methods: {
        // 筛选框
        inputFun(val) {
            this.$refs.treeRef.filter(val);
        },
        // 节点筛选
        filterNode(value, data) {
            if (!value || !data.name) return true;
            this.treeText = "暂无数据";
            if (data.disabled) return false;
            return data.name.indexOf(value) !== -1;
        },
        // tree子元素鼠标经过
        mouseFun(el) {
            let { target } = el;
            this.$nextTick(() => {
                setTimeout(() => {
                    // 父元素宽度
                    let treeBox = this.$refs.boxRef.clientWidth;
                    // margin距离
                    let offsetLeft = target.offsetLeft;
                    // 元素宽度
                    let offsetWidth = target.offsetWidth;
                    // 剩余宽度
                    let surplusWidth = treeBox - offsetLeft - offsetWidth;
                    if (surplusWidth < 6) {
                        this.flag = false;
                    } else {
                        this.flag = true;
                    }
                }, 0);
            });
        },
        /**
         * 筛选对应层级
         * @param {object} data 组织数据
         * @param {number} extent 组织层级
         */
        getFirstNodeFun(data, extent) {
            let res = [];
            // 递归函数
            function recursionFun(row) {
                if ("disabled" in row && row.ancestorIds.length == extent) {
                    res.push(deepClone(row));
                }
                if (!row.list || !row.list.length) return;
                row.list.forEach((item) => {
                    recursionFun(item);
                });
            }
            recursionFun(data);
            let row = res[0];
            let tree = this.$refs.treeRef;
            if (tree) {
                tree.setCurrentKey(firstNode);
            }
            return row ? row : {};
        },
    },
};
</script>

<style lang="scss" scoped>
.el-tree {
    height: calc(100% - 5px);
    overflow-y: auto;
    box-sizing: border-box;
    margin: 0;
    &::-webkit-scrollbar-track-piece {
        background: #d3dce6;
    }
    &::-webkit-scrollbar {
        width: 3px;
        height: 0px;
    }
    &::-webkit-scrollbar-thumb {
        background: #99a9bf;
        border-radius: 20px;
    }
    .tree-node {
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
.organization {
    height: 100%;
    width: 230px;
}
.treeBox {
    height: calc(100% - 32px);
    margin-top: 5px;
    box-sizing: border-box;
}
</style>