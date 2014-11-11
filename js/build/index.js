(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var SKYDOME_RADIUS, TERRAIN_HEIGHT, TERRAIN_HEIGHT_SEGMENTS, TERRAIN_SEGMENTS, TERRAIN_SIZE, TERRAIN_WIDTH, TERRAIN_WIDTH_SEGMENTS, camera, container, controls, controlsEnabled, generateHeight, heightData, light, lights, makeTerrain, render, renderer, scene, skydome, terrain, updateDimensions, _, _ref, _ref1;

controlsEnabled = false;

container = document.getElementById('canvas-container');

TERRAIN_SIZE = 8000;

TERRAIN_WIDTH = TERRAIN_SIZE;

TERRAIN_HEIGHT = TERRAIN_SIZE;

TERRAIN_SEGMENTS = TERRAIN_SIZE / 20;

TERRAIN_HEIGHT_SEGMENTS = TERRAIN_SEGMENTS;

TERRAIN_WIDTH_SEGMENTS = TERRAIN_SEGMENTS;

SKYDOME_RADIUS = TERRAIN_SIZE;

_ref = require('./scene')(container, TERRAIN_SIZE), scene = _ref.scene, camera = _ref.camera, renderer = _ref.renderer;

if (controlsEnabled) {
  controls = new THREE.TrackballControls(camera);
}

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
  if (controlsEnabled) {
    controls.update();
  }
  AUTOROTATION_AMOUNT = 0.001;
  terrain.rotation.y += AUTOROTATION_AMOUNT;
  return renderer.render(scene, camera);
};

render();

},{"./lights":2,"./scene":3,"./skydome":4,"./terrain":6,"./update_dimensions":7}],2:[function(require,module,exports){
var init, makeDirLight, makeHemiLight;

makeHemiLight = function() {
  var hemiLight;
  hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.3);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  hemiLight.position.set(0, 500, 0);
  return hemiLight;
};

makeDirLight = function() {
  var dirLight;
  dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.color.setHSL(0.1, 1, 0.95);
  dirLight.position.set(-1, 1.75, 1);
  return dirLight;
};

init = function() {
  return {
    hemiLight: makeHemiLight(),
    dirLight: makeDirLight()
  };
};

module.exports = init;

},{}],3:[function(require,module,exports){
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
  camera.position.y = 2000;
  camera.rotation.x = -30 * Math.PI / 180;
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

},{}],4:[function(require,module,exports){
var fragmentShader, makeSkydome, vertexShader, _ref;

_ref = require('./skydome_shaders'), vertexShader = _ref.vertexShader, fragmentShader = _ref.fragmentShader;

makeSkydome = function(radius) {
  var geometry, material, skydome, uniforms;
  uniforms = {
    topColor: {
      type: "c",
      value: new THREE.Color(0x0077ff)
    },
    bottomColor: {
      type: "c",
      value: new THREE.Color(0xffffff)
    },
    offset: {
      type: "f",
      value: 33
    },
    exponent: {
      type: "f",
      value: 0.6
    }
  };
  uniforms.topColor.value.setHSL(0.6, 1, 0.6);
  geometry = new THREE.SphereGeometry(radius, 32, 15);
  material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms,
    side: THREE.BackSide
  });
  skydome = new THREE.Mesh(geometry, material);
  return skydome;
};

module.exports = makeSkydome;

},{"./skydome_shaders":5}],5:[function(require,module,exports){
module.exports = {
  vertexShader: "varying vec3 vWorldPosition;\n\nvoid main() {\n  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n  vWorldPosition = worldPosition.xyz;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
  fragmentShader: "uniform vec3 topColor;\nuniform vec3 bottomColor;\nuniform float offset;\nuniform float exponent;\n\nvarying vec3 vWorldPosition;\n\nvoid main() {\n  float h = normalize( vWorldPosition + offset ).y;\n  gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );\n}"
};

},{}],6:[function(require,module,exports){
var generateHeight, makeTerrain, makeTerrainGeometry;

generateHeight = function(width, height) {

  /*
  http://mrdoob.github.io/three.js/examples/webgl_geometry_terrain.html
   */
  var data, i, j, perlin, quality, size, x, y, z, _i, _j;
  size = width * height;
  data = new Uint8Array(size);
  perlin = new ImprovedNoise();
  quality = 1;
  z = Math.random() * 100;
  for (j = _i = 0; _i < 4; j = ++_i) {
    for (i = _j = 0; 0 <= size ? _j < size : _j > size; i = 0 <= size ? ++_j : --_j) {
      x = i % width;
      y = ~~(i / width);
      data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * 1.75);
    }
    quality *= 5;
  }
  return data;
};

makeTerrainGeometry = function(width, height, widthSegments, heightSegments, heightData) {
  var geometry, i, vertices, _i, _ref;
  geometry = new THREE.PlaneBufferGeometry(width, height, widthSegments - 1, heightSegments - 1);
  geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-(Math.PI / 2)));
  vertices = geometry.attributes.position.array;
  for (i = _i = 0, _ref = vertices.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
    vertices[(i * 3) + 1] = heightData[i] * 10;
  }
  return geometry;
};

makeTerrain = function(width, height, widthSegments, heightSegments, heightData) {
  var geometry, material, terrain;
  geometry = makeTerrainGeometry(width, height, widthSegments, heightSegments, heightData);
  material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });
  material.color.setHSL(0.09, 0.2, 0.4);
  terrain = new THREE.Mesh(geometry, material);
  return terrain;
};

module.exports = {
  makeTerrain: makeTerrain,
  generateHeight: generateHeight
};

},{}],7:[function(require,module,exports){
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

},{}]},{},[1])