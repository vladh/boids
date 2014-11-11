controlsEnabled = false
container = document.getElementById('canvas-container')

TERRAIN_SIZE = 8000
TERRAIN_WIDTH = TERRAIN_SIZE
TERRAIN_HEIGHT = TERRAIN_SIZE
TERRAIN_SEGMENTS = TERRAIN_SIZE / 20
TERRAIN_HEIGHT_SEGMENTS = TERRAIN_SEGMENTS
TERRAIN_WIDTH_SEGMENTS = TERRAIN_SEGMENTS
SKYDOME_RADIUS = TERRAIN_SIZE

{scene, camera, renderer} = require('./scene')(container, TERRAIN_SIZE)
controls = new THREE.TrackballControls(camera) if controlsEnabled

{makeTerrain, generateHeight} = require('./terrain')
heightData = generateHeight(TERRAIN_WIDTH_SEGMENTS, TERRAIN_HEIGHT_SEGMENTS)
terrain = makeTerrain(TERRAIN_WIDTH, TERRAIN_HEIGHT,
                      TERRAIN_WIDTH_SEGMENTS, TERRAIN_HEIGHT_SEGMENTS,
                      heightData)
scene.add(terrain)

skydome = require('./skydome')(SKYDOME_RADIUS)
scene.add(skydome)

lights = require('./lights')()
scene.add(light) for _, light of lights

updateDimensions = require('./update_dimensions')(container, camera, renderer)
updateDimensions()
window.addEventListener('resize', updateDimensions, false)

render = ->
  requestAnimationFrame(render)
  controls.update() if controlsEnabled
  AUTOROTATION_AMOUNT = 0.001
  terrain.rotation.y += AUTOROTATION_AMOUNT
  renderer.render(scene, camera)

render()
