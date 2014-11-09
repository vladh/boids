makeTerrainGeometry = (width, height, widthSegments, heightSegments) ->
  geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
  X_OFFSET_DAMPEN = 0.5
  Y_OFFSET_DAMPEN = 0.1
  Z_OFFSET_DAMPEN = 0.02
  randSign = -> (Math.random() > 0.5) ? 1 : -1

  for vertIndex in [0...geometry.vertices.length]
    geometry.vertices[vertIndex].x += Math.random() / X_OFFSET_DAMPEN * randSign()
    geometry.vertices[vertIndex].y += Math.random() / Y_OFFSET_DAMPEN * randSign()
    geometry.vertices[vertIndex].z += Math.random() / Z_OFFSET_DAMPEN

  geometry.dynamic = true
  geometry.computeFaceNormals()
  geometry.computeVertexNormals()
  geometry.normalsNeedUpdate = true
  return geometry

makeTerrain = (geometry) ->
  uniforms = {
    heightMap: {type: 't', value: THREE.ImageUtils.loadTexture("img/height_normal.png")}
    multilayer: {type: 't', value: THREE.ImageUtils.loadTexture("img/multilayer3.jpg")}
    stencil: {type: 't', value: THREE.ImageUtils.loadTexture("img/stencils.jpg")}
    lightmap: {type: 't', value: THREE.ImageUtils.loadTexture("img/lightmap.jpg")}
    height: {type: 'f', value: 320}
    uvX: {type: 'i', value: 0}
    uvY: {type: 'i', value: 0}
    cellNumber: {type:'i', value: 64}
  }
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

init = ->
  TERRAIN_SIZE = 4000
  TERRAIN_SUBDIVISIONS = TERRAIN_SIZE / 50
  terrain = makeTerrain(makeTerrainGeometry(TERRAIN_SIZE,
                                            TERRAIN_SIZE,
                                            TERRAIN_SUBDIVISIONS,
                                            TERRAIN_SUBDIVISIONS))
  return terrain

module.exports = init
