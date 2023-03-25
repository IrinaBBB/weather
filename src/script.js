import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {TextureLoader} from "three";

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff);

const camera1 = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
const camera2 = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
const camera3 = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
const camera4 = new THREE.PerspectiveCamera(75, 1, 0.1, 100)

camera2.position.y = 0
camera1.position.z = 2

camera2.position.y = 1000
camera2.position.z = 1002

camera3.position.z = 2
camera3.position.y = 10

const canvas1 = document.getElementById('c1')
const canvas2 = document.getElementById('c2')
const canvas3 = document.getElementById('c3')
const canvas4 = document.getElementById('c4')


const renderer1 = new THREE.WebGLRenderer({canvas: canvas1})
renderer1.setSize(200, 200)
const renderer2 = new THREE.WebGLRenderer({canvas: canvas2})
renderer2.setSize(200, 200)
const renderer3 = new THREE.WebGLRenderer({canvas: canvas3})
renderer3.setSize(200, 200)
const renderer4 = new THREE.WebGLRenderer({canvas: canvas4})
renderer4.setSize(200, 200)


new OrbitControls(camera1, renderer1.domElement)
// new OrbitControls(camera2, renderer2.domElement)
// new OrbitControls(camera3, renderer3.domElement)

const textureLoader = new THREE.TextureLoader()

const geometry = new THREE.SphereGeometry(1.0, 50, 50)
const texture = await textureLoader.load('/img/water_long_small.svg');
const material =
    new THREE.MeshStandardMaterial({color: 0xffffff, map: texture});

const weatherSphere = new THREE.Mesh(geometry, material)

const temperatureSphere = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
    map: await textureLoader.load('/img/sunny.svg'),
}))
temperatureSphere.position.y = 1000
temperatureSphere.position.z = 1000

const cube3 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    wireframe: false,
}))
cube3.position.y = 10
scene.add(weatherSphere, temperatureSphere, cube3)


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.97)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0x0000ff, 0.2)
pointLight.position.x = 2
pointLight.position.y = 2
pointLight.position.z = 2
scene.add(pointLight)

// const pointLight2 = new THREE.PointLight(0xff0000, 0.2)
// pointLight2.position.x = 100
// pointLight2.position.y = 100
// pointLight2.position.z = 100
// scene.add(pointLight2)

const clock = new THREE.Clock()
function animate() {
    const elapsedTime = clock.getElapsedTime()
    requestAnimationFrame(animate)

    weatherSphere.rotation.y = (-70 * Math.PI / 180) + 0.1 * Math.sin(elapsedTime)
    weatherSphere.rotation.x = 0.1 * Math.sin(elapsedTime)
    weatherSphere.rotation.z = 0.1 * Math.sin(elapsedTime)

    temperatureSphere.rotation.y = (-90 * Math.PI / 180) + 0.1 * Math.sin(elapsedTime)
    temperatureSphere.rotation.x = 0.1 * Math.sin(elapsedTime)
    temperatureSphere.rotation.z = 0.1 * Math.sin(elapsedTime)
    //sphereTemperature.rotation.y = -0.8 + 0.1 * Math.sin(elapsedTime)
    //
    // cube2.rotation.x += 0.01
    // cube2.rotation.y += 0.01
    //
    // cube3.rotation.x += 0.01
    // cube3.rotation.y += 0.01

    render()
}
function render() {
    renderer1.render(scene, camera1)
    renderer2.render(scene, camera2)
    renderer3.render(scene, camera3)
    renderer4.render(scene, camera4)
}

animate()
