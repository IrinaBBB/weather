import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {TextureLoader} from "three";

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff);

const rainyCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
const sunnyCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
const temperatureColdCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
const temperatureHotCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)

const canvas1 = document.getElementById('rainySphere')
const canvas2 = document.getElementById('sunnySphere')
const canvas3 = document.getElementById('temperatureColdSphere')
const canvas4 = document.getElementById('temperatureHotSphere')


const renderer1 = new THREE.WebGLRenderer({canvas: canvas1})
renderer1.setSize(200, 200)
const renderer2 = new THREE.WebGLRenderer({canvas: canvas2})
renderer2.setSize(200, 200)
const renderer3 = new THREE.WebGLRenderer({canvas: canvas3})
renderer3.setSize(200, 200)
const renderer4 = new THREE.WebGLRenderer({canvas: canvas4})
renderer4.setSize(200, 200)


//new OrbitControls(rainyCamera, renderer1.domElement)
// new OrbitControls(camera2, renderer2.domElement)
// new OrbitControls(camera3, renderer3.domElement)

const textureLoader = new THREE.TextureLoader()

const geometry = new THREE.SphereGeometry(1.0, 50, 50)
const texture = await textureLoader.load('/img/rainy.svg');
const material =
    new THREE.MeshStandardMaterial({color: 0xffffff, map: texture});


/**
 * Rainy Sphere
 */
const rainySphere = new THREE.Mesh(geometry, material)

rainySphere.position.x = 0

rainyCamera.position.y = 0
rainyCamera.position.z = 2


/**
 * Sunny Sphere
 */
const sunnySphere = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
    map: await textureLoader.load('/img/sunny.svg'),
}))
sunnySphere.position.y = 5

sunnyCamera.position.y = 5
sunnyCamera.position.z = 2

/**
 * Temperature Cold Sphere
 */
const temperatureColdSphere = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
    map: await textureLoader.load('/img/temperature-cold.svg'),
}))
temperatureColdSphere.position.y = 10

temperatureColdCamera.position.y = 10
temperatureColdCamera.position.z = 2


/**
 * Temperature Hot Sphere
 */
const temperatureHotSphere = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
    map: await textureLoader.load('/img/temperature-hot.svg'),
}))
temperatureHotSphere.position.y = 15

temperatureHotCamera.position.y = 15
temperatureHotCamera.position.z = 2

scene.add(rainySphere, sunnySphere, temperatureColdSphere, temperatureHotSphere)

/**
 * Temperature Zero Sphere
 */
const temperatureZeroCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
const temperatureZeroCanvas = document.getElementById('temperatureZeroSphere')

const temperatureZeroRenderer = new THREE.WebGLRenderer({canvas: temperatureZeroCanvas})
temperatureZeroRenderer.setSize(200, 200)

const temperatureZeroSphere = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
    map: await textureLoader.load('/img/temperature-zero.svg'),
}))

temperatureZeroSphere.position.y = 20

temperatureZeroCamera.position.y = 20
temperatureZeroCamera.position.z = 2

scene.add(temperatureZeroSphere)

/**
 * Cloudy Sphere
 */
const cloudyCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
const cloudyCanvas = document.getElementById('cloudySphere')

const cloudyRenderer = new THREE.WebGLRenderer({canvas: cloudyCanvas})
cloudyRenderer.setSize(200, 200)

const cloudySphere = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
    map: await textureLoader.load('/img/cloudy.svg'),
}))

cloudySphere.position.y = 35

cloudyCamera.position.y = 35
cloudyCamera.position.z = 2

scene.add(cloudySphere)

/**
 * Partly Cloudy
 */
const partlyCloudyCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
const partlyCloudyCanvas = document.getElementById('partlyCloudySphere')

const partlyCloudyRenderer = new THREE.WebGLRenderer({canvas: partlyCloudyCanvas})
partlyCloudyRenderer.setSize(200, 200)

const partlyCloudySphere = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
    map: await textureLoader.load('/img/partly-cloudy.svg'),
}))

partlyCloudySphere.position.y = 25

partlyCloudyCamera.position.y = 25
partlyCloudyCamera.position.z = 2

scene.add(partlyCloudySphere)

/**
 * Snowy Sphere
 */
const snowyCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
const snowyCanvas = document.getElementById('snowySphere')

const snowyRenderer = new THREE.WebGLRenderer({canvas: snowyCanvas})
snowyRenderer.setSize(200, 200)

const snowySphere = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
    map: await textureLoader.load('/img/snowy.svg'),
}))

snowySphere.position.y = 30

snowyCamera.position.y = 30
snowyCamera.position.z = 2
scene.add(snowySphere)

/**
 * Precipitations Sphere
 */
const precipitationsCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
const precipitationsCanvas = document.getElementById('precipitationsSphere')

const precipitationsRenderer = new THREE.WebGLRenderer({canvas: precipitationsCanvas})
precipitationsRenderer.setSize(200, 200)

const precipitationsSphere = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
    map: await textureLoader.load('/img/precipitations.svg'),
}))

precipitationsSphere.position.y = 40

precipitationsCamera.position.y = 40
precipitationsCamera.position.z = 2

scene.add(precipitationsSphere)

/**
 * Wind Sphere
 */
const windCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
const windCanvas = document.getElementById('windSphere')

const windRenderer = new THREE.WebGLRenderer({canvas: windCanvas})
windRenderer.setSize(200, 200)

const windSphere = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
    map: await textureLoader.load('/img/wind.svg'),
}))

windSphere.position.y = 45

windCamera.position.y = 45
windCamera.position.z = 2

scene.add(windSphere)


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.96)
scene.add(ambientLight)

// const light = new THREE.HemisphereLight( 0xff0000, 0x0000ff, 0.9);
// light.position.y = 100
// scene.add( light );

const pointLight = new THREE.PointLight(0x0000ff, 0.2)
pointLight.position.x = 2
pointLight.position.z = 2
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff0000, 0.2)
pointLight2.position.x = -2
pointLight2.position.z = 2
scene.add(pointLight2)

const clock = new THREE.Clock()

function animate() {
    const elapsedTime = clock.getElapsedTime()
    requestAnimationFrame(animate)

    sunnySphere.rotation.y = 0.15 * Math.sin(elapsedTime)
    rainySphere.rotation.y = 0.15 * Math.sin(elapsedTime)
    temperatureColdSphere.rotation.y = 0.15 * Math.sin(elapsedTime)
    temperatureHotSphere.rotation.y = 0.15 * Math.sin(elapsedTime)
    cloudySphere.rotation.y = 0.15 * Math.sin(elapsedTime)
    partlyCloudySphere.rotation.y = 0.15 * Math.sin(elapsedTime)
    snowySphere.rotation.y = 0.15 * Math.sin(elapsedTime)
    temperatureZeroSphere.rotation.y = 0.15 * Math.sin(elapsedTime)
    precipitationsSphere.rotation.y = 0.15 * Math.sin(elapsedTime)
    windSphere.rotation.y = 0.15 * Math.sin(elapsedTime)

    render()
}

function render() {
    renderer1.render(scene, rainyCamera)
    renderer2.render(scene, sunnyCamera)
    renderer3.render(scene, temperatureColdCamera)
    renderer4.render(scene, temperatureHotCamera)
    cloudyRenderer.render(scene, cloudyCamera)
    partlyCloudyRenderer.render(scene, partlyCloudyCamera)
    snowyRenderer.render(scene, snowyCamera)
    temperatureZeroRenderer.render(scene, temperatureZeroCamera)
    precipitationsRenderer.render(scene, precipitationsCamera)
    windRenderer.render(scene, windCamera)
}

animate()
