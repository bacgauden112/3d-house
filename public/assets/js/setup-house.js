/* eslint-disable no-undef */
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

const Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xf5986e,
  brownDark: 0x23190f,
  blue: 0x68c3c0,
};

window.addEventListener('load', init, false);
let canvas;
let scene;
let camera;
let renderer;
const heightBox = 1;
let widthBox = 1;

// const heightBoxInput = document.getElementById('heightBoxInput');
// heightBoxInput.step = '1';
// heightBoxInput.addEventListener('change', () => {
//   heightBox = heightBoxInput.value;
//   init();
// }, false);

const elmLivingRoomSlider = document.getElementById('living-room-slider');
elmLivingRoomSlider.step = '1';
elmLivingRoomSlider.addEventListener(
  'change',
  () => {
    document.getElementById(
      'inp-percent-lv-room'
    ).value = `${elmLivingRoomSlider.value}%`;
    widthBox = Math.ceil(+elmLivingRoomSlider.value / 20);
    console.log(widthBox);
    init();
  },
  false
);

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color('white');
  const width = window.innerWidth - 400;
  const height = window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
  camera.position.z = 5;

  canvas = document.querySelector('#canvas');
  renderer = new THREE.WebGLRenderer({
    canvas,
  });
  // renderer = new THREE.WebGLRenderer();

  renderer.setSize(width, height);
  document.getElementById('3d-screen').appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(1, 2, 2);
  controls.update();

  function addLight(...pos) {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...pos);
    scene.add(light);
  }
  addLight(-1, 2, 4);
  addLight(1, -1, -2);

  // const geometry = new THREE.BoxGeometry(3, 1.5, 1);
  const geometry = new THREE.BoxGeometry(widthBox, 1.5, 1);
  // const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  const material = new THREE.MeshPhongMaterial({
    color: 0x1c90ce,
    opacity: 0.4,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  //
  const map = new THREE.TextureLoader().load('./public/assets/images/logo.png');
  const material1 = new THREE.SpriteMaterial({
    map,
  });
  const sprite = new THREE.Sprite(material1);
  sprite.position.set(0.5, 0.5, 1);
  scene.add(sprite);
  //

  animate(cube);
}

function animate(cube) {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
init();
