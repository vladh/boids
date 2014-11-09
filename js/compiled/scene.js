var init, makeCamera, makeRenderer, makeScene;

makeScene = function() {
  var scene;
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xeeeeff, 1, 4000);
  scene.fog.color.setHSL(0.6, 0, 1);
  return scene;
};

makeCamera = function(width, height) {
  var aspectRatio, camera;
  aspectRatio = width / height;
  camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 5000);
  camera.up = new THREE.Vector3(0, 1, 0);
  camera.position.y = 250;
  camera.rotation.x = -15 * Math.PI / 180;
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

init = function(container) {
  var camera, height, renderer, scene, width;
  width = container.offsetWidth;
  height = container.offsetHeight;
  scene = makeScene();
  camera = makeCamera(width, height);
  renderer = makeRenderer();
  container.appendChild(renderer.domElement);
  return {
    scene: scene,
    camera: camera,
    renderer: renderer
  };
};

module.exports = init;
