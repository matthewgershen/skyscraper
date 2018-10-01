class Block {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
    this.dx = options.dx;
    this.dy = options.dy;
  }

  draw(ctx) {
    // var img= new Image ();
    // img.src = './test4.png';
    // var pat=ctx.createPattern(img,"repeat");

    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    // ctx.fillStyle=pat;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  incrementColor(){
    let end = this.color.indexOf(",");
    let colorValue = parseInt(this.color.slice(5,end));
    colorValue += 4;
    colorValue = (colorValue % 360);
    return colorValue;
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
