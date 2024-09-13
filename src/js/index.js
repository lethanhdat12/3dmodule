import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const $ = (selector) => document.querySelector(selector)
export const $$ = (selector) => document.querySelectorAll(selector)

const Path = "src/access/module/";
const canvas = document.querySelector('canvas.webgl');

let scene, camera, dirLight1, amberLight, renderer, controls;

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);


    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 1, 2)
    camera.position.z = 100;

    dirLight1 = new THREE.DirectionalLight(0xffddcc, 3);
    dirLight1.position.set(1, 0.75, 0.75);
    scene.add(dirLight1);

    amberLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(amberLight)

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    renderer.render(scene, camera);
}


export function onLoadAbout() {
    init();
    animate()
    const logoClick = document.querySelector("#logo")
    logoClick.addEventListener("click", () => {
        const about = $(".about");
        const navItemActive = $(".nav-item.active");
        const rooms = $$(".room-item");
        rooms.forEach((i) => {
            i.classList.remove("show")
            i.classList.add("hidden")
        })
        navItemActive.classList.remove("active")
        about.classList.add("show")
        const loader = new GLTFLoader();
        loader.setPath(Path);
        loader.load('ben_nha_rong.glb', function (gltf) {
            let mesh = gltf.scene.children[0];
            let box = new THREE.Box3().setFromObject(mesh);
            let center = new THREE.Vector3();
            box.getCenter(center);
            mesh.position.sub(center);
            scene.add(mesh);
        });
    })
}


