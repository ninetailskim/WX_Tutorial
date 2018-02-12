var API_URL = "http://127.0.0.1:8888/?APP_URL=https://api.douban.com/v2/movie/top250"

Page({
  data:{
    title:"加载中。。。",
    movies:[]
  },
  onLoad:function(){
    var that = this;
    wx.showToast({
      title: '加载中。。。',
      icon:"loading",
      duration:10000
    });
    wx.request({
      url:API_URL,
      data:{},
      header:{
        'Content-type':'application/json'
      },
      success:function(res){
        wx.hideToast();
        var data = res.data;
        console.log(data.title);
        that.setData({
          title:data.title,
          movies:data.subjects
        });
      }
    });
  }
})
