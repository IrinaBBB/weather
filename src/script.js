import * as THREE from 'three'
import {
    addHotTemperatureSphere,
    addPrecipitationsSphere,
    addRainySphere,
    addSpheresLight,
    addWindSphere, addZeroTemperatureSphere,
    spheres
} from "./core/spheres.js"

const spheresArray = spheres

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff);

const spheresContainer = document.querySelector('#weatherSpheres')

addRainySphere(spheresContainer, 'rainy')
addZeroTemperatureSphere(spheresContainer, '0&#176;')
addWindSphere(spheresContainer, '5 m/s')
addPrecipitationsSphere(spheresContainer, '1 mm')

/**
 * Add spheres to scene
 */
spheresArray.forEach(item => {
    scene.add(item.sphere)
})

/**
 * Lights
 */
addSpheresLight(scene)

/**
 * Animate
 */
const clock = new THREE.Clock()
function animate() {
    const elapsedTime = clock.getElapsedTime()
    requestAnimationFrame(animate)
    spheresArray.forEach(item => {
        item.sphere.rotation.y = 0.15 * Math.sin(elapsedTime)
    })

    render()
}

function render() {
    spheresArray.forEach(item => {
        item.renderer.render(scene, item.camera)
    })
}

animate()
