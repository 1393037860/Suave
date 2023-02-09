<template>
    <div>
        <super-scroll v-if="goodsList.length" :scroll-y='true' :scroll-with-animation='true' :supStyle='{paddingTop: "100rpx"}' @scroll="supScrollFun($event, true, '.goods-content')" @scrolltolower='scrolltolowerFun'>
            <view class="list-content">
                <view class="goods-content" v-for="(item,index) in goodsList"></view>
            </view>
        </super-scroll>
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