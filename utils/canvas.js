module.exports = {
  analise: async function (...img) {
    const {
      createCanvas,
      loadImage
    } = require('canvas')

    const canvas = createCanvas(128, 128);
    const ctx = canvas.getContext('2d');

    let image = await loadImage(img[0]);

    ctx.drawImage(image, 0, 0, 128, 128);

    image = await loadImage(img[1]);

    ctx.drawImage(image, 10, 10, 128, 128);

    return canvas.toBuffer();
  },

  addText: async function (img, text, color, font, fontSize) {
    const {
      createCanvas,
      loadImage,
      registerFont
    } = require('canvas');
    
    const CanvasTextWrapper = require('canvas-text-wrapper').CanvasTextWrapper;
    
    registerFont('Fonts/comic.ttf', {
      family: 'Comic Sans'
    })
    
    const image = await loadImage(img);

    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, 0, 0, image.width, image.height);
    ctx.fillStyle = '#ffffff';

    if (color) {
      ctx.fillStyle = color;
    }

    //wrapText(ctx, text, (canvas.width - 500), 450, 500, 45);
    CanvasTextWrapper(canvas, text, {
      strokeText: true,
      font: `${ fontSize ? fontSize : 45 }px ${ font }, Impact, sans-serif`,
      lineHeight: 1,
      textAlign: 'center',
      verticalAlign: 'bottom',
      paddingX: 12,
      paddingY: 12,
      fitParent: false,
      lineBreak: 'auto',
      sizeToFill: false,
      maxFontSizeToFill: false,
      allowNewLine: true,
      justifyLines: false,
      renderHDPI: true,
      textDecoration: 'none'
    });

    return canvas.toBuffer();
  },

  load: async (dataurl) => {
    const {
      createCanvas,
      loadImage
    } = require('canvas');

    const canvas = createCanvas(241, 241);
    const ctx = canvas.getContext('2d');

    const image = await loadImage(dataurl);

    ctx.drawImage(image, 0, 0, 241, 241);

    return canvas.toBuffer();
  }
}