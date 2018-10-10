class Block {
  constructor(options) {
    this.img = new Image();
    this.img.src = './images/building_block.jpg';
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.dx = options.dx;
    this.dy = options.dy;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }



  removeOverhang(baseBlock){
    if (this.x > baseBlock.x) {
      this.width = baseBlock.x + baseBlock.width - this.x;
    } else {
      this.width = this.x + this.width - baseBlock.x;
      this.x = baseBlock.x;
    }
  }
}

module.exports = Block;
