<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        scroll: null,
      }
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 1.无论是否设置click:false，button都可以点击
        // 2.必须设置click:true，div、span等等才能点击
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      })

      // 2.监听滚动位置
      if(this.probeType ===2 || this.probeType === 3) {
        this.scroll.on('scroll', position => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }

      // 3.监听scroll滚动到底部
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          console.log('====');
          this.$emit('pullingUp')
        })
      }

      // // 4.监听下拉刷新
      // this.scroll.on('pullingDown', () => {
      //   console.log('下拉刷新');
      // })


    }
  }
</script>

<style scoped>

</style>
