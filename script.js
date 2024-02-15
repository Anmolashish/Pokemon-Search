const URL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const searchBtn = document.getElementById("search-button");
const input = document.getElementById("search-input");
const image = document.querySelector("img");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");
const pokemonType = document.getElementById("types");

const fetchData = async () => {
  try {
    const res = await fetch(URL);
    const data = await res.json();
    showData(data);
  } catch (err) {
    console.error(err);
  }
};

async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    pokemonInfo(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const pokemonInfo = (data) => {
  console.log("hello world");
  const { id, name, weight, height, stats, sprites, types } = data;
  pokemonName.innerText = name.toUpperCase();
  pokemonId.innerText = "#" + id;
  pokemonWeight.innerText = "Weight: " + weight;
  pokemonHeight.innerText = "height: " + height;
  image.src = sprites.front_default;
  const statName = stats.map((obj) => obj["stat"].name);
  const statEffort = stats.map((obj) => obj.base_stat);

  pokemonHp.innerText = statEffort[0];
  pokemonAttack.innerText = statEffort[1];
  pokemonDefense.innerText = statEffort[2];
  pokemonSpecialAttack.innerText = statEffort[3];
  pokemonSpecialDefense.innerText = statEffort[4];
  pokemonSpeed.innerText = statEffort[5];
  pokemonType.innerHTML = "";

  const pokemonTypeName = types.map((obj) => obj["type"].name);

  for (let i = 0; i < pokemonTypeName.length; i++) {
    pokemonType.innerHTML += `<span id="type-${i + 1}">${pokemonTypeName[
      i
    ].toUpperCase()}</span>&nbsp;`;
  }
};

const showData = (data) => {
  const { results } = data;
  const id = results.map((obj) => obj.id);
  const name = results.map((obj) => obj.name);

  const value = input.value.toLowerCase();
  console.log(value);
  if (
    id.some((element) => element == input.value) ||
    name.some((element) => element == value)
  ) {
    const index = isNaN(input.value)
      ? name.indexOf(value)
      : id.indexOf(parseInt(input.value));
    const selectedUrl = `${URL}/${name[index]}`;
    console.log("Selected URL:", selectedUrl);
    getData(selectedUrl);
  } else {
    alert("Pokémon not found");
  }
};

searchBtn.addEventListener("click", () => {
  fetchData();
});
