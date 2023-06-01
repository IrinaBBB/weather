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
const headerText = document.querySelector('#headerText');



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
const locationSearchInput = document.querySelector('#locationSearch');
const autocompleteWindow = document.querySelector('#autocomplete');
document.querySelectorAll('.autocomplete__item').forEach((item) => {
    item.addEventListener('click', (event) => {
        document.querySelector('#locationSearch').value = item.innerText;
    });
});

locationSearchInput.addEventListener('keyup', (event) => {
    autocompleteList = [];
    autocompleteWindow.innerHTML = '';
    populateAutocompleteList(locationSearchInput.value).then(() => {
        if (autocompleteList.length > 0) {
            autocompleteWindow.style.display = 'block';
            autocompleteList.forEach((item) => {
                const markup = `
                    <div class="autocomplete__item">
                        <span class="header_icon">
                            <img style="width: 0.9em; margin-top: -3px;" src="/icons/pin.svg" alt="location">
                        </span>
                        <span class="autocomplete__text">${item}</span>
                    </div>
                `;
                document.querySelector('#autocomplete').insertAdjacentHTML('afterbegin', markup);
            });
            document.querySelectorAll('.autocomplete__text').forEach((item) => {
                const fieldText = item.innerText;
                item.addEventListener('click', (item) => {
                    locationSearchInput.value = fieldText;
                    getWeather(fieldText).then();
                    autocompleteWindow.style.display = 'none';
                });
            });
        } else {
            document.querySelector('#autocomplete').style.display = 'none';
        }
    });
});


const populateAutocompleteList = async function (value) {
    console.log('Value: ' + value);
    autocompleteList = [];
    if (value !== '') {
        const response = await fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=e2119e7d3055441eb5f03b8918a4560c`
        );
        const data = await response.json();
        console.log(data);
        if (data.features.length !== undefined) {
            data.features.forEach((item) => {
                if (item.properties.name !== undefined && item.properties.country !== undefined) {
                    autocompleteList.push(`${item.properties.name}, ${item.properties.country}`);
                }
            });
        }
    }
}


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

    const weatherTable = document.querySelector('#weatherTable');
    weatherTable.innerHTML = '';
    weatherTable.insertAdjacentHTML('afterbegin', markup);

    headerText.innerHTML = '';
    headerText.insertAdjacentHTML('afterbegin', markup);
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
        spheresContainer.innerHTML = '';
        weatherTableContainer.innerHTML = '';

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

