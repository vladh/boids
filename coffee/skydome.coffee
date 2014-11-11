{vertexShader, fragmentShader} = require('./skydome_shaders')

makeSkydome = (radius) ->
  uniforms = {
    topColor: {type: "c", value: new THREE.Color(0x0077ff)}
    bottomColor: {type: "c", value: new THREE.Color(0xffffff)}
    offset: {type: "f", value: 33}
    exponent: {type: "f", value: 0.6}
  }
  uniforms.topColor.value.setHSL(0.6, 1, 0.6)

  geometry = new THREE.SphereGeometry(radius, 32, 15)
  material = new THREE.ShaderMaterial({
    vertexShader: vertexShader
    fragmentShader: fragmentShader
    uniforms: uniforms
    side: THREE.BackSide
  })

  skydome = new THREE.Mesh(geometry, material)
  return skydome

module.exports = makeSkydome
