perlinNoise = require('./perlin_noise')

makeTerrainFaces = ({geometry, widthSegments, heightSegments}) ->

makeTerrainVertices = ({geometry, noise, width, height, depth}) ->
  positions = geometry.getAttribute('position').array

makeTerrainGeometry = ({width, height, widthSegments, heightSegments,
                        rng, noiseScalingFactor, depth}) ->
  noise = perlinNoise({widthSegments, heightSegments, rng, noiseScalingFactor})

  geometry = new THREE.BufferGeometry()
  nrPoints = width * height
  geometry.addAttribute('position', new THREE.Float32Attribute(nrPoints, 3))

  makeTerrainVertices({geometry, noise, width, height, depth})
  makeTerrainFaces({geometry, widthSegments, heightSegments})

  return geometry

makeTerrain = (geometry) ->
  material = new THREE.MeshPhongMaterial({
    ambient: 0xffffff
    color: 0xffffff
    specular: 0x050505
    shading: THREE.FlatShading
  })
  material.color.setHSL(0.09, 0.2, 0.4)
  terrain = new THREE.Mesh(geometry, material)
  terrain.rotation.x = -(Math.PI / 2)
  terrain.position.y = -33
  return terrain

init = ({width, height, widthSegments, heightSegments, rng,
         noiseScalingFactor, depth}) ->
  geometry = makeTerrainGeometry({width, height, widthSegments, heightSegments,
                                  rng, noiseScalingFactor, depth})
  terrain = makeTerrain(geometry)
  return terrain

module.exports = init
