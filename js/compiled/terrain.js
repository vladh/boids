var init, makeTerrain, makeTerrainGeometry;

makeTerrainGeometry = function(width, height, widthSegments, heightSegments) {
  var X_OFFSET_DAMPEN, Y_OFFSET_DAMPEN, Z_OFFSET_DAMPEN, geometry, randSign, vertIndex, _i, _ref;
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
  geometry = new THREE.PlaneBufferGeometry(width, height, widthSegments, heightSegments);
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
