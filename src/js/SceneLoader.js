import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class ModuleLoader {
    constructor(element) {
        this.path = "src/access/module/";
    }

    createScene() {
        const container = document.querySelector('canvas.moduleThumb');
        this.mainEle = document.querySelector(".containerModule").getBoundingClientRect();
        this.width = this.mainEle.width || 350;
        this.height = this.mainEle.height || 400;
        if (!container) return;
        const camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        camera.position.z = 2
        this.camera = camera;


        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1B1B1B);
        this.scene = scene;

        const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
        dirLight1.position.set(1, 0.75, 0.75);
        this.scene.add(dirLight1);

        const ambetLight = new THREE.AmbientLight(0xffffff, 1)
        this.scene.add(ambetLight)

        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: container });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(this.width, this.height);
        this.renderer = renderer;

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        return;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    loadModule(moduleName) {
        const loader = new GLTFLoader();
        loader.setPath(this.path);
        loader.load(`${moduleName}.glb`, (gltf) => {
            let mesh = gltf.scene.children[0];
            mesh.scale.set(3, 3, 3)
            let box = new THREE.Box3().setFromObject(mesh);
            let center = new THREE.Vector3();
            box.getCenter(center);
            mesh.position.sub( center );
            mesh.isObjectCustom = true;
            mesh.nameObject = moduleName
            this.scene.add(mesh);
            this.animate();
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.controls.update();
        this.render();
    }
    updateModule() {
    }
}