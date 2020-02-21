<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
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

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getdetail, getRecommend,Goods, Shop, GoodParams} from "network/detail";
  import {itemListenerMixin} from "common/mixin";

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
      }
    },
    mixins: [itemListenerMixin],
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
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.list
      })
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImageLisener)
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100vh - 44px);
  }
</style>
