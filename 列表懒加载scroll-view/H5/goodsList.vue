<template>
    <div>
        <component :is="supName" :scroll-y='true' :scroll-with-animation='true' :nodeFlag='true' selectorName='.super-list' :supStyle='{height: "calc(100vh - 100rpx)"}' @scroll='supScrollFun' @scrolltolower='scrolltolowerFun'>
            <view class="list-content">
                <view :class="['goods-content', item.requestFlag ? '' : 'super-list']" v-for="(item,index) in goodsList"></view>
            </view>
        </component>
    </div>
</template>

<script>
import superScroll from './superScroll/superScroll.vue';
import { superScrollMixin } from './superScroll/superScrollMixin.js';
export default {
    mixins: [superScrollMixin],
    components: { superScroll },
    data() {
        return {
            supName: null,
            goodsList: [],
        };
    },
    created() {
        this.getGoodsListFun();
    },
    methods: {
        supScrollFun({ target, result, index }) {
            if (index != undefined) {
                this.$forceUpdate();
                let item = this.goodsList[index];
                // 需求再次请求的item
            }
        },
        // 触底
        scrolltolowerFun() { },
        getGoodsListFun() {
            // ...请求数据

            // ...请求完成
            this.supName = 'super-scroll';
            // 商品数据
            this.goodsList.push();
            this.supAddFun(this.goodsList);
        }
    }
}
</script>

<style lang="scss" scoped>
</style>