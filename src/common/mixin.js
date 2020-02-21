import {debounce} from "common/utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImageLisener: null,
    }
  },
  mounted() {
    // 监听item中图片加载完成，防抖
    const refresh = debounce(this.$refs.scroll.refresh, 500)

    // 对监听的事件进行保存
    this.itemImageLisener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImageLisener)
    console.log('kkkkkkkkkkkkkkkkkk');
  }
}
