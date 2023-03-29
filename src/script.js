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
import {API_KEY_WEATHER} from "../config.js";
import {SPHERE_SIZE, SPHERES_SPEED} from "./common/constants.js";

const spheresArray = spheres

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)


/** Date */
const date = new Date().toString()
const dateArray = date.split(" ",  4)
dateArray.shift()
const dateToDisplay = dateArray.join(" ")
document.querySelector('#todayDate').innerText = dateToDisplay

const spheresContainer = document.querySelector('#weatherSpheres')
document.querySelector('#searchButton').addEventListener('click', (event) => {
    const location = document.querySelector('#locationSearch').value
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

/**
 * Spinner
 */
const renderSpinner = function (parentElement) {
    const markup = `
        <div class="lds-ripple">
            <div></div>
            <div></div>
        </div>
    `;
    parentElement.innerHTML = '';
    parentElement.insertAdjacentHTML('afterbegin', markup);

    // const weatherTable = document.querySelector('#weatherTable')
    // weatherTable.innerHTML = ''
    // weatherTable.insertAdjacentHTML('afterbegin', markup)
};

const getWeather = async function (location) {
    try {
        renderSpinner(spheresContainer);
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY_WEATHER}&q=${location}&aqi=no`
        );
        const data = await response.json();
        if (!response.ok) throw Error(`${data.message} (${response.status})`);
        console.log(data);

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
        item.sphere.rotation.y = SPHERES_SPEED * Math.sin(elapsedTime)
    })
    render()
}

function render() {
    spheresArray.forEach(item => {
        item.renderer.render(scene, item.camera)
    })
}

animate()
