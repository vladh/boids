module.exports = function(container, camera, renderer) {
  return function() {
    var aspectRatio, height, width;
    width = container.offsetWidth;
    height = container.offsetHeight;
    aspectRatio = width / height;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
    return renderer.setSize(width, height);
  };
};
