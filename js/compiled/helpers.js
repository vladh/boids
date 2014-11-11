var makeCanvas;

makeCanvas = function(width, height) {
  var canvas;
  canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

module.exports = {
  makeCanvas: makeCanvas
};
