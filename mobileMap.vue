<template>
    <view class="box">
        <!-- <span class="pd">{{text}}</span> -->
        <view class='btn' @click="clickFun">
            <span>{{this.customBrowserVersion().android ? 'android' : this.customBrowserVersion().ios ? 'ios' : '其他'}}</span> -
            <span>调用地图</span>
        </view>
    </view>
</template>

<script>
export default {
    /**
     * h5地图使用跳转
     * @Author  chencz
     * @Time    2022-11-16
     * @description 浏览器中唤醒地图app/打开网页版地图
     * @Version 1.0.0
     * @property {Number | String} pattern 定位模式 0- 经纬度 1-地名
     * @example <mobile-map />
     */
    data() {
        return {
            partnerAddress: '北院门街道庙后街14号',
            lng: '108.944771',
            lat: '34.26907',
            cutShow: false, // 唤醒地图app则说明页面隐藏过, 则不打开H5地图, 否则打开H5地图
            text: '',
        };
    },
    props: {
        pattern: {
            type: String | Number,
            default: 0
        }
    },
    created() {
        let obj = this.customBrowserVersion();
        let obj1 = {};
        for (const key in obj) {
            if (obj[key]) {
                obj1[key] = obj[key];
            }
        }
        this.text = obj1;
    },
    onShow() {
        this.cutShow = false;
    },
    onHide() {
        this.cutShow = true;
    },
    methods: {
        clickFun() {
            this.guide('bd');
        },
        guide(signMap = 'gd') {
            let address = this.partnerAddress;
            if (address) {
                let self = this;
                let lngValue = this.lng;
                let latValue = this.lat;
                let { android, ios, weixin, mobile } = this.customBrowserVersion();

                let tips = {
                    gd: '高德',
                    bd: '百度',
                };
                let tipsText = tips[signMap];
                if (signMap == 'gd') {
                    // 高德地图

                    if (android) {
                        // 安卓
                        if (!weixin && mobile) {
                            // 不是在微信 && 移动端

                            // app唤醒
                            window.location.href = `androidamap://viewMap?sourceApplication=appname&poiname=${address}&lat=${latValue}&lon=${lngValue}&dev=0`;
                        }
                        setTimeout(() => {
                            if (!self.cutShow) {
                                self.toast(`即将前往${tipsText}地图网页版`);
                            }
                        }, 1500);

                        setTimeout(() => {
                            // 判断是否有打开软件, 否则打开h5地图
                            if (!self.cutShow) {
                                //调用高德h5地图
                                window.location.href = `https://uri.amap.com/marker?position=${lngValue},${latValue}&name=${address}`;
                            }
                        }, 2000);
                    } else if (ios) {
                        // 苹果
                        if (!weixin && mobile) {
                            // 不是在微信 && 移动端

                            // app唤醒
                            window.location.href = `iosamap://viewMap?sourceApplication=appname&poiname=${address}&lat=${latValue}&lon=${lngValue}&dev=0`;
                        }

                        setTimeout(() => {
                            if (!self.cutShow) {
                                self.toast(`即将前往${tipsText}地图网页版`);
                            }
                        }, 1500);

                        setTimeout(function () {
                            // 判断是否有打开软件, 否则打开h5地图
                            if (!self.cutShow) {
                                window.location.href = `https://uri.amap.com/marker?position=${lngValue},${latValue}"&name=${address}`;
                            }
                        }, 2000);
                    } else {
                        if (!self.cutShow) {
                            this.toast(`即将前往${tipsText}地图网页版`);
                        }

                        setTimeout(() => {
                            // 判断是否有打开软件, 否则打开h5地图
                            if (!self.cutShow) {
                                //调用高德h5地图
                                window.location.href = `https://uri.amap.com/marker?position=${lngValue},${latValue}&name=${address}`;
                            }
                        }, 1500);
                    }
                } else if (signMap == 'bd') {
                    // 百度地图

                    if (android) {
                        if (!weixin && mobile) {
                            // 不是在微信 && 移动端

                            // app唤醒
                            window.location.href = `androidamap://viewMap?sourceApplication=appname&poiname=${address}&lat=${latValue}&lon=${lngValue}&dev=0`;
                        }

                        setTimeout(() => {
                            if (!self.cutShow) {
                                this.toast(`即将前往${tipsText}地图网页版`);
                            }
                        }, 1500);

                        setTimeout(() => {
                            if (!self.cutShow) {
                                window.location.href = `http://api.map.baidu.com/marker?location=${latValue},${lngValue}&title=${address}&content=景点&output=html&src=webapp.baidu.openAPIdemo`;
                            }
                        }, 2000);
                    } else if (ios) {
                        //ios操作系统
                        if (!weixin && mobile) {
                            // 不是在微信 && 移动端

                            // app唤醒
                            if (this.pattern == 1) {
                                window.location.href = `baidumap://map/geocoder?location=${latValue},${lngValue}&coord_type=gcj02&src=ios.baidu.openAPIdemo`;
                            } else {
                                window.location.href = `baidumap://map/geocoder?address=${address}&src=ios.baidu.openAPIdemo`;
                            }

                        }

                        setTimeout(() => {
                            if (!self.cutShow) {
                                this.toast(`即将前往${tipsText}地图网页版`);
                            }
                        }, 1500);

                        setTimeout(() => {
                            if (!self.cutShow) {
                                window.location.href = `http://api.map.baidu.com/marker?location=${latValue},${lngValue}&title=${address}&content=景点&output=html&src=webapp.baidu.openAPIdemo`;
                            }
                        }, 2000);
                    } else {
                        if (!self.cutShow) {
                            this.toast(`即将前往${tipsText}地图网页版`);
                        }
                        setTimeout(() => {
                            window.location.href = `http://api.map.baidu.com/marker?location=${latValue},${lngValue}&title=${address}&content=景点&output=html&src=webapp.baidu.openAPIdemo`;
                        }, 1500);
                    }
                }
            } else {
                this.toast('暂不知道该地址');
            }
        },
        //设备区分
        customBrowserVersion() {
            let equipment = navigator.userAgent;
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
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.btn {
    display: flex;
    justify-content: center;
    width: 50vw;
    height: 100px;
    background: #ffcc33;
    color: #ff4a26;
    text-align: center;
    line-height: 100px;
    border-radius: 10px;
}
.pd {
    padding: 20px;
}
</style>