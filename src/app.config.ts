export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/mine/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#8D959C",
    selectedColor: "#339AF0",
    list: [{
      iconPath: "assets/imgs/goods.png",
      selectedIconPath: "assets/imgs/goods-active.png",
      pagePath: 'pages/index/index',
      text: "商品"
    }, {
      iconPath: "assets/imgs/mine.png",
      selectedIconPath: "assets/imgs/mine-active.png",
      pagePath: 'pages/mine/index',
      text: "我的"
    }]
  },
})
