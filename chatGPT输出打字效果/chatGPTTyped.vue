<template>
    <div class="chatGPT">
        <div :class="typing ? 'text' : ''">{{ displayText }}</div>
    </div>
</template>

<script>
export default {
    name: "createWatermark",
    /**
     * chatGPT打字效果
     * @Author  chencz
     * @Time    2023-03-23
     * @description 模仿打字输出效果
     * @Version 1.0.0
     * @property {Number | String} chatGPTTxt 文本
     * @example <chatGPTTyped />
     */
    data() {
        return {
            typedText: "",
            typing: true,
            current: 0,
        };
    },
    props: {
        chatGPTTxt: {
            type: [Number, String],
            default: `今天要和大家分享的是关于一个名叫李明的小伙伴的故事。这位小伙伴呢，住在一处既美丽又宁静的山谷小村庄里。是不是想到了优美风景和清新空气？李明嘛，对这片土地可是深爱有加啊，他相信这里一定有着无限的潜能和未来。但是，随着时间的推移，人们渐渐离开了这个村庄，让李明变得非常孤独。他开始思考这个村庄的未来，也担心这片美丽的风景会被人们遗忘了。为了让村庄重新充满活力，李明开始采取行动，提升这个小村庄的宜居性， 吸引更多人前来一起生活。他加设各种新设施，优化居住环境，然后在互联网上为大家介绍这个小村庄，让大家发现这里的美丽和宁静。结果不出所料，很多人开始来到这个村庄，欣赏那里的美景和宁静，村庄也重新地充满了生机。而李明呢？他因为他的努力而感到万分自豪和幸福。这个故事告诉我们，只要我们充满热情和毅力，就可以带动整个社区的发展。我们可以通过一系列积极的行动，让我们所在的社区变得更加美好，吸引更多人前来一起生活！`,
        },
    },
    computed: {
        displayText() {
            return this.typedText;
        },
    },
    created() {
        setInterval(() => {
            this.chatGPTFun();
        }, Math.random() * 200);
    },
    methods: {
        // 打字效果
        chatGPTFun() {
            let chart = this.chatGPTTxt.charAt(this.current);
            this.typedText += chart;
            this.current++;

            if (this.current >= this.chatGPTTxt.length) {
                this.typing = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.chatGPT {
    width: 500px;
    padding: 20px;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    .text {
        &::after {
            content: "＿";
            opacity: 0;
            animation: blink 1s steps(5, start) infinite;
        }
    }

    @keyframes blink {
        to {
            opacity: 1;
        }
    }
}
</style>
