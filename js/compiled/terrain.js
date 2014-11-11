var generateHeight, makeTerrain, makeTerrainGeometry;

generateHeight = function(width, height) {

  /*
  Modified from:
  http://mrdoob.github.io/three.js/examples/webgl_geometry_terrain.html
   */
  var data, i, maxQuality, maxZ, perlin, quality, scalingFactor, size, x, y, z, _, _i, _j;
  maxQuality = 4;
  maxZ = 100;
  scalingFactor = 1.75;
  z = Math.random() * maxZ;
  quality = 1;
  size = width * height;
  data = new Uint8Array(size);
  perlin = new ImprovedNoise();
  for (_ = _i = 0; 0 <= maxQuality ? _i < maxQuality : _i > maxQuality; _ = 0 <= maxQuality ? ++_i : --_i) {
    for (i = _j = 0; 0 <= size ? _j < size : _j > size; i = 0 <= size ? ++_j : --_j) {
      x = i % width;
      y = ~~(i / width);
      data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * scalingFactor);
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
