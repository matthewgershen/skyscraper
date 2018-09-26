const Block = require("./block");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");


  const bl = new Block (
    {x: 299, y: 430, width: 122, height: 50, color:"#FF0000", dx: 0, dy: 0 }
  );

  const sw = new Block (
    {x: 299, y: 80, width: 122, height: 50, color:"#0000FF", dx: 1, dy: 0 }
  );


  let drop = false;
  let collision = false;

  const keyDownHandler = (e) => {
    if (e.keyCode === 32) {
      drop = true;
    }
  };


  function collisionCheck(){
    if ((sw.x < bl.x + bl.width &&
   sw.x + sw.width > bl.x &&
   sw.y < bl.y + bl.height &&
   sw.y + sw.height > bl.y)) {
      collision = true;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bl.draw(ctx);
    sw.draw(ctx);
    if(sw.x + sw.dx > canvas.width-200 || sw.x + sw.dx < 100) {
       sw.dx = -sw.dx;
   }
    if (drop) {

      sw.dx = sw.dx*0.9975;
      sw.dy = 1;
    }

    sw.x += sw.dx;
    sw.y += sw.dy;

    collisionCheck();
    if (collision) {
      drop = false;
      sw.dx = 0;
      sw.dy = 0;
    }
  }



  document.addEventListener("keydown", keyDownHandler, false)
  setInterval(draw, 5);

});
