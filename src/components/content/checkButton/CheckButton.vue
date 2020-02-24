<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    padding: 1px;
    border: 2px solid #aaa;
  }

  .check {
    background-color: var(--color-tint);
    border-color: #ff4a0d;
  }
</style>
