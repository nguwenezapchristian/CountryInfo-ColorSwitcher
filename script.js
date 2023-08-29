let displayingInfoDiv = document.querySelector('.displaying-country');
const regions = document.querySelectorAll('.region');

// getting the user input and displaying the info of a country
// searched when the user clicks on the search icon

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');

    searchIcon.addEventListener('click', () => {
        const country = searchInput.value;
        displayingInfoDiv.textContent = "";
        getCountryInfo(country);
    });
});

// displaying countries in the same region when the
// user clicks on a region in the dropdown menu

document.addEventListener('DOMContentLoaded', () => {

    regions.forEach((region) => {
        region.addEventListener('click', () => {
            const value = region.getAttribute('data-value');
            console.log(value);
            regionCountries(value);
            // displayRegion(value);
        })
    })
})

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
            // const processedData = getFewCountryInfo(countryInfo);
            // console.log(processedData);
            displaySearchedCountry(countryInfo);  
        }
    } catch (error) {
        console.log('An Error: ', error.message);
    }
}

// get all countries by region

async function regionCountries(region) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);

        if (response.status !== 200) {
           console.log(`HTTP Error: ${response.status}`);
           return; 
        } else {
            const countriesInfo = await response.json();
            displayingInfoDiv.textContent = "";
            
            for (let i = 0; i < countriesInfo.length; i++) {
                displaySearchedCountry(countriesInfo[i]);
                console.log(countriesInfo[i].name.common);
            }
            return countriesInfo;
        }
    } catch (error) {
        console.log('An Error: ', error.message);
    }
}

// fetch all countries and their info

dispalyAllCountries()
async function getAllCountries() {
    try {
        const responsed = await fetch(`https://restcountries.com/v3.1/all?fields=name,capital,
        currencies,flags,population,region,nativename,languages,subregion`);
        
        if (responsed.status !== 200) {
            console.log(`HTTP error: ${responsed.status}`);
            return;
        } else {
            const allCountries = await responsed.json();
            console.log(allCountries);
            return allCountries;
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

// display all countries with few info on them

async function dispalyAllCountries() {
    const data = await getAllCountries();
    for (let i = 0; i < data.length; i++) {
        displaySearchedCountry(data[i]);
    }
}

// display countries by region

// async function displayRegion(region) {
//     const countriesInfo = await regionCountries(region);
//     for (let i = 0; i < countriesInfo.length; i++) {
//         displaySearchedCountry(countriesInfo[i]);
//     }
// }

// display few info of a searched country

function displaySearchedCountry(data) {
    const countrySearchedcard = document.createElement('div'); countrySearchedcard.className = "countrySearchedDiv";
    const flag = document.createElement('img'); flag.className = "countryFlag";
    const countryName = document.createElement('h1'); countryName.className = "countryName";
    const population = document.createElement('p'); population.className = "info-pop";
    const region = document.createElement('p'); region.className = "info-reg";
    const capital = document.createElement('p'); capital.className = "info-cap";

    flag.src = data.flags.png;
    countryName.textContent = data.name.common;
    population.innerHTML = `<b>Population:</b> ${data.population}`;
    region.innerHTML = `<b>Region:</b> ${data.region}`;
    capital.innerHTML = `<b>Capital:</b> ${data.capital}`;

    countrySearchedcard.appendChild(flag );
    countrySearchedcard.appendChild(countryName);
    countrySearchedcard.appendChild(population);
    countrySearchedcard.appendChild(region);
    countrySearchedcard.appendChild(capital);
    displayingInfoDiv.appendChild(countrySearchedcard);
}

