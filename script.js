let PokeNames = [];
let currentPokemon = [];
let cssList = [
    {"type":"normal","css":"typeNormal"},
    {"type":"fighting","css":"typeFighting"},
    {"type":"flying","css":"typeFlying"},
    {"type":"poison","css":"typePoison"},
    {"type":"ground","css":"typeGround"},
    {"type":"rock","css":"typeRock"},
    {"type":"bug","css":"typeBug"},
    {"type":"ghost","css":"typeGhost"},
    {"type":"steel","css":"typeSteel"},
    {"type":"fire","css":"typeFire"},
    {"type":"water","css":"typeWater"},
    {"type":"grass","css":"typeGrass"},
    {"type":"electric","css":"typeElectric"},
    {"type":"psychic","css":"typePsychic"},
    {"type":"ice","css":"typeIce"},
    {"type":"dragon","css":"typeDragon"},
    {"type":"dark","css":"typeDark"},
    {"type":"fairy","css":"typeFairy"},
    {"type":"unknown","css":"typeUnknown"},
    {"type":"shadow","css":"typeShadow"}
];


async function fetchPokemonNames(){
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    let response = await fetch(url);
    responseAsJson = await response.json();
    PokeNames = responseAsJson['results']
    for (let i = 0; i < PokeNames.length; i++) {
        let PokeName = PokeNames[i]['name'];
        loadPokemon(PokeName, i);
    }
}

async function loadPokemon(name, i){
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    // console.log(currentPokemon);
    await renderPokemonInfo(i);
}


function renderPokemonInfo(i){
    let currentName = currentPokemon['name'];
    let currentIMG = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokeCardContent').innerHTML += `
        <div class="pokeCard">
            <h2 id="PokemonName">${currentName}</h2>
            <img id="PokemonImg" src="${currentIMG}" alt="Pokemon-Image" />
            <div class="pokeTypes" id="pokeTypes${i}"></div>
        </div>`
    renderType(i);
}

function renderType(i){
    let PokeTypes = currentPokemon['types'];
    for (let y = 0; y < PokeTypes.length; y++) {
        let PokeType = PokeTypes[y]['type']['name'];
        let typeColor = findTypeColor(PokeType)
        document.getElementById('pokeTypes' + i).innerHTML += `
        <div class="typOfPokemon ${typeColor}">${PokeType}</div>`;
    }
}

function findTypeColor(PokeType){
    for (let i = 0; i < cssList.length; i++) {
        if (cssList[i]['type'] == PokeType) {
            return cssList[i]['css']
        }
    }
};