<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getdetail, getRecommend,Goods, Shop, GoodParams} from "network/detail";
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0,
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求数据
      getdetail(this.iid).then(res => {
        // console.log(res);
        // 1.获取顶部的图片轮播数据
        const data = res.result

        // 2.取出轮播图的数据
        this.topImages = res.result.itemInfo.topImages

        // 3.创建商品对象，获取商品数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 4.创建信息对象，获取店铺信息
        this.shop = new Shop(data.shopInfo)

        // 5.获取商品的详情数据
        this.detailInfo = data.detailInfo

        // 6.获取参数的信息
        this.paramInfo = new GoodParams(data.itemParams.info, data.itemParams.rule)

        // 7.获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        /*// 把值送入themeTopYs方法一：值不对
        // 值不对的原因：this.$refs.params.$el压根没有渲染
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(-(this.$refs.params.$el.offsetTop))
        this.themeTopYs.push(-(this.$refs.comment.$el.offsetTop))
        this.themeTopYs.push(-(this.$refs.recommend.$el.offsetTop))
        console.log(this.themeTopYs);

        // 把值送入themeTopYs方法二：等上面的数据传到组建中，渲染完就会回调下面这个函数
        this.$nextTick(() => {
          // 根据最新的数据，对应的dom试衣镜被渲染出来了
          // 但是图片依然是没有加载完(目前获取的offsetTop是没有图片的)
          // offsetTop值不对，都是因为图片的没有计算在内问题
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(-(this.$refs.params.$el.offsetTop))
          this.themeTopYs.push(-(this.$refs.comment.$el.offsetTop))
          this.themeTopYs.push(-(this.$refs.recommend.$el.offsetTop))
          console.log(this.themeTopYs);
        })*/
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.list
      })
    },
    mounted() {
    },
    updated() {
      // 把值送入themeTopYs方法三
      // this.themeTopYs = []
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(-(this.$refs.params.$el.offsetTop))
      // this.themeTopYs.push(-(this.$refs.comment.$el.offsetTop))
      // this.themeTopYs.push(-(this.$refs.recommend.$el.offsetTop))
      // console.log(this.themeTopYs);
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImageLisener)
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.newRefresh()
        // this.$refs.scroll.refresh()
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE) // hack做法放入一个最大值
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -(this.themeTopYs[index]), 500)
      },
      contentScroll(position) {
        // 1.获取y值
        const positionY = -position.y

        let length = this.themeTopYs.length

        // 2.positionY和主题中的值进行对比
        for(let i = 0; i< length; i++) {
          // hack做法
          // positoiny在0和7938之间，index=0
          // positoiny在=7938 和9120之间，index = 1
          // positoinY在9120 和9452之间，index = 2
          // positoiny在9120 和 非常大 的值之间，index = 3
          // 所以就this.themeTopYs.push(Number.MAX_VALUE)
          if((this.currentIndex !== i) && (i< length - 1 && positionY >= this.themeTopYs[i] && positionY <this.themeTopYs[i+1])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }

          // 普通做法
          // positoiny在0和7938之间，index=0
          // positoiny在=7938 和9120之间，index = 1
          // positoinY在9120 和9452之间，index = 2
          // positoiny大于等于9120，index = 3
          // if((this.currentIndex !== i) && ((i< length - 1 && positionY >= this.themeTopYs[i] && positionY <this.themeTopYs[i+1]) || (i === length -1 && positionY > this.themeTopYs[i]))) {
          //   this.currentIndex = i
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }
        }

        // 监听是否展示backtop
        this.listenShowBackTop(position)
      },
      addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        // 2.将商品添加到购物车
        // 不能直接在这操作vuex数据
        // this.$state.cartList.push(product)
        // this.$store.commit('addCart', product)
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })
        // 或者映射actions的方法到methods里，就像映射getters一样
        this.addCart(product).then(res => {
          this.$toast.show(res, 2000)
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 1;
    background-color: #ffffff;
    height: 100vh;
    overflow: hidden;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    /*height: calc(100% - 44px - 49px);*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
