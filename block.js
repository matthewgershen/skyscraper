class Block {
  constructor(options) {
    // this.img = new Image();
    // this.img.src = './hmm.png';
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
    this.dx = options.dx;
    this.dy = options.dy;
  }

  draw(ctx) {
    // ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  incrementColor(){
    let idx = this.color.indexOf(",");
    let colorValue = parseInt(this.color.slice(5,idx));
    let beginning = this.color.slice(0,5);
    let end = this.color.slice(idx,this.color.length)
    colorValue += 4;
    colorValue = (colorValue % 360);
    return beginning + colorValue + end;
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
