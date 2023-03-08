import axios from 'axios';

async function fetchData() {
    try {
        const response = await axios.get('https://restcountries.com/v2/all');
        const countries = response.data
        // console.log(response.data);


        countries.sort((a, b) => {
            return a.population - b.population;
        });


        countryItem(countries);
    } catch (e) {
        console.error(e);
    }
}

fetchData();

function countryItem(countries) {

    const countryList = document.getElementById('country-list');
    const allCountries = countries.map((country) => {
        return `
                <li class="opsomming-landen">
            <p class="${regionColor(country.region)}">${country.name}</p>
            <img src="${country.flags.svg}" alt="Vlag van het land ${country.name}" width="50px"/>
            <p>Population ${country.population}</p>
                </li>
                `;

    })
    countryList.innerHTML = allCountries.join(" </br>");
}







function regionColor(region) {
    switch(region) {
        case 'Africa':
            return 'blue';
        case 'Americas':
            return 'green';
        case 'Asia':
            return 'red';
        case 'Europe':
            return 'geel';
        case 'Oceania':
            return 'purple';
        default:
            return 'default';
    }
}

/*deel 2 van de opdracht */
//eventlistener maken voor button; //
//


const searchForm = document.getElementById('search-form');
const searchResult = document.getElementById('search-result');
searchForm.addEventListener('submit', searchCountry);

function searchCountry(e) {
    e.preventDefault()
    const searchValue = document.getElementById('search-value');
    // fetchData(searchValue.value);
    fetchCountryInformation(searchValue.value)
    searchValue.value ='';
}

async function fetchCountryInformation(name) {
    searchResult.innerHTML = ``;


    // gegevens ophalen van land
    try {
        const result = await axios.get(`https://restcountries.com/v2/name/${name}`)
        // console.log(result)
        const country = result.data[0];
        console.log(country);

        searchResult.innerHTML =`
           <article class="search-result-box">
            <span class ="flag-title-container">
                <img src="$country.flag" alt="vlag" class="flag">
                <h2>${country.name}</h2>
                 <p> ${country.region}</p>   
             </span>
    <p>${country.name} is situated in ${country.subregion}. It has a population of ${country.population} people. </p>
    <p>The capital is ${country.capital} ${createCurrencyDescription(country.currencies)}</p>
    <p>They speak ${country.language} .</p>
    </article>
`;
    } catch (e) {
        console.error(e)

    }
}

fetchCountryInformation()

function createCurrencyDescription(currencies) {
    let output = "and you can pay with .";

    if (currencies.length === 2) {
        return output + `${currencies.name} and ${currencies.name}`;
    }
    return output + `${currencies[0].name}`;
}

// function languageSpeak(language) {
//     let output2 = "They speak .";
//     if (language.length === 2) {
//         return output2 + `${country.language} and ${country.language}`;
//     }
//     return output2 + `${country.language}`;
//
// }