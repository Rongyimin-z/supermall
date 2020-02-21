<template>
  <div class="shop-info" v-show="Object.keys(shop).length !== 0">
    <div class="s-info">
      <img class="s-logo" :src="shop.logo" alt="">
      <span class="s-name">{{shop.name}}</span>
    </div>
    <div class="s-detail">
      <div class="total-sells">
        <span class="detail-number">{{shop.sells | sellCountFilter}}</span>
        <span>总销量</span>
      </div>
      <div class="good-count">
        <span class="detail-number">{{shop.goodCount}}</span>
        <span>全部宝贝</span>
      </div>
      <div class="shop-description">
        <div class="shop-description-item" v-for="item in shop.score">
          <span class="des-item-name">{{item.name}}</span>
          <span class="des-item-score" :class="{heightfont : item.isBetter}">{{item.score}}</span>
          <span class="des-item-sign" :class="{height : item.isBetter}">{{item.isBetter ? '高':'低'}}</span>
        </div>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props: {
      shop: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        isBetter: '',
      }
    },
    filters: {
      sellCountFilter(value) {
        if(value < 10000) return value
        else return (value/10000).toFixed(1) + '万'
      },
    },
  }
</script>

<style scoped>
  .shop-info {
    margin-top: 15px;
    padding: 0 8px;
  }

  .s-info {
    display: flex;
    align-items: center;
  }

  .s-logo {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1);
  }

  .s-name {
    margin-left: 15px;
    justify-content: center;
    font-size: 18px;
  }

  .s-detail {
    width: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 20px;
    font-size: 12px;
  }

  .detail-number {
    font-size: 20px;
    margin-bottom: 13px;
  }

  .total-sells {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .good-count {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-right: 1px #999 solid;
  }

  .shop-description {
    flex: 1.3;
    width: 100%;
    text-align: left;
    margin-left: 30px;
    margin-right: 20px;
  }

  .shop-description-item {
    padding: 5px 0;
    display: flex;
  }

  .des-item-name {
    flex: 3;
  }

  .des-item-score {
    color: #5ea732;
    flex: 2;
  }

  .heightfont {
    color: var(--color-high-text);
  }

  .des-item-sign {
    flex: 0.5;
    color: #fff;
    background-color: #5ea732;
  }

  .height {
    flex: 0.5;
    color: #fff;
    background-color: var(--color-high-text);
  }

  .shop-bottom {
    text-align: center;
    margin-top: 10px;
  }

  .enter-shop {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }

</style>
