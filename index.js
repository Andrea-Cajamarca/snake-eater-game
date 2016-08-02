var food = {
  top:20,
  left:20,
  arrange: function () {
    $("#food").css("top", this.top);
    $("#food").css("left", this.left);
  }
}



var PLAYING_STATE = "playing";
var LOST_STATE = "lost";
var state= PLAYING_STATE;

var solidSnake1= { 
  position: [
    {
      top: 0,
      left: 0,
    },
    {
      top: 10,
      left: 0,
    },
    {
      top: 20,
      left: 0,
    }
  ],

direction: "down",


  /*slither: function(sTop, sLeft, sTurn) {
    this.position.top = sTop;
    this.position.left = sLeft;
    this.position.turn = sTurn;
    $("#solidSnake1").css("top", this.position.top);
    $("#solidSnake1").css("left", this.position.left);
    
    $("#solidSnake1").css("transform", "rotate("+this.position.turn+"deg)");
  },*/
  slither: function(){
    if ((this.direction == "down" && this.position[this.position.length-1].top >= 400-10) ||
        (this.direction == "right" && this.position[this.position.length-1].left >= 400-10) ||
        (this.direction == "up" && this.position[this.position.length-1].top <= 0) ||
        (this.direction == "left" && this.position[this.position.length-1].left < 0)) {
      state = LOST_STATE;
      return;
    }  
    
    var tail= this.position.shift();
    var tailTop = tail.top;
    var tailLeft = tail.left;
    if (this.direction == "down") {
      tail.top= this.position[this.position.length-1].top+10;
      tail.left= this.position[this.position.length-1].left;
    }
    if (this.direction == "right") {
      tail.top= this.position[this.position.length-1].top;
      tail.left= this.position[this.position.length-1].left+10;
    }
      if (this.direction == "up") {
      tail.top= this.position[this.position.length-1].top-10;
      tail.left= this.position[this.position.length-1].left;
    }
      if (this.direction == "left") {
      tail.top= this.position[this.position.length-1].top;
      tail.left= this.position[this.position.length-1].left-10;
    }
    this.position.push(tail);
    
    if (this.position[this.position.length-1].top == food.top &&
        this.position[this.position.length-1].left == food.left) {
          var newSnakeDiv = $(document.createElement("div"))
          newSnakeDiv.addClass("solidSnake1");
          newSnakeDiv.attr("id", "s"+this.position.length);
          newSnakeDiv.css("left", tailLeft);
          newSnakeDiv.css("top", tailTop);
          this.position.push({top: tailTop, left: tailLeft});
          $("#border").append(newSnakeDiv);
          console.log("yum")
        }
  },
  arrange: function(){
    for (var i=0; i< this.position.length; i++){
      var name = "#s" + i;
      $(name).css("top", this.position[i].top);
      $(name).css("left", this.position[i].left);
    }
  },
  turn: function(direction) {
    if ((this.direction == "down" && direction != "up") || 
        (this.direction == "up" && direction != "down") ||
        (this.direction == "right" && direction != "left") ||
        (this.direction == "left" && direction != "right")) {
      this.direction = direction;
        }
  }
  
};

$(document).ready(function() {
  food.arrange();
  
  $(document).keydown(function(event) {
    console.log(event.keyCode);
    if(event.keyCode == 40) {
      solidSnake1.turn("down");
    } else if (event.keyCode == 39) {
      solidSnake1.turn("right");
    } else if (event.keyCode == 37) {
      solidSnake1.turn("left");
    } else if (event.keyCode == 38) {
      solidSnake1.turn("up");
    }
    
  });
  
  setInterval(function(){
    if (state == PLAYING_STATE) {
      solidSnake1.slither();
      solidSnake1.arrange(); 
    }
 
  },350);

});






