makeCanvas = (width, height) ->
  canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas

module.exports = {makeCanvas}
