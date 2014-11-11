var helpers, perlinNoise, randomNoise;

helpers = require('./helpers');

randomNoise = function(_arg) {
  var canvas, ctx, heightSegments, i, imageData, pixels, rng, widthSegments, _i, _ref;
  widthSegments = _arg.widthSegments, heightSegments = _arg.heightSegments, rng = _arg.rng;
  canvas = helpers.makeCanvas(widthSegments, heightSegments);
  ctx = canvas.getContext('2d');
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  pixels = imageData.data;
  for (i = _i = 0, _ref = pixels.length; _i < _ref; i = _i += 4) {
    pixels[i] = pixels[i + 1] = pixels[i + 2] = (rng() * 256) | 0;
    pixels[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

perlinNoise = function(_arg) {
  var canvas, ctx, heightSegments, noise, noiseScalingFactor, ratio, rng, size, widthSegments, x, y;
  widthSegments = _arg.widthSegments, heightSegments = _arg.heightSegments, rng = _arg.rng, noiseScalingFactor = _arg.noiseScalingFactor;

  /*
  This part is based on the snippet:
  https://gist.github.com/donpark/1796361
   */
  rng = Math.random;
  noise = randomNoise({
    widthSegments: widthSegments,
    heightSegments: heightSegments,
    rng: rng
  });
  canvas = helpers.makeCanvas(widthSegments, heightSegments);
  ctx = canvas.getContext('2d');
  ctx.save();
  ratio = widthSegments / heightSegments;
  size = 4;
  while (size <= noise.height) {
    x = (rng() * (noise.width - size)) | 0;
    y = (rng() * (noise.height - size)) | 0;
    ctx.globalAlpha = 4 / size;
    ctx.drawImage(noise, Math.max(x, 0), y, size * ratio, size, 0, 0, widthSegments, heightSegments);
    size *= noiseScalingFactor;
  }
  ctx.restore();
  return canvas;
};

module.exports = perlinNoise;
