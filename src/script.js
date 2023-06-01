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
import {SPHERES_SPEED} from "./common/constants.js";
import {
    containsNorwegianLetters,
    getFormattedDate,
    populateFutureForecastTable,
    removeNorwegianLetters
} from "./functions/functions.js";

const spheresArray = spheres

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)

const spheresContainer = document.querySelector('#weatherSpheres')
const weatherTableContainer = document.querySelector('#weatherTable')


document.querySelector('#searchButton').addEventListener('click', (event) => {
    document.querySelector('#autocomplete').style.display = 'none';
    updateLocation().then()
})

document.querySelector('#locationSearch').addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        document.querySelector('#autocomplete').style.display = 'none';
        updateLocation().then()
    }
});

/**
 * Autocomplete
 */
let autocompleteList = [];
document.querySelector('#locationSearch').addEventListener('keyup', (event) => {
    if (event.key !== "Enter") {
        document.querySelector('#autocomplete').style.display = 'block';
    }
});

document.querySelectorAll('.autocomplete__item').forEach((item) => {
    item.addEventListener('click', (event) => {
        document.querySelector('#locationSearch').value = item.innerText;
    });
});

const populateAutocompleteList = async function (value) {
    const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=e2119e7d3055441eb5f03b8918a4560c`
    );
    const data = await response.json();
    console.log(data.features);
}

await populateAutocompleteList('bod');


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

    const weatherTable = document.querySelector('#weatherTable')
    weatherTable.innerHTML = ''
    weatherTable.insertAdjacentHTML('afterbegin', markup)
};

const getWeather = async function (location) {
    const locationNoNorwegianCharacters = removeNorwegianLetters(location)

    try {
        /** Date */
        const date = new Date()
        document.querySelector('#todayDate').innerText = getFormattedDate(date)
        renderSpinner(spheresContainer);
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY_WEATHER}&q=${locationNoNorwegianCharacters}&days=3`
        );
        const data = await response.json();
        if (!response.ok) throw Error(`${data.message} (${response.status})`);

        if (containsNorwegianLetters(location)) {
            document.querySelector('#headerText').textContent = location
        } else {
            document.querySelector('#headerText').textContent = `${data.location.name}, ${data.location.region}`
        }
        spheresContainer.innerHTML = ''
        weatherTableContainer.innerHTML = ''
        resetSpheresArray(scene)
        populateFutureForecastTable(data.forecast.forecastday, weatherTableContainer)
        document.querySelector('#locationSearch').value = ''

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


await getWeather('Bodø')

async function updateLocation() {
    const location = document.querySelector('#locationSearch').value
    getWeather(location).then()
}

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


// https://api.geoapify.com/v1/geocode/autocomplete?text=Mosco&apiKey=e2119e7d3055441eb5f03b8918a4560c
