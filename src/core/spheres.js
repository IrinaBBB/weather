import * as THREE from "three";

const spheresData = {
    rainySphere: {iconUrl: 'img/rainy.svg', id: 'rainySphere', spherePosition: {y: 0}, cameraPosition: {y: 0, z: 2}},
    sunnySphere: {iconUrl: 'img/sunny.svg', id: 'sunnySphere', spherePosition: {y: 5}, cameraPosition: {y: 5, z: 2}},
    cloudySphere: {
        iconUrl: 'img/sunny.svg',
        id: 'cloudySphere',
        spherePosition: {y: 10},
        cameraPosition: {y: 10, z: 2}
    },
    partlyCloudySphere: {
        iconUrl: 'img/partlyCloudy.svg',
        id: 'partlyCloudySphere',
        spherePosition: {y: 15},
        cameraPosition: {y: 15, z: 2}
    },
    snowySphere: {iconUrl: 'img/snowy.svg', id: 'snowySphere', spherePosition: {y: 20}, cameraPosition: {y: 20, z: 2}},
    coldTemperatureSphere: {
        iconUrl: 'img/temperature-cold.svg',
        id: 'coldTemperatureSphere',
        spherePosition: {y: 25},
        cameraPosition: {y: 25, z: 2},
    },
    hotTemperatureSphere: {
        iconUrl: 'img/temperature-hot.svg',
        id: 'hotTemperatureSphere',
        spherePosition: {y: 30},
        cameraPosition: {y: 30, z: 2}
    },
    zeroTemperatureSphere: {
        iconUrl: 'img/temperature-zero.svg',
        id: 'zeroTemperatureSphere',
        spherePosition: {y: 35},
        cameraPosition: {y: 35, z: 2}
    },
    windSphere: {
        iconUrl: 'img/wind.svg',
        id: 'windSphere',
        spherePosition: {y: 40},
        cameraPosition: {y: 40, z: 2}
    },
    precipitationsSphere: {
        iconUrl: 'img/precipitations.svg',
        id: 'precipitationsSphere',
        spherePosition: {y: 45},
        cameraPosition: {y: 45, z: 2}
    },
}
export const spheres = [];

const textureLoader = new THREE.TextureLoader()

export function addRainySphere(parentElement, sphereText) {
    createSphere(spheresData.rainySphere, parentElement, sphereText)
}

export function addSunnySphere(parentElement, sphereText) {
    createSphere(spheresData.sunnySphere, parentElement, sphereText)
}

export function addCloudySphere(parentElement, sphereText) {
    createSphere(spheresData.cloudySphere, parentElement, sphereText)
}

export function addPartlyCloudySphere(parentElement, sphereText) {
    createSphere(spheresData.partlyCloudySphere, parentElement, sphereText)
}

export function addSnowySphere(parentElement, sphereText) {
    createSphere(spheresData.snowySphere, parentElement, sphereText)
}

export function addColdTemperatureSphere(parentElement, sphereText) {
    createSphere(spheresData.coldTemperatureSphere, parentElement, sphereText)
}

export function addHotTemperatureSphere(parentElement, sphereText) {
    createSphere(spheresData.hotTemperatureSphere, parentElement, sphereText)
}

export function addZeroTemperatureSphere(parentElement, sphereText) {
    createSphere(spheresData.zeroTemperatureSphere, parentElement, sphereText)
}

export function addWindSphere(parentElement, sphereText) {
    createSphere(spheresData.windSphere, parentElement, sphereText)
}

export function addPrecipitationsSphere(parentElement, sphereText) {
    createSphere(spheresData.precipitationsSphere, parentElement, sphereText)
}

function createSphere(sphereData, parentElement, sphereText) {
    const htmlMarkup = `
        <div class="col d-flex flex-column align-items-center">
            <canvas id="${sphereData.id}"></canvas>
            <h3 class="text-secondary">${sphereText}</h3>
        </div>
    `;
    parentElement.insertAdjacentHTML('beforeend', htmlMarkup)


    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
    const canvas = document.getElementById(sphereData.id)

    const renderer = new THREE.WebGLRenderer({canvas: canvas})
    renderer.setSize(170, 170)

    const geometry = new THREE.SphereGeometry(1.2, 50, 50)
    const sphere = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
        map: textureLoader.load(sphereData.iconUrl),
    }))

    sphere.position.y = sphereData.spherePosition.y

    camera.position.y = sphereData.cameraPosition.y
    camera.position.z = sphereData.cameraPosition.z

    spheres.push({renderer, sphere, camera})
}

export function addSpheresLight(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.96)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x0000ff, 0.2)
    pointLight.position.x = 2
    pointLight.position.z = 2
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(0xff0000, 0.2)
    pointLight2.position.x = -2
    pointLight2.position.z = 2
    scene.add(pointLight2)
}
