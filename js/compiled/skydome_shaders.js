module.exports = {
  vertexShader: "varying vec3 vWorldPosition;\n\nvoid main() {\n  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n  vWorldPosition = worldPosition.xyz;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
  fragmentShader: "uniform vec3 topColor;\nuniform vec3 bottomColor;\nuniform float offset;\nuniform float exponent;\n\nvarying vec3 vWorldPosition;\n\nvoid main() {\n  float h = normalize( vWorldPosition + offset ).y;\n  gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );\n}"
};
