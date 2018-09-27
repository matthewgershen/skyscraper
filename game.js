const Block = require("./block");

class Game {
  constructor(canvas, ctx) {
    this.initialBlockHeight = 50;
    this.initialBlockWidth = 300;
    this.swingSpeed = 1.5;
    let baseColorValue = Math.floor(Math.random() * 361);
    const bl = new Block (
      {x: 282, y: canvas.height - this.initialBlockHeight, width: this.initialBlockWidth, height: this.initialBlockHeight, color:"hsla(" + `${baseColorValue}` +", 73%, 50%, 1)", dx: 0, dy: 0 }
    );
    const sw = new Block (
      {x: 282, y: 80, width: this.initialBlockWidth, height: this.initialBlockHeight, color:"hsla(" + `${baseColorValue + 4}` +", 73%, 50%, 1)", dx: this.swingSpeed, dy: 0 }
    );
    this.baseBlocks = [bl];
    this.swingingBlock = sw;
    this.drop = false;
    this.collision = false;
    this.score = 0;
    this.gameOver = false;
    this.canvas = canvas;
    this.ctx = ctx;
    this.addSwingingBlock = this.addSwingingBlock.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.collisionCheck = this.collisionCheck.bind(this);
    this.gameOverCheck = this.gameOverCheck.bind(this);
    this.gameOverResize = this.gameOverResize.bind(this);
  }

  addSwingingBlock() {
    let newColor = this.swingingBlock.incrementColor();
    let lastWidth = this.swingingBlock.width
    this.baseBlocks.push(this.swingingBlock);
    this.swingingBlock = new Block({
      x: 282,
      y: 80,
      width: lastWidth,
      height: this.initialBlockHeight,
      color: "hsla(" + `${newColor}` + ", 73%, 50%, 1)",
      dx: this.swingSpeed,
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

  gameOverCheck(){
    let bottom = this.swingingBlock.y + this.swingingBlock.height;
    let top = this.baseBlocks[this.baseBlocks.length - 1].y + 2;
    if (bottom > top) {
      this.gameOver = true;
    }
  }


  gameOverResize(){
    const newHeight = this.initialBlockHeight * ((this.canvas.height/(this.score * this.initialBlockHeight)) * 0.75);
    const yAdj = (this.baseBlocks[0].y - (this.canvas.height - this.initialBlockHeight));
    this.baseBlocks.forEach((bl,idx)=>{
      bl.height = newHeight;
      bl.y = bl.y - yAdj + ((this.initialBlockHeight - newHeight)*(idx+1));
    });
  }

  draw(myVar){
    this.gameOverCheck();
    if (this.gameOver) {
      if (this.score > 5) {
        this.gameOverResize();
      }
      this.swingingBlock.color = "hsla(0, 0%, 0%, 0)";
      clearInterval(myVar);
    }


    this.collisionCheck();
    if (this.collision) {
      this.score += 1;
      this.drop = false;
      this.swingingBlock.dx = 0;
      this.swingingBlock.dy = 0;
      this.collision = false;
      this.swingingBlock.removeOverhang(this.baseBlocks[this.baseBlocks.length - 1]);
      this.addSwingingBlock();
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.baseBlocks.forEach((bl)=>{
      if (this.baseBlocks[this.baseBlocks.length-1].y < this.canvas.height * 0.6) {
        bl.y += .15;
        bl.draw(this.ctx);
      } else {
        bl.draw(this.ctx);
      }
    });
    this.swingingBlock.draw(this.ctx);

    if(this.swingingBlock.x + this.swingingBlock.dx > this.canvas.width-this.swingingBlock.width || this.swingingBlock.x + this.swingingBlock.dx < 0) {
       this.swingingBlock.dx = -this.swingingBlock.dx;
     }

   if (this.drop) {
     this.swingingBlock.dx = this.swingingBlock.dx*0.997;
     this.swingingBlock.dy = 2;
   }

   this.swingingBlock.x += this.swingingBlock.dx;
   this.swingingBlock.y += this.swingingBlock.dy;

   this.ctx.font = "18px Arial";
   this.ctx.fillStyle = "black";
   this.ctx.fillText("Score: " + this.score, 20, 30);

   if (this.gameOver) {
     this.ctx.font = "30px Arial";
     this.ctx.fillStyle = "red";
     this.ctx.textAlign = "center";
     this.ctx.fillText("Game Over", this.canvas.width/2, 40);
   }

  }

}

module.exports = Game;
