<template>
    <view class="super-img-lazy">
        <!-- 占位 -->
        <image class="super-img super-load" :src="loadSrc" @load="initFun" :style="[{ opacity: isShow ? '0' : '1' }, styleObj]" :mode="mode" />
        <!-- 失败 -->
        <image class="super-img" :src="errSrc" v-if="state == 2" :style="[{ opacity: isShow ? '1' : '0' }, styleObj]" :mode="mode" />
        <!-- 成功 -->
        <image class="super-img" :src="src" @load="loadFun" @error="errorFun" v-else-if="state == 1" :style="[{ opacity: isShow ? '1' : '0' }, styleObj]" :mode="mode" />
    </view>
</template>

<script>
import loadingImage from './static/loading.png';
import loadFailImage from './static/loadFail.png';
// 渲染时间戳
let loadTimer = null;
export default {
    /**
     * @Author  chencz
     * @Time    2023-2-3
     * @Version 1.0.0
     * @description 图片懒加载
     * @description 使用intersectionObserver
     * @example <img-Lazy src='' />
     */
    props: {
        /**
         * @property {String} loadSrc 占位图
         * @property {String} errSrc 失败图
         * @property {String} src 图片
         * @property {Object} distanceShow 页面区域参照参数
         * @property {Number | String} waitTime 多少毫秒渲染图片
         * @property {Object} styleObj css样式
         * @property {String} mode 图片裁剪、缩放的模式
         */
        loadSrc: {
            type: String,
            default: loadingImage,
        },
        errSrc: {
            type: String,
            default: loadFailImage,
        },
        src: {
            type: String,
            default: '',
        },
        distanceShow: {
            type: Object,
            default: () => {
                return {
                    bottom: 20, // 正值为屏幕下方未可视区域, 负值为可视区距离屏幕底部距离
                };
            }
        },
        waitTime: {
            type: [String, Number],
            default: '300'
        },
        styleObj: {
            type: Object,
            default: () => {
                return {
                    height: '200rpx',
                    width: '200rpx',
                };
            }
        },
        mode: {
            type: String,
            default: 'aspectFit'
        }
    },
    data() {
        return {
            isShow: false,
            state: 0,
        };
    },
    created() {
        if (!this.isShow) return;
        this.state = 0;
        this.$nextTick(() => {
            this.state = 1;
        });

    },
    methods: {
        // 初始化
        initFun() {
            let intersectionObserver = uni.createIntersectionObserver(this);
            // 通过loadFlag判断是否进入过可视区
            let loadFlag = false;

            this.$once('hook:beforeDestroy', () => {
                intersectionObserver.disconnect();
            });

            // 指定页面显示区域作为参照区域之一
            intersectionObserver.relativeToViewport(this.distanceShow).observe('.super-load', res => {
                // intersectionRatio 相交区域占目标节点的布局区域的比例
                if (!loadFlag && res.intersectionRatio == 0) {
                    loadFlag = true;
                    return;
                }
                this.state = 1;

                // 停止监听
                intersectionObserver.disconnect();
                loadTimer = new Date().getTime();
            });
        },
        // 渲染成功
        loadFun() {
            if (this.waitTime == 0) {
                this.isShow = true;
            } else {
                // 渲染花费时间(单位毫秒)
                let newTimer = new Date().getTime() - loadTimer;
                // 渲染时间是否大于动画等待时间
                if (newTimer > this.waitTime) {
                    this.isShow = true;
                } else {
                    setTimeout(() => {
                        this.isShow = true;
                    }, this.waitTime - newTimer);
                }
            }
        },
        // 渲染失败
        errorFun() {
            this.status = 2;
            this.isShow = true;
        },
    }
}
</script>

<style lang="scss" scoped>
.super-img-lazy {
    position: relative;
}
.super-img {
    will-change: transform;
    vertical-align: middle;
}
.super-load {
    position: absolute;
    top: 0;
    left: 0;
}
</style>