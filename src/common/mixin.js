import {debounce} from "common/utils";
import BackTop from "components/content/backTop/BackTop";


export const itemListenerMixin = {
  data() {
    return {
      itemImageLisener: null,
      newRefresh: null,
    }
  },
  mounted() {
    // 监听item中图片加载完成，防抖
    this.newRefresh = debounce(this.$refs.scroll.refresh, 500)

    // 对监听的事件进行保存
    this.itemImageLisener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImageLisener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = position.y <= -1000
    }
  }
}
