class Background {
  constructor() {
    this.image = new Image ();
    this.image.src = './skyscraper_bg.jpg';
    this.x = 0;
    this.y = -3910;
    this.width = 890;
    this.height = 4477;
  }

  draw(ctx){
    ctx.drawImage(this.image, this.x , this.y, this.width, this.height + 20);
  }
}

module.exports = Background;
