(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./lights":2,"./scene":3,"./skydome":4,"./terrain":6,"./updateDimensions":7}],2:[function(require,module,exports){
var init, makeDirLight, makeHemiLight;

makeHemiLight = function() {
  var hemiLight;
  hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
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

},{}],4:[function(require,module,exports){
var fragmentShader, makeSkydome, vertexShader, _ref;

_ref = require('./skydome_shaders'), vertexShader = _ref.vertexShader, fragmentShader = _ref.fragmentShader;

makeSkydome = function() {
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
  geometry = new THREE.SphereGeometry(2000, 32, 15);
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
var init, makeTerrain, makeTerrainGeometry;

makeTerrainGeometry = function(width, height, widthSegments, heightSegments) {
  var X_OFFSET_DAMPEN, Y_OFFSET_DAMPEN, Z_OFFSET_DAMPEN, geometry, randSign, vertIndex, _i, _ref;
  geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
  X_OFFSET_DAMPEN = 0.5;
  Y_OFFSET_DAMPEN = 0.1;
  Z_OFFSET_DAMPEN = 0.02;
  randSign = function() {
    var _ref;
    return (_ref = Math.random() > 0.5) != null ? _ref : {
      1: -1
    };
  };
  for (vertIndex = _i = 0, _ref = geometry.vertices.length; 0 <= _ref ? _i < _ref : _i > _ref; vertIndex = 0 <= _ref ? ++_i : --_i) {
    geometry.vertices[vertIndex].x += Math.random() / X_OFFSET_DAMPEN * randSign();
    geometry.vertices[vertIndex].y += Math.random() / Y_OFFSET_DAMPEN * randSign();
    geometry.vertices[vertIndex].z += Math.random() / Z_OFFSET_DAMPEN;
  }
  geometry.dynamic = true;
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  geometry.normalsNeedUpdate = true;
  return geometry;
};

makeTerrain = function(geometry) {
  var material, terrain, uniforms;
  uniforms = {
    heightMap: {
      type: 't',
      value: THREE.ImageUtils.loadTexture("img/height_normal.png")
    },
    multilayer: {
      type: 't',
      value: THREE.ImageUtils.loadTexture("img/multilayer3.jpg")
    },
    stencil: {
      type: 't',
      value: THREE.ImageUtils.loadTexture("img/stencils.jpg")
    },
    lightmap: {
      type: 't',
      value: THREE.ImageUtils.loadTexture("img/lightmap.jpg")
    },
    height: {
      type: 'f',
      value: 320
    },
    uvX: {
      type: 'i',
      value: 0
    },
    uvY: {
      type: 'i',
      value: 0
    },
    cellNumber: {
      type: 'i',
      value: 64
    }
  };
  material = new THREE.MeshPhongMaterial({
    ambient: 0xffffff,
    color: 0xffffff,
    specular: 0x050505,
    shading: THREE.FlatShading
  });
  material.color.setHSL(0.09, 0.2, 0.4);
  terrain = new THREE.Mesh(geometry, material);
  terrain.rotation.x = -(Math.PI / 2);
  terrain.position.y = -33;
  return terrain;
};

init = function() {
  var TERRAIN_SIZE, TERRAIN_SUBDIVISIONS, terrain;
  TERRAIN_SIZE = 4000;
  TERRAIN_SUBDIVISIONS = TERRAIN_SIZE / 50;
  terrain = makeTerrain(makeTerrainGeometry(TERRAIN_SIZE, TERRAIN_SIZE, TERRAIN_SUBDIVISIONS, TERRAIN_SUBDIVISIONS));
  return terrain;
};

module.exports = init;

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