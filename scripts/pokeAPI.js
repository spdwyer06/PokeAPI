const leftScreen = document.querySelector('.leftScreen');
const rightScreen = document.querySelector('.rightScreen');
const rightSide = document.querySelector('.rightSide');
const pokemonName = document.querySelector('.pokeName');
// const pokemonFrontImg = document.querySelector('.pokeFrontImg');
// const pokemonBackImg = document.querySelector('.pokeBackImg');
const pokemonID = document.querySelector('.pokeID');
const pokemonList = document.querySelector('.pokemonList');
const pageLeftButton = document.querySelector('.pageLeftButton');
const pageRightButton = document.querySelector('.pageRightButton');
const resetButton = document.querySelector('.resetButton');

const apiURL = 'https://pokeapi.co/api/v2/pokemon/' // Base API URL
let url; // Dynamic API URL variable

let ogPokemon; // Container for all 151 pokemon
let pageNumber = 0;
let offset = 0;

// console.log('Page Number', pageNumber);
if (pageNumber == 0) {
    rightSide.removeChild(pageLeftButton);
}

fetchOgPokemon();

// FUNCTIONS
function fetchOgPokemon() {
    clearRightScreen();

    url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&&limit=18`;
    // console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(json => {

            ogPokemon = json.results;

            for (poke of ogPokemon) {
                let listItem = document.createElement('li');
                let pokemon = document.createElement('a');
                let urlArr = poke.url.split('://');
                let urlArray = urlArr[1].split('/');
                let pokeId = urlArray[4].padStart(3, '0');
                // console.log(pokeId);

                pokemon.innerText = `#${pokeId}  ${capitalize(poke.name)}`;
                pokemon.href = '#';
                listItem.appendChild(pokemon);
                pokemonList.appendChild(listItem);

                // console.log(poke.name);
            }
        })
}

function fetchFinalPokemon() {
    url = `https://pokeapi.co/api/v2/pokemon?offset=144&&limit=7`;

    fetch(url)
        .then(response => response.json())
        .then(json => {

            ogPokemon = json.results;

            for (poke of ogPokemon) {
                let listItem = document.createElement('li');
                let pokemon = document.createElement('a');
                let urlArr = poke.url.split('://');
                let urlArray = urlArr[1].split('/');
                let pokeId = urlArray[4].padStart(3, '0');
                // console.log(pokeId);

                pokemon.innerText = `#${pokeId}  ${capitalize(poke.name)}`;
                pokemon.href = '#';
                listItem.appendChild(pokemon);
                pokemonList.appendChild(listItem);

                // console.log(poke.name);
            }
        })
}

function selectPokemon(e) {
    let str = e.target.innerText;
    let nums = str.slice(1, 4); // Extracing just the numbers from the li
    let pokeID = parseInt(nums); // Removing any leading 0s
    // console.log(pokeID);

    url = apiURL + pokeID;
    // console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(json => {
            clearLeftScreen();

            let pokeName = document.createElement('h1');
            let pokeFrontImg = document.createElement('img');
            let pokeBackImg = document.createElement('img');

            pokeName.innerText = capitalize(json.name);
            pokeFrontImg.src = json.sprites.front_default;
            pokeFrontImg.alt = `${capitalize(json.name)} front default image`;
            // console.log(pokeFrontImg.alt);
            // pokeBackImg.src = json.sprites.back_default;

            // pokemonName.appendChild(pokeName);
            // pokemonFrontImg.appendChild(pokeFrontImg);
            // pokemonBackImg.appendChild(pokeBackImg);
            leftScreen.appendChild(pokeName);
            leftScreen.appendChild(pokeFrontImg);
            // leftScreen.appendChild(pokemonBackImg);
        })

    pokemonID.innerText = pokeID;
}

function prevPage() {
    rightSide.appendChild(pageRightButton);
    // console.log('Page Number', pageNumber);
    pageNumber--;

    if (pageNumber == 0) {
        rightSide.removeChild(pageLeftButton);
    }

    clearRightScreen();
    offset -= 18;
    fetchOgPokemon();
}

function nextPage() {
    rightSide.appendChild(pageLeftButton);

    if (pageNumber == 8) {
        clearRightScreen();
        pageNumber++;
        fetchFinalPokemon();

        rightSide.removeChild(pageRightButton);
    }
    else {
        pageNumber++;
        // console.log('Page Number:', pageNumber);
        clearRightScreen();
        offset += 18;
        fetchOgPokemon();
    }
}

// Doesn't clear left screen if on 1st page (page 0)
function resetList() {
    rightSide.removeChild(pageLeftButton);
    clearLeftScreen();

    pokemonID.innerText = '';
    pageNumber = 0;
    offset = 0;

    fetchOgPokemon();
}

// HELPER FUNCTIONS
function clearLeftScreen() {
    while (leftScreen.firstChild) {
        leftScreen.removeChild(leftScreen.firstChild);
    }

}

function clearRightScreen() {
    while (pokemonList.firstChild) {
        pokemonList.removeChild(pokemonList.firstChild);
    }
}

function capitalize(str) {
    return str[0].toUpperCase() + str.substr(1); // Takes the first char in string [0] and upper cases it, then adds on the remaining section of string
}

// EVENT LISTENERS
pokemonList.addEventListener('click', selectPokemon);
pageLeftButton.addEventListener('click', prevPage);
pageRightButton.addEventListener('click', nextPage);
resetButton.addEventListener('click', resetList);