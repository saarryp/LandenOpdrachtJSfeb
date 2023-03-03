import axios from 'axios';

async function fetchData() {
    try {
        const response = await axios.get('https://restcountries.com/v2/all');
        const countries = response.data
        console.log(response.data);


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


