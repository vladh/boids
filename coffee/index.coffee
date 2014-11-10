controlsEnabled = false
container = document.getElementById('canvas-container')
rngDefault = require('./rng_default')

{scene, camera, renderer} = require('./scene')(container)
controls = new THREE.TrackballControls(camera) if controlsEnabled

terrain = require('./terrain')({
  width: 4000
  height: 4000
  widthSegments: 80
  heightSegments: 80
  depth: 200
  rng: rngDefault
  noiseScalingFactor: 3
})
scene.add(terrain)

lights = require('./lights')()
scene.add(light) for _, light of lights

skydome = require('./skydome')()
scene.add(skydome)

updateDimensions = require('./update_dimensions')(container, camera, renderer)
updateDimensions()
window.addEventListener('resize', updateDimensions, false)

animate = ->
  requestAnimationFrame(animate)
  render()

render = ->
  controls.update() if controlsEnabled
  AUTOROTATION_AMOUNT = 0.001
  terrain.rotation.z += AUTOROTATION_AMOUNT
  renderer.render(scene, camera)

animate()
