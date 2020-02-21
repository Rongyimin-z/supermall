import {request} from "./request";

export function getdetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid,
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend',
  })
}

// 数据多的时候，需要这样整好数据，这里是个重点
// constructor：构造器-->构造函数
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.realPrice = itemInfo.realPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodCount = shopInfo.cGoods;
  }
}

export class GoodParams {
  constructor(info, rule) {
    // 注：images可能没有值(某些商品有值，某些没有值)
    this.image = info.image ? info.image[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
