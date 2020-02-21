<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-show="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-show="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tab-bar-item",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: '#ff8198'
      }
    },
    data() {
      return {
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        if(this.$route.path != this.path){
          this.$router.replace(this.path)
        }
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    /*tabbar的一般高度为49px*/
    height: 49px;
    font-size: 14px;
    margin-top: 3px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

  .active {
    color: #00cc76
  }
</style>
