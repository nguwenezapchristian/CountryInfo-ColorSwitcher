const displayingInfoDiv = document.querySelector('.displaying-country');

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');

    searchIcon.addEventListener('click', () => {
        const country = searchInput.value;
        console.log(country);
        getCountryInfo(country);
    });
});

// get all the country info needed

async function getCountryInfo(country) {
    try {
        
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}?fields=name,capital,
        currencies,flags,population,region,nativename,languages,subregion`);
        
        if (response.status !== 200) {
            console.log(`HTTP error: ${response.status}, check the spelling of a country name`);
            return;
        } else {
            const [countryInfo] = await response.json();
            console.log(countryInfo);
            const processedData = getFewCountryInfo(countryInfo);
            console.log(processedData);
            displaySearchedCountry(processedData);   
        }
    } catch (error) {
        console.log('An Error: ', error.message);
    }
}

// get few country info

function getFewCountryInfo(info) {
    const fewInfo = {
        flag: info.flags.png,
        name: info.name.common,
        population: info.population,
        region: info.region,
        capital: info.capital[0],
    }
    return fewInfo;
}
function displaySearchedCountry(data) {
    const countrySearchedcard = document.createElement('div');
    const flag = document.createElement('img');
    const countryName = document.createElement('h1');
    const population = document.createElement('p');
    const region = document.createElement('p');
    const capital = document.createElement('p');

    flag.src = data.flag;
    countryName.textContent = data.name;
    population.textContent = data.population;
    region.textContent = data.region;
    capital.textContent = data.capital;

    const scaleValue = 0.80;
    flag.style.transform = `scale(${scaleValue})`;

    countrySearchedcard.appendChild(flag );
    countrySearchedcard.appendChild(countryName);
    countrySearchedcard.appendChild(population);
    countrySearchedcard.appendChild(region);
    countrySearchedcard.appendChild(capital);
    displayingInfoDiv.appendChild(countrySearchedcard);
}
