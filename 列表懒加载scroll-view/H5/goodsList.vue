<template>
    <div>
        <component :is="supName" :scroll-y='true' :scroll-with-animation='true' :nodeFlag='true' selectorName='.goods-content' :supStyle='{height: "calc(100vh - 100rpx)"}' @scroll='supScrollFun' @scrolltolower='scrolltolowerFun'>
            <view class="list-content">
                <view class="goods-content" v-for="(item,index) in goodsList"></view>
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