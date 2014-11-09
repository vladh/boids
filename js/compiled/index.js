var animate, camera, container, controls, controlsEnabled, light, lights, render, renderer, scene, skydome, terrain, updateDimensions, _, _ref;

controlsEnabled = false;

container = document.getElementById('canvas-container');

_ref = require('./scene')(container), scene = _ref.scene, camera = _ref.camera, renderer = _ref.renderer;

if (controlsEnabled) {
  controls = new THREE.TrackballControls(camera);
}

terrain = require('./terrain')();

scene.add(terrain);

lights = require('./lights')();

for (_ in lights) {
  light = lights[_];
  scene.add(light);
}

skydome = require('./skydome')();

scene.add(skydome);

updateDimensions = require('./updateDimensions')(container, camera, renderer);

updateDimensions();

window.addEventListener('resize', updateDimensions, false);

animate = function() {
  requestAnimationFrame(animate);
  return render();
};

render = function() {
  var AUTOROTATION_AMOUNT;
  if (controlsEnabled) {
    controls.update();
  }
  AUTOROTATION_AMOUNT = 0.001;
  terrain.rotation.z += AUTOROTATION_AMOUNT;
  return renderer.render(scene, camera);
};

animate();
