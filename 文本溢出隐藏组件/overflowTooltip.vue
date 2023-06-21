<template>
  <div id="overflowTooltip" ref="overflowTooltipRef">
    <span class="title" @mouseover="mouseFun" v-if="tooltipShow">{{ txt }}</span>
    <span class="title" @mouseover="mouseFun" v-else>
      <el-tooltip
        class="item"
        effect="dark"
        :content="txt"
        placement="top-start"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <span class="title">{{ txt }}</span>
      </el-tooltip>
    </span>
  </div>
</template>

<script>
/**
 * @description 节流函数
 * @param {function} callback 回调函数
 * @param {number} delay 延时时间
 * @returns {function}
 */
const throttleFun = (callback, delay = 100) => {
  if (callback && typeof callback === 'function') {
    let delayer = null
    return function (...args) {
      if (!delayer) {
        delayer = setTimeout(() => {
          // 绑定this
          callback.apply(this, args)
          clearTimeout(delayer)
          delayer = null
        }, delay)
      }
    }
  }
}
export default {
  data() {
    return {
      tooltipShow: true
    }
  },
  /**
   * 文本溢出隐藏组件
   * @property {String} txt 文字
   * @example <OverflowTooltip />
   */
  props: {
    txt: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    // 鼠标事件
    mouseFun: throttleFun(function (event) {
      const offsetWidth = event.target?.offsetWidth
      if (!offsetWidth) {
        return
      }
      this.$nextTick(() => {
        const clientWidth = this.$refs.overflowTooltipRef.clientWidth
        const surplusWidth = clientWidth - offsetWidth
        this.tooltipShow = surplusWidth > 0
      })
    }, 200)
  }
}
</script>

<style lang="scss" scoped>
#overflowTooltip {
  @include wh(100%, 100%);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: inherit;
}
</style>
