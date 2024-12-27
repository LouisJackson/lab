precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
uniform float time;
uniform float amount;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vTexCoord;
  vec2 coord = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;
  uv = uv - 0.5;
  float angle = atan(uv.y, uv.x);
  float radius = length(uv) / 1.3;
  angle += radius * amount;
  vec2 shifted = radius * vec2(cos(angle), sin(angle));
  vec4 color = texture2D(tex0, (shifted + 0.5));

  // Generate Noise color
  float random = rand(coord * time);

  gl_FragColor = color;
  gl_FragColor.rgb = mix(color.rgb, vec3(random, random, random), 0.1);
}
