<template>
    <view class="mobilemap" @click="clickFun">
        <slot></slot>
    </view>
</template>

<script>
export default {
    /**
     * h5地图跳转
     * @Author  chencz
     * @Time    2022-11-16
     * @description 浏览器中唤醒地图app/打开网页版地图, safari浏览器频繁唤醒打开app会触发打开h5地图, 在pc端调试时请把移动端模拟器关闭, 否则会多次触发ios刷新逻辑
     * @description 高德地图需要经纬度+地名  百度地图需要经纬度
     * @Version 1.0.3
     * @property {String} software 软件名, gd-高德 bd-百度
     * @property {String} partnerAddress 地名
     * @property {String | Number} lng 经度
     * @property {String | Number} lat 维度
     * @example <mobile-map />
     */
    data() {
        return {
            cutShow: false, // 页面是否切换
            skipTime: null,
            tipsTime: null,
        };
    },
    props: {
        software: {
            type: String,
            default: 'gd'
        },
        partnerAddress: {
            type: String,
            default: '天安门广场'
        },
        lng: {
            type: String | Number,
            default: 116.39744,
            required: true
        },
        lat: {
            type: String | Number,
            default: 39.909192,
            required: true
        },
    },
    created() {
        // 监听页面切换
        document.addEventListener("visibilitychange", () => {
            this.clearTimeoutFun();
            if (document.visibilityState == 'hidden') {
                this.cutShow = true;
            } else if (document.visibilityState == 'visible') {
                this.cutShow = false;
            }
        });

        const isIos = !!window.navigator.userAgent.match(/\(i[^;]+;( equipment;)? CPU.+Mac OS X/);
        if (isIos) {
            // ios中页面后退可能空白则刷新
            window.addEventListener('pageshow', () => {
                window.location.reload();
            });
            window.addEventListener('pagehide', () => {
                this.cutShow = true;
            });
        }
    },
    methods: {
        // 点击事件
        clickFun() {
            this.cutShow = false;
            this.guide(this.software);
        },
        // 跳转逻辑
        guide(signMap = 'gd') {
            let { android, ios, weixin, mobile } = this.customBrowserVersion();

            let tips = {
                gd: '高德',
                bd: '百度',
            };
            let tipsText = tips[signMap];
            if (['gd', 'bd'].includes(signMap)) {
                // 高德地图 || 百度地图
                if (android || ios) {
                    this.appSkipFun(signMap, android ? 'android' : 'ios', weixin, mobile);
                    this.tipsFun(tipsText);
                    this.H5SkipFun(signMap);
                } else {
                    // 其他设备
                    this.tipsFun(tipsText, 500);
                    this.H5SkipFun(signMap, 1500);
                }
            }
        },
        //设备区分
        customBrowserVersion() {
            let equipment = window.navigator.userAgent;
            return {
                trident: equipment.indexOf('Trident') > -1, //IE内核
                presto: equipment.indexOf('Presto') > -1, //opera内核
                webKit: equipment.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: equipment.indexOf('Gecko') > -1 && equipment.indexOf('KHTML') == -1, //火狐内核
                mobile: !!equipment.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!equipment.match(/\(i[^;]+;( equipment;)? CPU.+Mac OS X/), //ios终端
                android: equipment.indexOf('Android') > -1 || equipment.indexOf('Adr') > -1, //android终端
                iPhone: equipment.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: equipment.indexOf('iPad') > -1, //是否iPad
                webApp: equipment.indexOf('Safari') == -1, //是否web应用程序，没有头部与底部
                weixin: equipment.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: equipment.match(/\sQQ/i) == " qq", //是否QQ
                isBaidu: equipment.indexOf('baiduboxapp') !== -1, //是否为百度浏览器
                isqqBrowser: equipment.indexOf('mqqbrowser') !== -1, //是否为qq浏览器
                isWxBrowser: equipment.indexOf('micromessenger') !== -1, //是否为微信浏览器
                isUc: equipment.indexOf('ucbrowser') !== -1, //是否为uc浏览器
            };
        },
        // 定时器清除
        clearTimeoutFun() {
            if (this.tipsTime) {
                clearTimeout(this.tipsTime);
                this.tipsTime = null;
            }
            if (this.skipTime) {
                clearTimeout(this.skipTime);
                this.skipTime = null;
            }
        },
        /**
         * @description 提示信息
         * @param {string} tipsText 提示文字
         * @param {number} time 延迟时间
         */
        tipsFun(tipsText, time = 1500) {
            this.tipsTime = setTimeout(() => {
                if (!this.cutShow) {
                    this.toast(`即将前往${tipsText}地图网页版`);
                }
            }, time);
        },
        /**
         * @description 打开h5版地图
         * @param {string} signMap gd-高德地图 bd-百度地图
         * @param {number} time 延迟时间
         */
        H5SkipFun(signMap = 'gd', time = 2000) {
            let lngValue = this.lng;
            let latValue = this.lat;
            let address = this.partnerAddress;
            if (signMap === 'gd') {
                this.skipTime = setTimeout(() => {
                    // 判断是否有打开软件, 否则打开h5地图
                    if (!this.cutShow) {
                        //调用高德h5地图
                        window.location.href = `https://uri.amap.com/marker?position=${lngValue},${latValue}&name=${address}`;
                    }
                }, time);
            } else if (signMap === 'bd') {
                this.skipTime = setTimeout(() => {
                    if (!this.cutShow) {
                        window.location.href = `http://api.map.baidu.com/marker?location=${latValue},${lngValue}&title=${address}&content=景点&output=html&src=webapp.baidu.openAPIdemo`;
                    }
                }, 2000);
            }
        },
        /**
         * @description app唤醒
         * @param {string} signMap gd-高德地图 bd-百度地图
         * @param {string} system 操作系统 android ios
         * @param {boolean} weixin 微信端
         * @param {boolean} mobile 移动端
         */
        appSkipFun(signMap = 'gd', system = 'android', weixin, mobile) {
            if (!weixin && mobile) {
                // 不是在微信 && 移动端
                let address = this.partnerAddress;
                let lngValue = this.lng;
                let latValue = this.lat;
                // 不是在微信 && 移动端
                if (signMap === 'gd') {
                    window.location.href = `${system}amap://viewMap?sourceApplication=appname&poiname=${address}&lat=${latValue}&lon=${lngValue}&dev=0`;
                } else if (signMap === 'bd') {
                    window.location.href = `baidumap://map/geocoder?location=${latValue},${lngValue}&coord_type=gcj02&src=${system}.baidu.openAPIdemo`;
                }
            }
        },
    }
}
</script>

<style lang="scss" scoped></style>