document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');

    searchIcon.addEventListener('click', () => {
        const country = searchInput.value;
        console.log(country);
        getCountryInfo(country);
    });
});
async function getCountryInfo(country) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}?fields=name,capital,
        currencies,flag,population,region,nativename,languages,subregion`);
        
        if (response.status !== 200) {
            console.log(`HTTP error: ${response.status}, check the spelling of a country name`);
            return;
        } else {
            const countryInfo = await response.json();
            console.log(countryInfo);
        }
    } catch (error) {
        console.log('An Error: ', error.message);
    }
}