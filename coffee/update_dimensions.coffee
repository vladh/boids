module.exports = (container, camera, renderer) ->
  return ->
    width = container.offsetWidth
    height = container.offsetHeight
    aspectRatio = width / height

    camera.aspect = aspectRatio
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
