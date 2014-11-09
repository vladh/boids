controlsEnabled = false
container = document.getElementById('canvas-container')

{scene, camera, renderer} = require('./scene')(container)
controls = new THREE.TrackballControls(camera) if controlsEnabled

terrain = require('./terrain')()
scene.add(terrain)

lights = require('./lights')()
scene.add(light) for _, light of lights

skydome = require('./skydome')()
scene.add(skydome)

updateDimensions = require('./updateDimensions')(container, camera, renderer)
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
