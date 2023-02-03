<template>
    <div class="superBetterScroll" ref="wrapperRef">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import { querySelectorFun } from '@/common/js/common.js';
export default {
    name: 'superBetterScroll',
    props: {
        /**
         * BetterScroll组件封装
         * @property {String | Number} probeType 0- 不触发scroll 1- 会非实时（屏幕滑动超过一定时间后）派发scroll事件 2-会在屏幕滑动的过程中实时的派发scroll事件 3- 不仅在屏幕滑动的过程中, 包括momentum滚动动画
         * @property {Array} dataArr 列表的数据
         * @property {Boolean} clickFlag 点击列表是否派发click事件
         * @property {Boolean} scrollX 开启横向滚动
         * @property {Boolean} pullupFlag 派发滚动到底部的事件，上拉加载
         * @property {Boolean} pulldownFlag 派发滚动到底部的事件, 下拉刷新
         * @property {Boolean} beforeScrollFlag 派发列表滚动开始的事件
         * @property {Boolean} nodeFlag 返回查询节点信息
         * @property {Number | String} refreshDelay 刷新scroll的延时
         * @property {String} selectorName 查询节点名称
         * @example <super-better-scroll />
         */
        probeType: {
            type: [Number, String],
            default: 3
        },
        dataArr: {
            type: Array,
            default: () => {
                return [];
            },
        },
        clickFlag: {
            type: Boolean,
            default: true
        },
        scrollX: {
            type: Boolean,
            default: false
        },
        pullupFlag: {
            type: Boolean,
            default: false
        },
        pulldownFlag: {
            type: Boolean,
            default: false
        },
        beforeScrollFlag: {
            type: Boolean,
            default: false
        },
        nodeFlag: {
            type: Boolean,
            default: true
        },
        refreshDelay: {
            type: [Number, String],
            default: 20
        },
        selectorName: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            scrollWrapper: null
        };
    },
    watch: {
        // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
        dataArr() {
            setTimeout(() => {
                this.refresh();
            }, this.refreshDelay);
        }
    },
    mounted() {
        setTimeout(() => {
            this.initFun();
        }, 20);
    },
    methods: {
        // better-scroll的初始化
        initFun() {
            if (!this.$refs.wrapperRef) {
                return;
            }
            this.scrollWrapper = new BScroll(this.$refs.wrapperRef, {
                probeType: this.probeType,
                click: this.clickFlag,
                scrollX: this.scrollX
            });

            this.scrollWrapper.on('scroll', (event) => {
                if (this.nodeFlag && this.selectorName) {
                    this.querySelectorFun(this.selectorName, true).then(result => {
                        // this.querySelectorFun('.goods-content', true).then(result => {
                        this.$emit('scroll', { event, result });
                    });
                } else {
                    this.$emit('scroll', event);
                }

            });

            if (this.pullupFlag) {
                this.scrollWrapper.on('scrollEnd', (event) => {
                    let { y, maxScrollY } = this.scrollWrapper;
                    // 页面触底
                    if (y <= maxScrollY + 50) {
                        this.$emit('scrollToEnd', event);
                    }
                });
            }

            if (this.pulldownFlag) {
                this.scrollWrapper.on('touchEnd', (event) => {
                    // 下拉动作
                    if (event.y > 50) {
                        this.$emit('pulldown', event);
                    }
                });
            }

            if (this.beforeScrollFlag) {
                this.scrollWrapper.on('beforeScrollStart', (event) => {
                    this.$emit('beforeScroll', event);
                });
            }
        },
        disable() {
            // 代理disable方法
            this.scrollWrapper && this.scrollWrapper.disable();
        },
        enable() {
            // 代理enable方法
            this.scrollWrapper && this.scrollWrapper.enable();
        },
        refresh() {
            // 代理refresh方法
            this.scrollWrapper && this.scrollWrapper.refresh();
        },
        scrollTo() {
            // 代理scrollTo方法
            this.scrollWrapper && this.scrollWrapper.scrollTo.apply(this.scrollWrapper, arguments);
        },
        scrollToElement() {
            // 代理scrollToElement方法
            this.scrollWrapper && this.scrollWrapper.scrollToElement.apply(this.scrollWrapper, arguments);
        }
    },
}
  </script>

<style lang="scss" scoped>
.superBetterScroll {
    height: 100vh;
    overflow: hidden;
}
</style>