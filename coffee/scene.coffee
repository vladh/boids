makeScene = ->
  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0xeeeeff, 1, 4000)
  scene.fog.color.setHSL(0.6, 0, 1)
  return scene

makeCamera = (width, height) ->
  aspectRatio = width / height
  camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 5000)
  camera.up = new THREE.Vector3(0, 1, 0)
  camera.position.y = 250
  camera.rotation.x = -15 * Math.PI / 180
  return camera

makeRenderer = () ->
  renderer = new THREE.WebGLRenderer({
    antialiasing: true
    alpha: true
  })
  return renderer

init = (container) ->
  width = container.offsetWidth
  height = container.offsetHeight

  scene = makeScene()
  camera = makeCamera(width, height)
  renderer = makeRenderer()

  container.appendChild(renderer.domElement)
  return {scene, camera, renderer}

module.exports = init
