var API_URL = "http://127.0.0.1:8888/?APP_URL=https://api.douban.com/v2/movie/search?q=";

Page({
  data:{
    movies:{}
  },
  search:function(e){
    if(!e.detail.value){
      return;
    }
    wx.showToast({
      title: '加载中...',
      icon:"loading",
      duration:10000
    });
    var that = this;
    wx.request({
      url: API_URL + e.detail.value,
      data:{},
      header: { 
        'Content-Type':'application/json'
      },
      success:function(res){
         console.log(res)
         wx.hideToast();
         that.setData({
           movies:res.data.subjects
         });
      }
    })
  }
})