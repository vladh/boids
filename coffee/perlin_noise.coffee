# Taken from jbouny/terrain-generator
# https://github.com/jbouny/terrain-generator/blob/6170efc96c425324408461947e6131b63bc6bdbc/generators/perlinnoise.js

helpers = require('./helpers')

randomNoise = ({widthSegments, heightSegments, rng}) ->
  canvas = helpers.makeCanvas(widthSegments, heightSegments)
  ctx = inCanvas.getContext('2d')
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  pixels = imageData.data

  for i in [0...pixels.length] by 4
    pixels[i] = pixels[i+1] = pixels[i+2] = (rng() * 256) | 0
    pixels[i+3] = 255

  ctx.putImageData(imageData, 0, 0)
  return inCanvas

perlinNoise = ({widthSegments, heightSegments, rng, noiseScalingFactor}) ->
  ###
  This part is based on the snippet:
  https://gist.github.com/donpark/1796361
  ###

  noise = randomNoise({widthSegments, heightSegments, rng})
  canvas = helpers.makeCanvas(widthSegments, heightSegments)
  ctx = canvas.getContext('2d')
  ctx.save()

  ratio = widthSegments / heightSegments

  # Scale random iterations onto the canvas to generate Perlin noise.
  size = 4
  while size <= noise.height
    x = (rng() * (noise.width - size)) | 0
    y = (rng() * (noise.height - size)) | 0
    ctx.globalAlpha = 4 / size
    ctx.drawImage(noise, Math.max(x, 0), y, size * ratio, size, 0, 0, widthSegments, heightSegments)
    size *= noiseScalingFactor

  ctx.restore()

  return canvas

module.exports = perlinNoise
