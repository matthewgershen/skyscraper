class Background {
  constructor(options) {
    this.image = new Image ();
    this.image.src = './space_man2.jpg';
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
  }

  draw(ctx){
    ctx.drawImage(this.image, this.x , this.y, this.width, this.height + 20);
  }
}

module.exports = Background;
