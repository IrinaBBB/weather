import * as THREE from 'three'
import {
    addSpheresLight,
    getConditionSphere,
    getConditionString,
    getPrecipitationsSphere,
    getTemperatureSphere,
    getWindSphere,
    resetSpheresArray,
    spheres
} from "./core/spheres.js"
import {API_KEY} from "../config.js";

const spheresArray = spheres

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff);

const spheresContainer = document.querySelector('#weatherSpheres')
document.querySelector('#searchButton').addEventListener('click', (event) => {
    const location = document.querySelector('#locationSearch').value
    console.log(location)
    getWeather(location).then(
        document.querySelector('#locationHeader').textContent = location
    )
})

document.querySelector('#locationSearch').addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const location = document.querySelector('#locationSearch').value
        console.log(location)
        getWeather(location).then(
            document.querySelector('#headerText').textContent = location
        )
        document.querySelector('#locationSearch').value = ''
    }
});

const getWeather = async function (location) {
    try {
        //renderSpinner(recipeContainer);
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`
        );
        const data = await response.json();
        if (!response.ok) throw Error(`${data.message} (${response.status})`);


        spheresContainer.innerHTML = ''
        resetSpheresArray(scene)

        const text = data.current.condition.text;
        const type = getConditionString(data.current.condition.text)

        getConditionSphere(type, text, spheresContainer);
        getTemperatureSphere(data.current.temp_c, spheresContainer)
        getWindSphere(data.current.wind_kph, spheresContainer)
        getPrecipitationsSphere(data.current.precip_mm, spheresContainer)
        spheresArray.forEach(item => {
            scene.add(item.sphere)
        })

        console.log(scene);
        console.log(spheres);
    } catch (error) {
        alert(error);
    }
};

await getWeather('Tromso')

/**
 * Lights
 */
addSpheresLight(scene)

/**
 * Add spheres to scene
 */
spheresArray.forEach(item => {
    scene.add(item.sphere)
})



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
