import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // payload新添加的商品
      // 数组常用的函数有哪些？push/pop/unshift/sort/reverse/map/filter/reduce/join/find
      // 1.查找数字是否有该商品
      // let oldProduct = null
      // for (let item of context.state.cartList){
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }
      // 或者
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2.判断oldProduct
      if (oldProduct) {
        // 数量加一
        // oldProduct.count++
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        // 添加新商品
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加新商品')
      }
    })
  }
}
