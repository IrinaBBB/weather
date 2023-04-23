import * as THREE from "three"
import {SPHERE_SIZE, WEATHER_CONDITIONS} from "../common/constants.js"

const spheresData = {
    rainySphere: {iconUrl: 'img/rainy.svg', id: 'rainySphere', spherePosition: {y: 0}, cameraPosition: {y: 0, z: 2}},
    sunnySphere: {iconUrl: 'img/sunny.svg', id: 'sunnySphere', spherePosition: {y: 5}, cameraPosition: {y: 5, z: 2}},
    cloudySphere: {
        iconUrl: 'img/cloudy.svg',
        id: 'cloudySphere',
        spherePosition: {y: 10},
        cameraPosition: {y: 10, z: 2}
    },
    partlyCloudySphere: {
        iconUrl: 'img/partly-cloudy.svg',
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
    defaultConditionSphere: {
        iconUrl: 'img/default-condition.svg',
        id: 'defaultConditionSphere',
        spherePosition: {y: 50},
        cameraPosition: {y: 50, z: 2}
    },
    clearSphere: {
        iconUrl: 'img/clear.svg',
        id: 'clearSphere',
        spherePosition: {y: 55},
        cameraPosition: {y: 55, z: 2}
    },
    fogSphere: {
        iconUrl: 'img/fog.svg',
        id: 'fogSphere',
        spherePosition: {y: 60},
        cameraPosition: {y: 60, z: 2}
    },

}
export let spheres = []

export function resetSpheresArray(scene) {
    scene.children.pop()
    scene.children.pop()
    scene.children.pop()
    scene.children.pop()
    spheres.length = 0
}

export function getConditionString(text) {
    const textLower = text.toLowerCase()
    if (textLower.includes('sun')) {
        return WEATHER_CONDITIONS.SUNNY
    } else if (textLower.includes('rain')) {
        return WEATHER_CONDITIONS.RAINY
    } else if ((!textLower.includes('partly') && textLower.includes('cloudy')) || textLower.includes('overcast')) {
        return WEATHER_CONDITIONS.CLOUDY
    } else if (textLower.includes('partly') && textLower.includes('cloudy')) {
        return WEATHER_CONDITIONS.PARTLY_CLOUDY
    } else if (textLower.includes('snow') || textLower.includes('sleet')) {
        return WEATHER_CONDITIONS.SNOWY
    } else if (textLower.includes('clear')) {
        return WEATHER_CONDITIONS.CLEAR
    } else if (textLower.includes('fog')) {
        return WEATHER_CONDITIONS.FOG
    } else {
        return 'default'
    }
}

export function getConditionSphere(condition, conditionText, parentElement) {
    switch (condition) {
        case WEATHER_CONDITIONS.SUNNY:
            addSunnySphere(parentElement, conditionText)
            break
        case WEATHER_CONDITIONS.RAINY:
            addRainySphere(parentElement, conditionText)
            break
        case WEATHER_CONDITIONS.CLOUDY:
            addCloudySphere(parentElement, conditionText)
            break
        case WEATHER_CONDITIONS.PARTLY_CLOUDY:
            addPartlyCloudySphere(parentElement, conditionText)
            break
        case WEATHER_CONDITIONS.SNOWY:
            addSnowySphere(parentElement, conditionText)
            break
        case WEATHER_CONDITIONS.CLEAR:
            addClearSphere(parentElement, conditionText)
            break
        case WEATHER_CONDITIONS.FOG:
            addFogSphere(parentElement, conditionText)
            break
        default:
            addDefaultConditionSphere(parentElement, conditionText)
    }
}

export function getTemperatureSphere(temperatureValue, parentElement) {
    if (temperatureValue >= 1) {
        addHotTemperatureSphere(parentElement, `+${temperatureValue}&#176;`)
    } else if (temperatureValue <= -1) {
        addColdTemperatureSphere(parentElement, `${temperatureValue}&#176;`)
    } else {
        addZeroTemperatureSphere(parentElement, `${temperatureValue}&#176;`)
    }
}

export function getWindSphere(windValue, parentElement) {
    const windValueMetersPerSecond = Math.round(kmhToMps(windValue))
    addWindSphere(parentElement, `${windValueMetersPerSecond} m/s`)
}

export function getPrecipitationsSphere(value, parentElement) {
    addPrecipitationsSphere(parentElement, `${value} mm`)
}

const textureLoader = new THREE.TextureLoader()

function addRainySphere(parentElement, sphereText) {
    createSphere(spheresData.rainySphere, parentElement, sphereText)
}

function addSunnySphere(parentElement, sphereText) {
    createSphere(spheresData.sunnySphere, parentElement, sphereText)
}

function addCloudySphere(parentElement, sphereText) {
    createSphere(spheresData.cloudySphere, parentElement, sphereText)
}

function addPartlyCloudySphere(parentElement, sphereText) {
    createSphere(spheresData.partlyCloudySphere, parentElement, sphereText)
}

function addFogSphere(parentElement, sphereText) {
    createSphere(spheresData.fogSphere, parentElement, sphereText)
}

function addSnowySphere(parentElement, sphereText) {
    createSphere(spheresData.snowySphere, parentElement, sphereText)
}

function addClearSphere(parentElement, sphereText) {
    createSphere(spheresData.clearSphere, parentElement, sphereText)
}

function addColdTemperatureSphere(parentElement, sphereText) {
    createSphere(spheresData.coldTemperatureSphere, parentElement, sphereText)
}

export function addHotTemperatureSphere(parentElement, sphereText) {
    createSphere(spheresData.hotTemperatureSphere, parentElement, sphereText)
}

function addZeroTemperatureSphere(parentElement, sphereText) {
    createSphere(spheresData.zeroTemperatureSphere, parentElement, sphereText)
}

function addWindSphere(parentElement, sphereText) {
    createSphere(spheresData.windSphere, parentElement, sphereText)
}

function addPrecipitationsSphere(parentElement, sphereText) {
    createSphere(spheresData.precipitationsSphere, parentElement, sphereText)
}

function addDefaultConditionSphere(parentElement, sphereText) {
    createSphere(spheresData.defaultConditionSphere, parentElement, sphereText)
}

function createSphere(sphereData, parentElement, sphereText) {
    const htmlMarkup = `
        <div class="col d-flex flex-column align-items-center">
            <canvas id="${sphereData.id}"></canvas>
            <h3 class="text-secondary text-center">${sphereText}</h3>
        </div>
    `;
    parentElement.insertAdjacentHTML('beforeend', htmlMarkup)


    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
    const canvas = document.getElementById(sphereData.id)

    const renderer = new THREE.WebGLRenderer({canvas: canvas})
    renderer.setSize(SPHERE_SIZE, SPHERE_SIZE)

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.92)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x0000ff, 0.2)
    pointLight.position.x = 2
    pointLight.position.z = 7
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(0xff0000, 0.2)
    pointLight2.position.x = -2
    pointLight2.position.z = 2
    scene.add(pointLight2)
}

function kmhToMps(kilometersPerHour) {
    return (0.277778 * kilometersPerHour);
}
