const APP = {
  canvas: null,
  ctx: null,
  img: null,
  currentColor: "rgb(187,187,175)",
  data: null,
  init: function () {
    APP.displayColor();
    APP.canvas = document.querySelector("#canvas");
    APP.ctx = canvas.getContext("2d");
    APP.setCanvasDimension();

    APP.img = new Image();
    APP.img.src = "./images/nature.jpg";
    APP.img.alt = "random_img";
    APP.img.addEventListener("load", APP.imageLoaded);
    window.addEventListener("resize", () => {
      // set the canvas redraw the image
      APP.setCanvasDimension();
      APP.drawImage();
    });
  },
  imageLoaded: function (ev) {
    APP.drawImage();
    APP.canvas.addEventListener("mousemove", APP.drawHoverColor);
    APP.canvas.addEventListener("click", APP.displayColor);
  },

  drawHoverColor(ev) {
    let x = ev.offsetX;
    let y = ev.offsetY;

    if (x < 0 || y < 0 || x >= APP.canvas.width || y >= APP.canvas.height)
      return; // subject to checking

    // console.log(x, y)

    let pixel = APP.getColor(x, y);
    let clr = `rgb(${pixel.red}, ${pixel.green}, ${pixel.blue})`;

    // add color:

    APP.ctx.fillStyle = clr;
    APP.ctx.strokeStyle = "white";
    APP.ctx.strokeWidth = 2;
    APP.ctx.fillRect(0, 0, APP.canvas.width / 12, APP.canvas.width / 12);
    APP.ctx.strokeRect(0, 0, APP.canvas.width / 12, APP.canvas.width / 12);

    // store the recent color
    APP.currentColor = clr;
  },

  displayColor(clr) {
    document.body.style.background = APP.currentColor;
    document.body.setAttribute("data-color", APP.currentColor);
  },

  getData() {
    APP.data = APP.ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  },

  getColor(x, y) {
    let red = y * APP.canvas.width * 4 + x * 4; // returns current pixel red index
    APP.getData();
    return {
      red: APP.data[red],
      green: APP.data[red + 1],
      blue: APP.data[red + 2],
      alpha: APP.data[red + 3],
    };
  },

  drawImage() {
    let img = APP.img;
    let nw = img.naturalWidth;
    let nh = img.naturalHeight;
    let w = APP.canvas.width;
    let h = w * (nh / nw);
    // set height of canvas
    APP.canvas.height = h;
    APP.ctx.drawImage(img, 0, 0, w, h);
  },

  setCanvasDimension() {
    APP.canvas.width = window.innerWidth * 0.6; // 60% width of window;
  },
};

document.addEventListener("DOMContentLoaded", APP.init);

