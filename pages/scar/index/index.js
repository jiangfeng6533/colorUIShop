const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    optionstatus: false
  },
  onShow: function () {
    this.onLoad();
  },
  onLoad: function (options) {
    var that = this;
    var shopdata = [];
    shopdata.push(
      { com_name: "新上海店", checked: '', data: [{ title: '这是一个商dddddd品名称', price: 30, num: 1, mount: 30, checked: 'checked' }, { title: '这是一个ddddddddd商品名称', price: 30, num: 1, mount: 30, checked: '' }] },
      { com_name: "黑龙会店", checked: 'checked', data: [{ title: '这是一个商品名称', price: 30, num: 1, mount: 30, checked: 'checked' }, { title: '这是一个顶顶顶顶商品名称', price: 30, num: 1, mount: 30, checked: 'checked' }] }
    );
    console.log(shopdata)
    that.countnum(shopdata);
    that.setData({ shopdata: shopdata })
    wx.setStorageSync('cartlist', shopdata);
  },
  submit: function () {
    wx.navigateTo({
      url: '/pages/scar/order/index'
    })
  },
  numadd: function (e) {
    console.log(e);
    var comkey = e.currentTarget.dataset.comkey;
    var shopkey = e.currentTarget.dataset.shopkey;
    var shopdata = this.data.shopdata;
    shopdata[comkey].data[shopkey].num = shopdata[comkey].data[shopkey].num + 1;
    shopdata[comkey].data[shopkey].mount = shopdata[comkey].data[shopkey].num * shopdata[comkey].data[shopkey].price;
    this.countnum(shopdata);
    this.setData({ shopdata: shopdata })
    wx.setStorageSync('cartlist', shopdata);
  },
  numdel: function (e) {
    console.log(e);
    var comkey = e.currentTarget.dataset.comkey;
    var shopkey = e.currentTarget.dataset.shopkey;
    var shopdata = this.data.shopdata;
    if (shopdata[comkey].data[shopkey].num != 1 && shopdata[comkey].data[shopkey].num > 0) {
      shopdata[comkey].data[shopkey].num = shopdata[comkey].data[shopkey].num - 1;
      shopdata[comkey].data[shopkey].mount = shopdata[comkey].data[shopkey].num * shopdata[comkey].data[shopkey].price
    }
    this.countnum(shopdata);
    this.setData({ shopdata: shopdata })
    wx.setStorageSync('cartlist', shopdata);
  },
  //计算总价公共函数
  countnum: function (shopdata) {
    let paymentMount = 0;
    for (let v in shopdata) {
      for (let vv in shopdata[v].data) {
        paymentMount += shopdata[v].data[vv].mount;
      }
    }
    this.setData({ paymentMount: paymentMount })
  },
  optionall: function (e) {
    console.log(e);
    var shopdata = this.data.shopdata;
    var optionstatus = e.currentTarget.dataset.optionstatus;
    if (this.data.optionstatus) {
      for (let k in shopdata) {
        shopdata[k].checked = '';
        for (let kk in shopdata[k].data) {
          shopdata[k].data[kk].checked = '';
        }
      }
      this.setData({ optionstatus: false, shopdata: shopdata })
    } else {
      for (let k in shopdata) {
        shopdata[k].checked = 'checked';
        for (let kk in shopdata[k].data) {
          shopdata[k].data[kk].checked = 'checked';
        }
      }
      wx.setStorageSync('cartlist', shopdata);
      this.setData({ optionstatus: true, shopdata: shopdata })
    }
  },
  checkboxChange: function (e) {
    console.log(e)
    var comkey = e.currentTarget.dataset.comkey;
    var shopkey = e.currentTarget.dataset.shopkey;
    var shopdata = this.data.shopdata;
    if (e.currentTarget.dataset.com) {
      if (shopdata[comkey].checked == 'checked') {
        shopdata[comkey].checked = '';
        for (let kk in shopdata[comkey].data) {
          shopdata[comkey].data[kk].checked = '';
        }
      } else {
        shopdata[comkey].checked = 'checked';
        for (let kk in shopdata[comkey].data) {
          shopdata[comkey].data[kk].checked = 'checked';
        }
      }
    } else {
      if (shopdata[comkey].data[shopkey].checked == 'checked') {
        shopdata[comkey].data[shopkey].checked = '';
      } else {
        shopdata[comkey].data[shopkey].checked = 'checked';
      }
    }
    wx.setStorageSync('cartlist', shopdata);
    this.setData({ shopdata: shopdata })
  }
  

});
