<template>
    <view class="overflowOmit">
        <view class="spreadContent" :style="{lineClamp, fontSize: fontSize + 'rpx', lineHeight: textHeight + 'rpx', '-webkit-line-clamp': isFlag ? '999999': lineClamp, '--bottom': bottomValue}" :data-height="textHeight">
            <div class="spread" v-if="isShow" @click="spreadFun" :data-title="isFlag ? '收起' : spreadText"></div>
            <view class="contentArea show" v-html="ruleText"></view>
        </view>
        <!-- #ifdef MP-WEIXIN -->
        <!-- 多放一个元素为兼容小程序获取元素真实高度 -->
        <view class="contentArea hide" v-html="ruleText"></view>
        <!-- #endif -->
    </view>
</template>
<script>
export default {
    /**
     * 文字溢出隐藏展开更多
     * @property {Number | String} textHeight 文本行高 单位rpx
     * @property {Number | String} lineClamp 超出多少行隐藏
     * @property {String} spreadText 展开按钮文字
     * @property {Number | String} retreatRule 展示文字
     * @property {Number | String} model 1-渲染纯文字 2-支持渲染html标签
     * @property {Number | String} fontSize 文字大小
     * @description 关于英文/中文断词问题, 自行写样式处理 line-break / word-break
     * @example <overflow-omit />
     */
    name: 'overflowOmit',
    data() {
        return {
            isFlag: false,
            isShow: false,
            bottomValue: 0
        };
    },
    props: {
        textHeight: {
            type: [Number, String],
            default: 50,
        },
        lineClamp: {
            type: [Number, String],
            default: 3,
        },
        spreadText: {
            type: [String],
            default: '展开',
        },
        retreatRule: {
            type: [Number, String],
            default: '',
        },
        model: {
            type: [Number, String],
            default: 1
        },
        fontSize: {
            type: [Number, String],
            default: '28'
        },
    },
    computed: {
        ruleText() {
            if (this.model == 1) {
                let regex = /(<([^>]+)>)/ig;
                // 过滤标签
                return this.retreatRule.replace(regex, "");
            } else {
                return this.retreatRule;
            }
        },

    },
    created() {
        this.$nextTick(() => {
            this.initFun();
        });
    },
    methods: {
        // 初始化
        initFun() {
            /* #ifdef MP-WEIXIN */
            this.$uGetRect('.hide').then(res => {
                // 内容区是否隐藏判断
                if (res.height > uni.upx2px(this.textHeight * this.lineClamp)) {
                    this.isShow = true;
                }
            });
            /* #endif */

            /* #ifdef H5 */
            let h = document.querySelector('.show').scrollHeight;
            if (h > uni.upx2px(this.textHeight * this.lineClamp)) {
                this.isShow = true;
            }
            /* #endif */

            // 设置 "展开" 位置
            this.$uGetRect('.show').then(res => {
                this.bottomValue =  -res.height / this.lineClamp + 'px'
            });
        },
        // uGetRect为uView自带的节点查询简化方法
        $uGetRect(selector, all) {
            return new Promise(resolve => {
                uni.createSelectorQuery().in(this)[all ? 'selectAll' : 'select'](selector).boundingClientRect(rect => {
                    if (all && Array.isArray(rect) && rect.length) {
                        resolve(rect);
                    }
                    if (!all && rect) {
                        resolve(rect);
                    }
                }).exec();
            });
        },
        // 展开
        spreadFun() {
            this.isFlag = !this.isFlag;
        },
    }
};
</script>

<style lang="scss" scoped>
.overflowOmit {
    clear: both;
    display: flex;
    position: relative;
    overflow: hidden;
}
.spreadContent {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    &::before {
        content: '';
        float: right;
        margin-bottom: var(--bottom);
        height: 100%;
        cursor: pointer;
    }
}
.spread {
    float: right;
    clear: both;
    &::after {
        color: #ff5500;
        content: attr(data-title);
    }
}
.contentArea {
    font-size: inherit;
    line-height: inherit;
    line-break: anywhere;
}
.hide {
    color: rgba(0, 0, 0, 0);
    position: absolute;
    z-index: -1;
    opacity: 0;
    top: 0;
    left: 0;
}
</style>
