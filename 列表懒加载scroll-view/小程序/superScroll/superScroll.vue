<template>
    <scroll-view class="superScroll" ref="scrollRef" :scroll-y="scrollY" :scroll-x="scrollX" :scroll-top="scrollTop" :scroll-left="scrollLeft" :scroll-with-animation="scrollWithAnimation" :show-scrollbar="showScrollbar" :refresher-enabled='refresherEnabled' :refresher-triggered="triggered" :style="[supStyle]" @scroll="onScroll" @scrolltolower="scrolltolowerFun" @refresherrefresh="onRefreshFun" @refresherrestore="onRestoreFun" @refresherpulling="onPullingFun">
        <slot></slot>
    </scroll-view>
</template>

<script>
import { superScrollMixin } from './superScrollMixin.js';
import { throttleFun, arrayDetectionFun } from './common.js';
export default {
    mixins: [superScrollMixin],
    name: 'superScroll',
    /**
     * @Author  chencz
     * @Time    2023-2-1
     * @Version 1.0.1
     * @description superScroll组件封装
     * @description 小程序不支持 v-bind="$attrs" v-on="$listeners",
     * @description 小程序用不了 <component> 组件, 自行使用vif判断组件渲染初始化吧, better-scroll 更好用, 小程序不支持
     * @description 节流滚动, 去掉props传数据改为mixins
     * @description 使用方式自行看goodsList
     */
    props: {
        /**
         * @property {Boolean} scrollX 允许横向滚动
         * @property {Boolean} scrollY 允许纵向滚动
         * @property {Number | String} upperThreshold 距顶部/左边多远时（单位px），触发 scrolltoupper 事件
         * @property {Number | String} lowerThreshold 距底部/右边多远时（单位px），触发 scrolltolower 事件
         * @property {Number | String} scrollTop 设置竖向滚动条位置
         * @property {Number | String} scrollLeft 设置横向滚动条位置
         * @property {String} scrollIntoView 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
         * @property {Boolean} scrollWithAnimation 在设置滚动条位置时使用动画过渡
         * @property {Boolean} showScrollbar 控制是否出现滚动条
         * @property {Boolean} refresherEnabled 开启自定义下拉刷新
         * @property {Number} refresherThreshold 设置自定义下拉刷新阈值
         * @property {String} refresherBackground 设置自定义下拉刷新区域背景颜色
         * @property {Object} supStyle 样式
         * @property {Number | String} delay 节流时间 单位毫秒
         * @example <super-scroll />
         */
        scrollX: {
            type: Boolean,
            default: false
        },
        scrollY: {
            type: Boolean,
            default: false
        },
        upperThreshold: {
            type: [Number, String],
            default: 50,
        },
        lowerThreshold: {
            type: [Number, String],
            default: 50,
        },
        scrollTop: {
            type: [Number, String],
            default: 0,
        },
        scrollLeft: {
            type: [Number, String],
            default: 0,
        },
        scrollIntoView: {
            type: String,
            default: '',
        },
        scrollWithAnimation: {
            type: Boolean,
            default: false
        },
        showScrollbar: {
            type: Boolean,
            default: false
        },
        refresherEnabled: {
            type: Boolean,
            default: false
        },
        refresherThreshold: {
            type: Number,
            default: 45,
        },
        refresherBackground: {
            type: String,
            default: "#FFF"
        },
        supStyle: {
            type: Object,
            default: () => {
                return {};
            },
        },
        delay: {
            type: [Number, String],
            default: 500,
        },
    },
    data() {
        return {
            triggered: true,
            onScroll: () => { },
        };
    },
    mounted() {
        this.initScrollFun();
        this.onScroll = throttleFun(this.initScrollFun, this.delay);
    },
    methods: {
        // 初始化 || 滚动时触发
        initScrollFun(event = {}) {
            let { target } = event;
            this.$emit('scroll', { target });
        },
        // 自定义下拉刷新被触发
        onRefreshFun(e) {
            this.$emit('refresherrefresh', e);
            setTimeout(() => {
                this.triggered = false;
            }, 500);
        },
        // 自定义下拉刷新被复位
        onRestoreFun(e) {
            this.$emit('refresherrestore', e);
            this.triggered = 'restore';
        },
        // 自定义下拉刷新控件被下拉
        onPullingFun(e) {
            let { detail: { deltaY } } = e;
            if (deltaY < 0) return;
            this.triggered = true;
            this.$emit('refresherpulling', e);
        },
        // 滚动到底部
        scrolltolowerFun({ target }) {
            this.$emit('scrolltolower', target);
        },
    }
}
</script>

<style lang="scss" scoped>
.superScroll {
    height: 100vh;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
}
</style>