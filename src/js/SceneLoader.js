import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class ModuleLoader {
    constructor(element) {
        this.path = "src/access/module/";
        this.loader = new GLTFLoader();
        this.loader.setPath(this.path);
    }

    createScene() {
        const container = document.querySelector('canvas.moduleThumb');
        this.mainEle = document.querySelector(".containerModule").getBoundingClientRect();
        this.paddingMobile = 10;
        this.paddingLaptop = 200;
        // 96% view port - padding left - padding right
        let width = window.innerWidth;
        let paddingDevice = width < 480 ? this.paddingMobile : this.paddingLaptop;
        const defaultWidth = window.innerWidth * 0.96 - ( paddingDevice * 2)
        const defaultHeight = window.innerHeight * 0.90 - (40 * 2) - 200;
 

        this.width = this.mainEle.width || defaultWidth;
        this.height = this.mainEle.height || defaultHeight;
        if (!container) return;
        const camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        camera.position.z = 2
        this.camera = camera;


        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
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

    loadModule(moduleName , isShow) {
        this.loader.load(`${moduleName}.glb`, (gltf) => {
            let mesh = gltf.scene.children[0];
            mesh.scale.set(3, 3, 3)
            let box = new THREE.Box3().setFromObject(mesh);
            let center = new THREE.Vector3();
            box.getCenter(center);
            mesh.position.sub(center);
            mesh.isObjectCustom = true;
            mesh.nameObject = moduleName;
            if(isShow){
                mesh.visible = true;
            }else{
                mesh.visible = false;
            }
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