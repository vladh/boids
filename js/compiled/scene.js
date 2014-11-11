var init, makeCamera, makeRenderer, makeScene;

makeScene = function(fogDistance) {
  var scene;
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xeeeeff, 1, fogDistance);
  scene.fog.color.setHSL(0.6, 0, 1);
  return scene;
};

makeCamera = function(width, height, far) {
  var aspectRatio, camera;
  aspectRatio = width / height;
  camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, far * 1.5);
  return camera;
};

makeRenderer = function() {
  var renderer;
  renderer = new THREE.WebGLRenderer({
    antialiasing: true,
    alpha: true
  });
  return renderer;
};

init = function(container, sceneSize) {
  var camera, height, renderer, scene, width;
  width = container.offsetWidth;
  height = container.offsetHeight;
  scene = makeScene(sceneSize);
  camera = makeCamera(width, height, sceneSize);
  renderer = makeRenderer();
  container.appendChild(renderer.domElement);
  return {
    scene: scene,
    camera: camera,
    renderer: renderer
  };
};

module.exports = init;
