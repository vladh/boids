makeScene = (fogDistance) ->
  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0xeeeeff, 1, fogDistance)
  scene.fog.color.setHSL(0.6, 0, 1)
  return scene

makeCamera = (width, height, far) ->
  aspectRatio = width / height
  camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, far * 1.5)
  # camera.up = new THREE.Vector3(0, 1, 0)
  camera.position.y = 2000
  camera.rotation.x = -30 * Math.PI / 180
  return camera

makeRenderer = () ->
  renderer = new THREE.WebGLRenderer({
    antialiasing: true
    alpha: true
  })
  return renderer

init = (container, sceneSize) ->
  width = container.offsetWidth
  height = container.offsetHeight

  scene = makeScene(sceneSize)
  camera = makeCamera(width, height, sceneSize)
  renderer = makeRenderer()

  container.appendChild(renderer.domElement)
  return {scene, camera, renderer}

module.exports = init
