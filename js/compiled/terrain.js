var generateHeight, makeTerrain, makeTerrainGeometry;

generateHeight = function(width, height) {
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
