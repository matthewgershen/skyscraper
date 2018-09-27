const Block = require("./block");

class Game {
  constructor() {
    let baseColorValue = Math.floor(Math.random() * 361);
    const bl = new Block (
      {x: 282, y: 526, width: 300, height: 50, color:"hsla(" + `${baseColorValue}` +", 73%, 50%, 1)", dx: 0, dy: 0 }
    );
    const sw = new Block (
      {x: 282, y: 80, width: 300, height: 50, color:"hsla(" + `${baseColorValue + 4}` +", 73%, 50%, 1)", dx: 1, dy: 0 }
    );
    this.baseBlocks = [bl];
    this.swingingBlock = sw;
    this.drop = false;
    this.collision = false;
    this.score = 0;
    this.gameOver = false;
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
      height: 50,
      color: "hsla(" + `${newColor}` + ", 73%, 50%, 1)",
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

  gameOverCheck(){
    let bottom = this.swingingBlock.y + this.swingingBlock.height;
    let top = this.baseBlocks[this.baseBlocks.length - 1].y + 2;
    if (bottom > top) {
      this.gameOver = true;
    }
  }


  gameOverResize(canvas){
    const newHeight = 50 * ((canvas.height/(this.score * 50)) * .75);
    const yAdj = (this.baseBlocks[0].y - (canvas.height - 50));
    this.baseBlocks.forEach((bl,idx)=>{
      bl.height = newHeight;
      bl.y = bl.y - yAdj + ((50 - newHeight)*(idx+1));
    });
  }

  draw(ctx, canvas, myVar){
    this.gameOverCheck();
    if (this.gameOver) {
      if (this.score > 5) {
        this.gameOverResize(canvas);
      }
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.baseBlocks.forEach((bl)=>{
      if (this.baseBlocks[this.baseBlocks.length-1].y < 300) {
        bl.y += .15;
        bl.draw(ctx);
      } else {
        bl.draw(ctx);
      }
    });
    this.swingingBlock.draw(ctx);

    if(this.swingingBlock.x + this.swingingBlock.dx > canvas.width-300 || this.swingingBlock.x + this.swingingBlock.dx < 0) {
       this.swingingBlock.dx = -this.swingingBlock.dx;
     }

   if (this.drop) {
     this.swingingBlock.dx = this.swingingBlock.dx*0.997;
     this.swingingBlock.dy = 1;
   }

   this.swingingBlock.x += this.swingingBlock.dx;
   this.swingingBlock.y += this.swingingBlock.dy;

  }

}

module.exports = Game;
