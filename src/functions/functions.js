export function populateFutureForecastTable(forecastArray, container) {
    for (let i = 0; i < forecastArray.length; i++) {
        const item = forecastArray[i]
        item.dateDefinition = getDate(i)
        if (item.dateDefinition === '') {
            item.dateDefinition = getFormattedDate(new Date(item.date))
        }
        const html = returnWeatherRowHtml(item)
        container.insertAdjacentHTML('beforeend', html);
    }
}

function returnWeatherRowHtml(item) {
    return `
           <div class="weatherRow">
                <div class="h4 text-danger mb-4">${item.dateDefinition}</div>
                <div class="row">
                    <div class="weatherRow__item col">
                        <div class="weatherRow__icon">
                            <img src="icons/max-temperature.svg" alt="max temperature icon"/>
                        </div>
                        <div class="text-secondary h6 text-center mt-1">Max Temperature</div>
                        <div class="text-secondary h3 text-center">${item.day.maxtemp_c > 0 ? '+' : ''}${Math.round(item.day.maxtemp_c)}&#176;</div>
                    </div>
                    <div class="weatherRow__item col">
                        <div class="weatherRow__icon">
                            <img src="icons/min-temperature.svg" alt="max temperature icon"/>
                        </div>
                        <div class="text-secondary h6 text-center mt-1">Min Temperature</div>
                        <div class="text-secondary h3 text-center">${item.day.mintemp_c > 0 ? '+' : ''}${Math.round(item.day.mintemp_c)}&#176;</div>
                    </div>
                    <div class="weatherRow__item col">
                        <div class="weatherRow__icon">
                            <img src="icons/sunrise.svg" alt="max temperature icon"/>
                        </div>
                        <div class="text-secondary h6 text-center mt-1">Sunrise</div>
                        <div class="text-secondary h3 text-center">${item.astro.sunrise}</div>
                    </div>
                    <div class="weatherRow__item col">
                        <div class="weatherRow__icon">
                            <img src="icons/sunset.svg" alt="max temperature icon"/>
                        </div>
                        <div class="text-secondary h6 text-center mt-1">Sunset</div>
                        <div class="text-secondary h3 text-center">${item.astro.sunset}</div>
                    </div>
                </div>
                <!-- /.row -->
            </div>
            <!-- /.weatherRow -->
        `;
}

function getDate(i) {
    switch (i) {
        case 0:
            return 'Today'
        case 1:
            return 'Tomorrow';
        default:
            return '';
    }
}

export function getFormattedDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let formattedDate = ''
    formattedDate += date.getDate().toString()
    formattedDate += ' ' + months[date.getMonth()].toString()
    formattedDate += ' ' + date.getFullYear().toString()

    return formattedDate
}

export function removeNorwegianLetters(text) {
    let newText = '';
    newText = text.replaceAll('ø', 'o')
    newText = newText.replaceAll('Ø', 'O')
    newText = newText.replaceAll('æ', 'ae')
    newText = newText.replaceAll('Æ', 'Ae')
    newText = newText.replaceAll('å', 'aa')
    newText = newText.replaceAll('Å', 'Aa')
    return newText
}

export function containsNorwegianLetters(text) {
    return !!(text.includes('Ø') || text.includes('ø') || text.includes('Å') || text.includes('å')
        || text.includes('æ') || text.includes('Æ'));
}
