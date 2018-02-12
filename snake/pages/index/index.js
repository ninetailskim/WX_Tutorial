var startX = 0;
var startY = 0;

var moveX = 0;
var moveY = 0;

var X = 0;
var Y = 0;

var snakehead = {
  x: 0,
  y: 0,
  w: 20,
  h: 20,
  color: "#ff0000"
};

var collideBol = true;

var direction = null;

var snakeDirection = "right";

var snakeBody = [];

var foods = [];

var windowwidth = 0;
var windowheight = 0;

Page({
  canvasStart: function (e) {
    startX = e.touches[0].x;
    startY = e.touches[0].y;
  },
  canvasMove: function (e) {
    moveX = e.touches[0].x;
    moveY = e.touches[0].y;

    X = moveX - startX;
    Y = moveY - startY;

    if (Math.abs(X) > Math.abs(Y) && X > 0) {
      //console.log("right");
      direction = "right";
    } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
      //console.log("left");
      direction = "left";
    } else if (Math.abs(X) < Math.abs(Y) && Y > 0) {
      //console.log("down");
      direction = "down";
    } else if (Math.abs(X) < Math.abs(Y) && Y < 0) {
      //console.log("up");
      direction = "up";
    }
  },
  canvasEnd: function () {
    snakeDirection = direction;
  },
  onReady: function () {
    var context = wx.createContext();

    var frameNum = 0;

    

    function animate() {
      frameNum++;
      if(frameNum % 20 == 0){
        snakeBody.push({
          x: snakehead.x,
          y: snakehead.y,
          w:snakehead.w,
          h:snakehead.h,
          color:"#00ff00"
        });

        if(snakeBody.length > 4){
          if(collideBol){
            snakeBody.shift();
          }else{
            collideBol = true;
          }
        }

        switch (snakeDirection) {
          case "right":
            snakehead.x += snakehead.w;
            break;
          case "left":
            snakehead.x -= snakehead.w;
            break;
          case "down":
            snakehead.y += snakehead.h;
            break;
          case "up":
            snakehead.y -= snakehead.h;
            break;
        }
        frameNum = 0;
      }
      
      context.setFillStyle(snakehead.color);
      context.beginPath();
      context.rect(snakehead.x, snakehead.y, snakehead.w, snakehead.h);
      context.closePath();
      context.fill();

      for(var i =0; i < snakeBody.length;i ++){
        var bodyObj = snakeBody[i];
        context.setFillStyle(bodyObj.color);
        context.beginPath();
        context.rect(bodyObj.x, bodyObj.y, bodyObj.w, bodyObj.h);
        context.closePath();
        context.fill();
        
        if(collide(snakehead, bodyObj)){
          console.log("game over");
          var templen =snakeBody.length;
          for(var j = 0; j < templen - 3;j ++){
            snakeBody.shift();
          } 
          break;
        }
      }

      for (var i = 0; i < foods.length; i++) {
        var foodObj = foods[i];
        context.setFillStyle(foodObj.color);
        context.beginPath();
        context.rect(foodObj.x, foodObj.y, foodObj.w, foodObj.h);
        context.closePath();
        context.fill();
        if(collide(snakehead, foodObj)){
          console.log("duang~");
          foodObj.reset();
          collideBol = false;
        }
      }

      wx.drawCanvas({
        canvasId: "snakeCanvas",
        actions: context.getActions()
      });

      requestAnimationFrame(animate);
    }

    function collide2(obj1, obj2){
      var l1 = obj1.x;
      var r1 = l1 + obj1.w;
      var u1 = obj1.y;
      var d1 = u1 + obj1.h;

      var l2 = obj2.x;
      var r2 = l2 + obj2.w;
      var u2 = obj2.y;
      var d2 = u2 + obj2.h;

      if (r1 == r2 && l1 == l2 && d1 == d2 && u1 == u2) {
        return true;
      } else {
        return false;
      }
    }

    function collide(obj1, obj2){
      var l1 = obj1.x;
      var r1 = l1 + obj1.w;
      var u1 = obj1.y;
      var d1 = u1 + obj1.h;

      var l2 = obj2.x;
      var r2 = l2 + obj2.w;
      var u2 = obj2.y;
      var d2 = u2 + obj2.h;

      if(r1 > l2 && l1 < r2 && d1 > u2 && u1 < d2){
         return true;
      } else{
        return false;
      }
    }

    function rand(min, max){
        return parseInt(Math.random() * (max - min)) + min;
    }

    function Food() {
      this.x = rand(0, windowwidth - 20);
      this.y = rand(0, windowheight - 20);
      
      this.w = snakehead.w;
      this.h = snakehead.h;
      this.color = "rgb(" + rand(0, 255) + "," + rand(0, 255) + "," + rand(0, 255) + ")";
      this.reset = function(){
        this.x = rand(0, windowwidth - 20);
        this.y = rand(0, windowheight - 20);
        this.color = "rgb(" + rand(0, 255) + "," + rand(0, 255) + "," + rand(0, 255) + ")";
      }
    } 

    wx.getSystemInfo({
      success: function(res) {
        windowwidth = res.windowWidth;
        windowheight = res.windowHeight;
        for(var i = 0;i < 20; i++){
            foods.push(new Food());
        }
        animate();
      },
    })

    
    
  }
})
