//Globally accessed data. Used by searchEstablishments function
let data;
fetchEstablishments('./json/data.json');

document.addEventListener('DOMContentLoaded', () => {
    //Initialization of the searchBar
    searchBarInit();
})

function searchBarInit() {
    //Returning html elements
    const searchBarField = document.getElementById('searchBarField');
    const searchBarButton = document.getElementById('searchBarButton');

    searchBarButton.addEventListener('click', (e) => {
        e.preventDefault();
        searchEstablisments(searchBarField.value.toLowerCase()); 
        window.location = './shop.html';
    })
}
function searchEstablisments(cityName) {
    //Function checks if there is an establishment in inputted city
    const index = data.map((u) => u.location.city.toLowerCase).indexOf(cityName.toLowerCase())
    if (index !== -1) {
        localStorage.setItem('cityFilter',`${cityName}`);
    }
    else {
        localStorage.setItem('cityFilter','-1');
    }
}
//Used for checking the localStorage with the inputted city
async function fetchEstablishments(path) {
    try {
        const response = await fetch(path); // Await fetch call
        const jsonData = await response.json(); // Await response parsing
        data = jsonData.items; // Set global data to fetched data
    } catch (error) {
        console.error(`Error fetching establishments: ${error.message}`);
    }
}