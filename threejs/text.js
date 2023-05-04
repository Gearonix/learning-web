import * as THREE from 'three'
import {GLTFLoader} from "GLTFloader";
import {OrbitControls} from "orbitControls";
import THREEx from "./domEvents.js";

const {innerWidth : w, innerHeight : h} = window

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40 ,w / h, 1, 1000)

// scene.add(mesh)



const render = new THREE.WebGLRenderer({antialias: true})
const loader = new GLTFLoader()
const controls = new OrbitControls(camera, render.domElement);


controls.rotateSpeed = 0.05;
controls.enableZoom = true;

let GLTPmodel;
let model;


scene.background = new THREE.Color(0xdddddd)
render.setSize(w, h)
document.body.appendChild(render.domElement)

camera.position.z = 5


controls.addEventListener('change', () => {
    render.render(scene, camera)
});


const box = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00
})

const mesh = new THREE.Mesh(box, material)



// const hlight = new THREE.AmbientLight (0x404040,100);
// scene.add(hlight);
//
// const directionalLight = new THREE.DirectionalLight(0xffffff,100);
// directionalLight.position.set(0,1,0);
// directionalLight.castShadow = true;
// scene.add(directionalLight);
//
// const light = new THREE.PointLight(0xc4c4c4,10);
// light.position.set(0,300,500);
// scene.add(light);
//
// const light2 = new THREE.PointLight(0xc4c4c4,10);
// light2.position.set(500,100,0);
// scene.add(light2);
//
// const light3 = new THREE.PointLight(0xc4c4c4,10);
// light3.position.set(0,100,-500);
// scene.add(light3);
//
// const light4 = new THREE.PointLight(0xc4c4c4,10);
// light4.position.set(-500,300,500);
// scene.add(light4);


//LIGHTS FOR CAR AND STATIC OTHER MODELS!

const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
scene.add(hemiLight);
const light = new THREE.SpotLight(0xffa95c,4);
light.position.set(-50,50,50);
light.castShadow = true;
light.shadow.bias = -0.0001;
light.shadow.mapSize.width = 1024*4;
light.shadow.mapSize.height = 1024*4;
scene.add( light );

const ambientLight = new THREE.HemisphereLight(
    'white',
    'darkslategrey',
    15,
);

const mainLight = new THREE.DirectionalLight('white', 4);
mainLight.position.set(10, 10, 10);

scene.add(ambientLight)
scene.add(mainLight)


const array = mesh.geometry.attributes.position.array


let animateReq;

const clock = new THREE.Clock()

const animate = () => {
    animateReq = requestAnimationFrame(animate)
    render.render(scene,camera)
    // console.log(GLTPmodel?.scene?.rotatoin)
    if (model){
        model.rotation.z += 0.001
        const delta = clock.getDelta()
        model.tick(delta)
    }

}

let driveReq;

const drive = () => {
    driveReq = requestAnimationFrame(drive)
    render.render(scene,camera)
    if (model){
        model.position.x += 0.1
    }
    setTimeout(() => cancelAnimationFrame(driveReq), 400)
}

render.shadowMap.enabled = true;


var domEvents	= new THREEx.DomEvents(camera, render.domElement)

function setupModel(data) {
    const model = data.scene.children[0];
    const clip = data.animations[0];

    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.play();

    model.tick = (delta) => mixer.update(delta);

    return model;
}

loader.load('./sphere/scene.gltf', data => {
    model = setupModel(data)


    console.log(model)

    model.traverse(n => { if ( n.isMesh ) {
        n.castShadow = true;
        n.receiveShadow = true;
        if(n.material.map) n.material.map.anisotropy = 1;
    }});
    model.position.y = -1

    domEvents.addEventListener(model, 'click', () => {
        drive()
    }, false)

    scene.add(data.scene)
    // render.render(scene,camera)
    animate()
})


