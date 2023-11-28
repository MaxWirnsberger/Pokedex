let PokeNames = [];
let currentPokemon = [];
let loadedPokemon = [];
let cardID = "";
let cssList = [
  { type: "normal", css: "typeNormal" },
  { type: "fighting", css: "typeFighting" },
  { type: "flying", css: "typeFlying" },
  { type: "poison", css: "typePoison" },
  { type: "ground", css: "typeGround" },
  { type: "rock", css: "typeRock" },
  { type: "bug", css: "typeBug" },
  { type: "ghost", css: "typeGhost" },
  { type: "steel", css: "typeSteel" },
  { type: "fire", css: "typeFire" },
  { type: "water", css: "typeWater" },
  { type: "grass", css: "typeGrass" },
  { type: "electric", css: "typeElectric" },
  { type: "psychic", css: "typePsychic" },
  { type: "ice", css: "typeIce" },
  { type: "dragon", css: "typeDragon" },
  { type: "dark", css: "typeDark" },
  { type: "fairy", css: "typeFairy" },
  { type: "unknown", css: "typeUnknown" },
  { type: "shadow", css: "typeShadow" },
];

let urlName = "https://pokeapi.co/api/v2/pokemon/";

// --------------------------- Load Pokemon Names ---------------------------
async function fetchPokemonNames() {
  let response = await fetch(urlName);
  let responseAsJson = await response.json();
  PokeNames = responseAsJson["results"];
  for (let i = 0; i < PokeNames.length; i++) {
    let PokeName = PokeNames[i]["name"];
    loadPokemon(PokeName);
  }
  urlName = responseAsJson["next"];
  loadAllPokemon();
}

// ------------------------- Load Pokemon Overview -------------------------
async function loadPokemon(name) {
  let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
  renderPokemonInfo();
}

function renderPokemonInfo() {
  let currentName = currentPokemon["name"];
  let id = currentPokemon["id"] - 1;
  let currentIMG =
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
  let overwiewTypeId = "pokeTypes";
  document.getElementById("pokeCardContent").innerHTML += `
        <div class="pokeCard">
            <h2 id="PokemonName">${currentName}</h2>
            <a onclick="openDialog(${id + 1})">
                <img id="PokemonImg" src="${currentIMG}" alt="Pokemon-Image"/>
            </a>
            <div class="pokeTypes" id="pokeTypes${id}"></div>
        </div>`;
  renderType(id, overwiewTypeId);
}

function renderType(id, idPosition) {
  let PokeTypes = currentPokemon["types"];
  document.getElementById(idPosition + id).innerHTML = "";
  for (let y = 0; y < PokeTypes.length; y++) {
    let PokeType = PokeTypes[y]["type"]["name"];
    let typeColor = findTypeColor(PokeType);
    document.getElementById(idPosition + id).innerHTML += `
        <div class="typOfPokemon ${typeColor}">${PokeType}</div>`;
  }
}

function findTypeColor(PokeType) {
  for (let i = 0; i < cssList.length; i++) {
    if (cssList[i]["type"] == PokeType) {
      return cssList[i]["css"];
    }
  }
}

// ------------------------------ Card ----------------------------------------
function openDialog(id) {
  cardID = id;
  document.getElementById("pokeDialog").classList.remove("display-none");
  let pokemon = idFinder(cardID);
  backArrawTest();
  forwardArrawTest();
  loadPoketHeader(pokemon);
  renderCardType(pokemon);
  createCardNav(cardID);
  aktiveProportions(pokemon);
  renderPokeProportions(pokemon);
}

function idFinder(id){
  for (let i = 0; i < loadedPokemon.length; i++) {
    let pokemonID = loadedPokemon[i]['id'];
    if (id == pokemonID) {
      return loadedPokemon[i]
    }
  }
}

function loadPoketHeader(pokemonInfo) {
  let name = pokemonInfo["name"];
  let id = pokemonInfo["id"];
  let img = pokemonInfo["img"];
  document.getElementById("TopCardHeader").innerHTML = `
    <h2>${name}</h2>
    <p>${id}</p>`;
  document.getElementById("StatsPokeIMG").src = img;
}

function renderCardType(pokemonInfo) {
  let PokeTypes = pokemonInfo["types"];
  document.getElementById("TopCardType").innerHTML = "";
  for (let y = 0; y < PokeTypes.length; y++) {
    let PokeType = PokeTypes[y]["type"]["name"];
    let typeColor = findTypeColor(PokeType);
    document.getElementById("TopCardType").innerHTML += `
        <div class="typOfPokemon ${typeColor}">${PokeType}</div>`;
  }
}

function createCardNav(id) {
  document.getElementById("statMenu").innerHTML = `
    <a id="aktiveProportions" onclick="aktiveProportions()"
    class="aktiveMenu MenuPosition">
        <h3>Proportions</h3>
    </a>
    <a id="aktiveStats" onclick="aktiveStats(${id})" class="MenuPosition">
        <h3>Stats</h3>
    </a>`;
}

function renderPokeStatsBar(Card) {
  let cardStats = Card["stats"];
  document.getElementById("progressContainer").innerHTML = "";
  for (let i = 0; i < cardStats.length; i++) {
    let cardStat = cardStats[i];
    document.getElementById("progressContainer").innerHTML += `
        <div class="progressContent">
            <div>${cardStat["stat"]["name"]}:</div>
            <div class="emptyProgress">
                <div class="progressBar" id="progressBar${i}"></div>
            </div>
        </div>`;
    loadPokeStatsBar(i, cardStat["base_stat"]);
  }
}

function loadPokeStatsBar(i, baseStat) {
  let progressBar = document.getElementById("progressBar" + i);
  let width = 0;
  for (let y = 0; y < baseStat; y++) {
    width++;
    progressBar.style.width = width + "%";
    progressBar.innerHTML = width;
  }
}

function renderPokeProportions(proportions) {
  document.getElementById("proportionsContent").innerHTML = "";
  proportionsTabel = document.getElementById("proportionsContent");
  proportionsTabel.innerHTML = `
    <tr><td>Height</td><td>${proportions["hight"]}</td></tr>
    <tr><td>Weight</td><td>${proportions["weight"]}</td></tr>
    <tr><td>Base Experience</td><td>${proportions["baseExperience"]}</td></tr>`;
}

function aktiveProportions() {
  let aktiveProportions = document.getElementById("aktiveProportions");
  let aktiveStats = document.getElementById("aktiveStats");
  aktiveProportions.classList.add("aktiveMenu");
  aktiveStats.classList.remove("aktiveMenu");

  document.getElementById("proportions").classList.remove("display-none");
  document.getElementById("stats").classList.add("display-none");
}

function aktiveStats(id) {
  let aktiveProportions = document.getElementById("aktiveProportions");
  let aktiveStats = document.getElementById("aktiveStats");
  aktiveProportions.classList.remove("aktiveMenu");
  aktiveStats.classList.add("aktiveMenu");

  document.getElementById("proportions").classList.add("display-none");
  document.getElementById("stats").classList.remove("display-none");
  renderPokeStatsBar(loadedPokemon[id]);
}

function backArrawTest() {
  if (cardID == 0) {
    document.getElementById("back").classList.add("display-none");
  } else if (cardID > 0) {
    document.getElementById("back").classList.remove("display-none");
  }
}

function forwardArrawTest() {
  if (cardID + 1 == loadedPokemon.length) {
    document.getElementById("forward").classList.add("display-none");
  } else if (cardID < loadedPokemon.length) {
    document.getElementById("forward").classList.remove("display-none");
  }
}

function back() {
  backArrawTest();
  forwardArrawTest();
  cardID--;
  openDialog(cardID);
}

function foward() {
  backArrawTest();
  forwardArrawTest();
  cardID++;
  openDialog(cardID);
}

function closeDialog() {
  document.getElementById("pokeDialog").classList.add("display-none");
}

// ---------------------------- Searching ------------------------------------
let allPokemon = [];

async function loadAllPokemon() {
  let url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";
  let response = await fetch(url);
  let responseAsJson = await response.json();
  allPokemon = responseAsJson["results"];
  for (let i = 0; i < allPokemon.length; i++) {
    let PokeKey = allPokemon[i];
    loadAllKeys(PokeKey['name']);
  }
}

async function loadAllKeys(name) {
  let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  let response = await fetch(url);
  let allKeys = await response.json();
  safePokemonInList(allKeys);
}

function safePokemonInList(allKeys) {
  let newJson = {
    name: allKeys["name"],
    id: allKeys["id"],
    img: allKeys["sprites"]["other"]["official-artwork"]["front_default"],
    types: allKeys["types"],
    hight: allKeys["height"],
    weight: allKeys["weight"],
    baseExperience: allKeys["base_experience"],
    stats: allKeys["stats"],
  };
  loadedPokemon.push(newJson);
}

function filterPokemon() {
  let wantedPokemon = document.getElementById("wantedPokemon");
  wantedPokemon = wantedPokemon.value.toLowerCase();
  document.getElementById("pokeCardContent").innerHTML = "";
  document.getElementById("PokeButton").innerHTML = ""
  
  for (let i = 0; i < allPokemon.length; i++) {
    let pokemons = allPokemon[i]["name"];
    if (pokemons.toLowerCase().includes(wantedPokemon)) {
      loadPokemon(pokemons);
    }
  }
}

function emptyField() {
  urlName = "https://pokeapi.co/api/v2/pokemon/";
  let wantedPokemon = document.getElementById("wantedPokemon").value;
  if (wantedPokemon.length < 1) {
    emptyEverything();
  }
}

function emptyEverything() {
  document.getElementById("pokeCardContent").innerHTML = "";
  PokeNames = [];
  currentPokemon = [];
  loadedPokemon = [];
  cardID = "";
  urlName = "https://pokeapi.co/api/v2/pokemon/";
  document.getElementById("PokeButton").innerHTML = `
  <button class="MoreButton" onclick="fetchPokemonNames()">
    Load More
  </button>`
  fetchPokemonNames();
}
