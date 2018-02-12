var API_URL = "http://127.0.0.1:8888/?APP_URL=https://api.douban.com/v2/movie/subject/";

Page({
  data:{
    movie:{}
  },
  onLoad:function(parames){
    var that = this;
    console.log()
      console.log(API_URL + parames.id);
      wx.request({
        url: API_URL + parames.id,
        data:{},
        header:{
          'Content-Type':'application/json'
        },
        success:function(res){
            console.log(res.data);
            that.setData({
            movie:res.data
          })
        }
      })
  }

})