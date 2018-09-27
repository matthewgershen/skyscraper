const Block = require("./block");

class Game {
  constructor() {
    const bl = new Block (
      {x: 299, y: 430, width: 122, height: 50, color:"#FF0000", dx: 0, dy: 0 }
    );
    const sw = new Block (
      {x: 299, y: 80, width: 122, height: 50, color:"#0000FF", dx: 1, dy: 0 }
    );
    this.baseBlocks = [bl];
    this.swingingBlock = sw;
    this.drop = false;
    this.collision = false;
    this.addSwingingBlock = this.addSwingingBlock.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.collisionCheck = this.collisionCheck.bind(this);
  }

  addSwingingBlock() {
    this.baseBlocks.push(this.swingingBlock);
    this.swingingBlock = new Block({
      x: 299,
      y: 80,
      width: 122,
      height: 50,
      color:"#0000FF",
      dx: 1,
      dy: 0
    });
  }

  keyDownHandler(e){
    if (e.keyCode === 32) {
      this.drop = true;
    }
  }

  collisionCheck(){
    if ((this.swingingBlock.x < this.baseBlocks[this.baseBlocks.length - 1].x + this.baseBlocks[this.baseBlocks.length - 1].width &&
   this.swingingBlock.x + this.swingingBlock.width > this.baseBlocks[this.baseBlocks.length - 1].x &&
   this.swingingBlock.y < this.baseBlocks[this.baseBlocks.length - 1].y + this.baseBlocks[this.baseBlocks.length - 1].height &&
   this.swingingBlock.y + this.swingingBlock.height > this.baseBlocks[this.baseBlocks.length - 1].y)) {
      this.collision = true;
    }
  }

  draw(ctx, canvas){
    if (this.collision) {
      this.drop = false;
      this.collision = false;
      this.addSwingingBlock();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.baseBlocks.forEach((bl)=>{
      bl.draw(ctx);
    });
    this.swingingBlock.draw(ctx);

    if(this.swingingBlock.x + this.swingingBlock.dx > canvas.width-200 || this.swingingBlock.x + this.swingingBlock.dx < 100) {
       this.swingingBlock.dx = -this.swingingBlock.dx;
     }

   if (this.drop) {
     this.swingingBlock.dx = this.swingingBlock.dx*0.9975;
     this.swingingBlock.dy = 1;
   }

   this.swingingBlock.x += this.swingingBlock.dx;
   this.swingingBlock.y += this.swingingBlock.dy;

   this.collisionCheck();

   if (this.collision) {
     this.drop = false;
     this.swingingBlock.dx = 0;
     this.swingingBlock.dy = 0;
   }

  }

}

module.exports = Game;
