var AUTOROTATION_ENABLED, CONTROLS_ENABLED, SKYDOME_RADIUS, TERRAIN_HEIGHT, TERRAIN_HEIGHT_SEGMENTS, TERRAIN_SEGMENTS, TERRAIN_SIZE, TERRAIN_WIDTH, TERRAIN_WIDTH_SEGMENTS, camera, clock, container, controls, generateHeight, heightData, light, lights, makeTerrain, render, renderer, scene, skydome, terrain, updateDimensions, _, _ref, _ref1;

container = document.getElementById('canvas-container');

CONTROLS_ENABLED = true;

AUTOROTATION_ENABLED = false;

TERRAIN_SIZE = 8000;

TERRAIN_WIDTH = TERRAIN_SIZE;

TERRAIN_HEIGHT = TERRAIN_SIZE;

TERRAIN_SEGMENTS = TERRAIN_SIZE / 20;

TERRAIN_HEIGHT_SEGMENTS = TERRAIN_SEGMENTS;

TERRAIN_WIDTH_SEGMENTS = TERRAIN_SEGMENTS;

SKYDOME_RADIUS = TERRAIN_SIZE;

clock = new THREE.Clock();

_ref = require('./scene')(container, TERRAIN_SIZE), scene = _ref.scene, camera = _ref.camera, renderer = _ref.renderer;

if (CONTROLS_ENABLED) {
  controls = new THREE.FirstPersonControls(camera);
}

controls.movementSpeed = 1000;

controls.lookSpeed = 0.1;

_ref1 = require('./terrain'), makeTerrain = _ref1.makeTerrain, generateHeight = _ref1.generateHeight;

heightData = generateHeight(TERRAIN_WIDTH_SEGMENTS, TERRAIN_HEIGHT_SEGMENTS);

terrain = makeTerrain(TERRAIN_WIDTH, TERRAIN_HEIGHT, TERRAIN_WIDTH_SEGMENTS, TERRAIN_HEIGHT_SEGMENTS, heightData);

scene.add(terrain);

skydome = require('./skydome')(SKYDOME_RADIUS);

scene.add(skydome);

lights = require('./lights')();

for (_ in lights) {
  light = lights[_];
  scene.add(light);
}

updateDimensions = require('./update_dimensions')(container, camera, renderer);

updateDimensions();

window.addEventListener('resize', updateDimensions, false);

render = function() {
  var AUTOROTATION_AMOUNT;
  requestAnimationFrame(render);
  if (CONTROLS_ENABLED) {
    controls.update(clock.getDelta());
  }
  AUTOROTATION_AMOUNT = 0.001;
  if (AUTOROTATION_ENABLED) {
    terrain.rotation.y += AUTOROTATION_AMOUNT;
  }
  return renderer.render(scene, camera);
};

render();
