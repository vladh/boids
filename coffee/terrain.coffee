generateHeight = (width, height) ->
  ###
  Modified from:
  http://mrdoob.github.io/three.js/examples/webgl_geometry_terrain.html
  ###
  maxQuality = 4
  maxZ = 100
  scalingFactor = 1.75

  z = Math.random() * maxZ
  quality = 1

  size = width * height
  data = new Uint8Array(size)
  perlin = new ImprovedNoise()

  for _ in [0...maxQuality]
    for i in [0...size]
      x = i % width
      y = ~~(i / width)
      data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * scalingFactor)
    quality *= 5

  return data

makeTerrainGeometry = (width, height, widthSegments, heightSegments, heightData) ->
  geometry = new THREE.PlaneBufferGeometry(width, height, widthSegments - 1,
                                                          heightSegments - 1)
  geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-(Math.PI / 2)))

  vertices = geometry.attributes.position.array
  for i in [0...vertices.length]
    vertices[(i * 3) + 1] = heightData[i] * 10

  return geometry

makeTerrain = (width, height, widthSegments, heightSegments, heightData) ->
  geometry = makeTerrainGeometry(width, height,
                                 widthSegments, heightSegments,
                                 heightData)
  material = new THREE.MeshPhongMaterial({
    color: 0xffffff
    shading: THREE.FlatShading
  })
  material.color.setHSL(0.09, 0.2, 0.4)
  terrain = new THREE.Mesh(geometry, material)
  return terrain

module.exports = {makeTerrain, generateHeight}
