<template>
  <div>
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import { mapGetters } from 'vuex'

  export default {
    name: "car",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartLength', 'cartList']),
      // 或者
      // ...mapGetters({
      //   length: 'cartLength',
      //   list: 'cartList'
      // }),
    }
  }
</script>

<style scoped>
  .cart-nav {
    background-color: var(--color-tint);
    color: #ffffff;
    position: relative;
    z-index: 9;
  }
</style>
