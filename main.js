//Global declarations
let resp;
let resul;
let response;
let results;
let pokes = []; //fetch
const types = [];
let start = 0;
let limit = 0;


//Selection of html elements
const previous$$ = document.querySelector(".previous");
const next$$ = document.querySelector(".next");
const page$$ = document.querySelector(".page");
const ol$$ = document.querySelector("#pokedex");
const container$$ = document.querySelector(".container");
const typeButton = document.querySelector(".btn-type");
const searchInput$$ = document.querySelector(".search");
let pageNumber = parseInt(page$$.textContent);

const getPokemons = async () => {


  pokes.splice(0);

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${start}&limit=0`);
  const results = await response.json();

  limit = Math.floor(results.count / 20) + 1;

  for (const pokemon of results.results) {
    const poke = await fetch(pokemon.url);
    const pokeJson = await poke.json();
    pokes.push(pokeJson);
  }

  renderFront(pokes);

  console.log(pokes);
  renderButtons();

}

previous$$.addEventListener("click", () => changePage("-"));
next$$.addEventListener("click", () => changePage("+"));

const changePage = (operation) => {
  ol$$.innerHTML = "";
  console.log("pagina", pageNumber);

  if (operation === "+" && pageNumber != limit) {

    console.log(start);
    pageNumber += 1;
    page$$.textContent = pageNumber;
    console.log("pagina", pageNumber);
    start += 20;
  } else if (operation === "-") {
    
    page$$.textContent = --pageNumber;
    start -= 20;
  
  } else if (pageNumber !== 1 && pageNumber != limit) {

    if (operation === "-") {

      page$$.textContent = --pageNumber;
      start -= 20;
    } else {
      page$$.textContent = ++pageNumber;
      start += 20;
    }
  }
  // }else if (pageNumber === 1) {
  //   previous$$.disabled = true;
  // }
  getPokemons()
}

//controlamos que el numero de nuestra pagina no salga del rango posible en la paginación
// if(pageNumber === 1){
//   previous$$.disabled = true;
//   console.log("estoy en el primer else if" + pageNumber)
// }else if (pageNumber === limit) {
//    next$$.disabled = true;
// }else if(!pageNumber === 1){
//   previous$$.disabled = false;
//   console.log("estoy en el ultimo else if" + pageNumber)

// }


//FUNCION PARA CREAR LOS BOTONES DE FILTRADO
const renderButtons = () => {

  const divBtnFilter$$ = document.querySelector(".buttons-filter");
  divBtnFilter$$.innerHTML = "";
  const btnAll = document.createElement("button");

  btnAll.setAttribute("id", "all");
  btnAll.addEventListener("click", () => {
    ol$$.innerHTML = "";
    renderFront(pokes);
  })


  container$$.prepend(divBtnFilter$$);
  divBtnFilter$$.appendChild(btnAll);


  for (const pokemon of pokes) {

    for (const type of pokemon.types) {
      if (!types.includes(type.type.name)) {

        types.push(type.type.name);

      }
    }
  }



  for (const type of types) {

    const btn = document.createElement("button");


    //btn.textContent = type;
    container$$.prepend(divBtnFilter$$);
    divBtnFilter$$.appendChild(btn);
    btn.addEventListener("click", () => filterTypes(type))



    btn.setAttribute("class", "btn-type");


    if (type === "grass") {

      btn.style.backgroundImage = "url('./assets/grass.png')";

    }
    if (type === "electric") {
      btn.style.backgroundImage = "url('./assets/electric.png')";
      btn.style.backgroundColor = "#FFEA70";

    }
    if (type === "normal") {
      btn.style.backgroundColor = "#d8a3ac";
      btn.style.backgroundImage = "url('./assets/normal.png')";


    }
    if (type === "fire") {
      btn.style.backgroundColor = "#FF675C";
      btn.style.backgroundImage = "url('./assets/fire.png')";



    }
    if (type === "water") {
      btn.style.backgroundColor = "#0596C7";
      btn.style.backgroundImage = "url('./assets/water.png')";

    }
    if (type === "ice") {
      btn.style.backgroundColor = "#AFEAFD";
      btn.style.backgroundImage = "url('./assets/ice.png')";

    }
    if (type === "rock") {
      btn.style.backgroundColor = "#999799";
      btn.style.backgroundImage = "url('./assets/rock.png')";

    }
    if (type === "flying") {
      btn.style.backgroundColor = "#7AE7C7";
      btn.style.backgroundImage = "url('./assets/flying.png')";

    }

    if (type === "bug") {
      btn.style.backgroundColor = "#A2FAA3";
      btn.style.backgroundImage = "url('./assets/bug.png')";

    }
    if (type === "poison") {
      btn.style.backgroundColor = "#7e54c7";
      btn.style.backgroundImage = "url('./assets/poison.png')";

    }
    if (type === "ground") {
      btn.style.backgroundColor = "#d86c00";
      btn.style.backgroundImage = "url('./assets/ground.png')";

    }
    if (type === "dragon") {
      btn.style.backgroundColor = "#DA627D";
      btn.style.backgroundImage = "url('./assets/dragon.png')";

    }
    if (type === "steel") {
      btn.style.backgroundColor = "#1D8A99";
      btn.style.backgroundImage = "url('./assets/steel.png')";

    }
    if (type === "fighting") {
      btn.style.backgroundColor = "#2F2F2F";
      btn.style.backgroundImage = "url('./assets/fighting.png')";

    }
    if (type === "psychic") {
      btn.style.backgroundColor = "#FFC6D9";
      btn.style.backgroundImage = "url('./assets/psychic.png')";

    }
    if (type === "ghost") {
      btn.style.backgroundColor = "#561D25";
      btn.style.backgroundImage = "url('./assets/ghost.png')";

    }
    if (type === "fairy") {
      btn.style.backgroundColor = "#e589a8";
      btn.style.backgroundImage = "url('./assets/fairy.png')";

    }
  }

}


let pokemonFiltered = [];
const filterTypes = (type) => {

  pokemonFiltered = pokes.filter((pokemon) => {
    for (let element of pokemon.types) {
      if (element.type.name === type) {
        return (pokemonFiltered = [...pokemonFiltered, pokemon]);
      }
    }
  });


  ol$$.innerHTML = ""
  renderFront(pokemonFiltered)

};


const search = () => {

  const pokemonSearch = pokes.filter((pokemon) => {
    return pokemon.name
      .toLowerCase()
      .includes(searchInput$$.value.toLocaleLowerCase());
  });


  ol$$.innerHTML = ""
  renderFront(pokemonSearch)
}

searchInput$$.addEventListener("input", search)

function renderFront(pokemonsToPrint) {

  ol$$.innerHTML = "";
  for (const pokemon of pokemonsToPrint) {
    const cardLi$$ = document.createElement("li");
    const cardFront$$ = document.createElement("div");
    cardLi$$.appendChild(cardFront$$);
    const cardBack$$ = document.createElement("div");
    cardLi$$.appendChild(cardBack$$);
    // ELEMENTOS CARDFRONT
    const header$$ = document.createElement("div")
    header$$.setAttribute("class", "headerCard")
    const h2$$ = document.createElement("h2");
    h2$$.setAttribute("class", "name");
    h2$$.textContent = pokemon.name;



    //Creación de circulo detrás imagen
    const circle$$ = document.createElement("div");
    // const number$$ = document.createElement("p");
    // number$$.textContent = '#'+pokemon.id;

    circle$$.setAttribute("id", "circle");
   

    const imageContainer$$ = document.createElement("div");
    const img$$ = document.createElement("img");
    img$$.setAttribute("class", "imgFront")
    img$$.src = pokemon.sprites.other.dream_world.front_default;

    // sprites.versions["generation-v"]["black-white"].animated.front_default;

    //sprites.other.dream_world.front_default;


    //sprites.other.home.front_default;

    //sprites.versions["generation-v"]["black-white"].animated.front_default;


    const id$$ = document.createElement("h3");

    id$$.textContent = pokemon.id;

    const types$$ = document.createElement("div");


    types$$.setAttribute("id", "typeDiv");

    for (const tipo of pokemon.types) {
      const nameType$$ = document.createElement("img");
      nameType$$.setAttribute("id", "nameType");
      types$$.appendChild(nameType$$);
      nameType$$.src = './assets/' + tipo.type.name + '.png'

      if (tipo.type.name === "grass") {

        cardLi$$.style.backgroundColor = "#4A9681";
      }
      if (tipo.type.name === "electric") {

        cardLi$$.style.backgroundColor = "#FFEA70";
      }
      if (tipo.type.name === "normal") {

        cardLi$$.style.backgroundColor = "#d8a3ac";
      }
      if (tipo.type.name === "fire") {

        cardLi$$.style.backgroundColor = "#FF675C";
      }
      if (tipo.type.name === "water") {
        cardLi$$.style.backgroundColor = "#0596C7";
      }
      if (tipo.type.name === "ice") {
        cardLi$$.style.backgroundColor = "#AFEAFD";
      }
      if (tipo.type.name === "rock") {

        cardLi$$.style.backgroundColor = "#999799";
      }
      if (tipo.type.name === "flying") {
        cardLi$$.style.backgroundColor = "#7AE7C7";
      }

      if (tipo.type.name === "bug") {
        cardLi$$.style.backgroundColor = "#A2FAA3";
      }
      if (tipo.type.name === "poison") {

        cardLi$$.style.backgroundColor = "#7e54c7";
      }
      if (tipo.type.name === "ground") {
        cardLi$$.style.backgroundColor = "#d86c00";
      }
      if (tipo.type.name === "dragon") {
        cardLi$$.style.backgroundColor = "#DA627D";
      }
      if (tipo.type.name === "steel") {
        cardLi$$.style.backgroundColor = "#1D8A99";
      }
      if (tipo.type.name === "fighting") {
        cardLi$$.style.backgroundColor = "#2F2F2F";
      }
      if (tipo.type.name === "psychic") {
        cardLi$$.style.backgroundColor = "#FFC6D9";
      }
      if (tipo.type.name === "ghost") {
        cardLi$$.style.backgroundColor = "#561D25";
      }
      if (tipo.type.name === "fairy") {
        cardLi$$.style.backgroundColor = "#e589a8";
      }
    };

    // ELEMENTOS CARDBACK
    const imgBackDiv$$ = document.createElement("div");
    const imgBack$$ = document.createElement("img");
    imgBackDiv$$.setAttribute("class","img-back-div")
    imgBack$$.setAttribute("class", "imgBack")
    imgBack$$.src = pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default;
    imgBackDiv$$.appendChild(imgBack$$);
    cardBack$$.appendChild(imgBackDiv$$);

    const h2$$Back = document.createElement("h2");
    h2$$Back.setAttribute("class", "h2Back");
    h2$$Back.textContent = "#" + pokemon.id;
    cardBack$$.appendChild(h2$$Back);

    const heightWeight$$ = document.createElement("span");
    heightWeight$$.setAttribute("class", "heightWeight")
    cardBack$$.appendChild(heightWeight$$);

    const height$$ = document.createElement("p");
    height$$.textContent = "Altura" + " " + pokemon.height;
    heightWeight$$.appendChild(height$$);
    const weight$$ = document.createElement("p");
    weight$$.textContent = "Peso" + " " + pokemon.weight;
    heightWeight$$.appendChild(weight$$);

    

    const experience$$ = document.createElement("span");
    experience$$.setAttribute("class", "experience")
    cardBack$$.appendChild(experience$$);
    const experienceText$$ = document.createElement("p");
    experienceText$$.textContent = "Experiencia "
    experience$$.appendChild(experienceText$$);
    const experienceResul$$ = document.createElement("p");
    experienceResul$$.textContent = pokemon.base_experience;
    experience$$.appendChild(experienceResul$$);


    // const hp$$ = document.createElement("span");
    // hp$$.setAttribute("class", "hp")
    // cardBack$$.appendChild(hp$$);
    // const hpText$$ = document.createElement("p");
    // hpText$$.textContent = "Hp"
    // hp$$.appendChild(hpText$$);
    // const hpResul$$ = document.createElement("p");
    // hpResul$$.textContent = pokemon.stats[0].base_stat;
    // hp$$.appendChild(hpResul$$);

    // const attack$$ = document.createElement("span");
    // attack$$.setAttribute("class", "hp")
    // cardBack$$.appendChild(attack$$);
    // const attackText$$ = document.createElement("p");
    // attackText$$.textContent = "Ataque";
    // attack$$.appendChild(attackText$$);
    // const attackResul$$ = document.createElement("p");
    // attackResul$$.textContent = pokemon.stats[1].base_stat;
    // attack$$.appendChild(attackResul$$);

    const especialAttack$$ = document.createElement("span");
    especialAttack$$.setAttribute("class", "hp")
    cardBack$$.appendChild(especialAttack$$);
    const especialAttackText$$ = document.createElement("p");
    especialAttackText$$.textContent = "Ataq. Especial"
    especialAttack$$.appendChild(especialAttackText$$);
    const especialAttackResul$$ = document.createElement("p");
    especialAttackResul$$.textContent = pokemon.stats[4].base_stat;
    especialAttack$$.appendChild(especialAttackResul$$);

    const defense$$ = document.createElement("span");
    defense$$.setAttribute("class", "hp");
    cardBack$$.appendChild(defense$$);
    const defenseText$$ = document.createElement("p");
    defenseText$$.textContent = "Defensa";
    defense$$.appendChild(defenseText$$);
    const defenseTextResul$$ = document.createElement("p");
    defenseTextResul$$.textContent = pokemon.stats[2].base_stat;
    defense$$.appendChild(defenseTextResul$$);

    const especialDefense$$ = document.createElement("span");
    especialDefense$$.setAttribute("class", "hp");
    cardBack$$.appendChild(especialDefense$$);
    const especialDefenseText$$ = document.createElement("p");
    especialDefenseText$$.textContent = "Def.Especial";
    especialDefense$$.appendChild(especialDefenseText$$);
    const especialDefenseResul$$ = document.createElement("p");
    especialDefenseResul$$.textContent = pokemon.stats[3].base_stat;
    especialDefense$$.appendChild(especialDefenseResul$$);

    const speed$$ = document.createElement("span");
    speed$$.setAttribute("class", "hp");
    cardBack$$.appendChild(speed$$);
    const speedText$$ = document.createElement("p");
    speedText$$.textContent = "Velocidad";
    speed$$.appendChild(speedText$$);
    const speedResul$$ = document.createElement("p");
    speedResul$$.textContent = pokemon.stats[5].base_stat;
    speed$$.appendChild(speedResul$$);

    cardLi$$.setAttribute("class", "li");
    imageContainer$$.setAttribute("class", "imageContainer");
    types$$.setAttribute("class", "element");
    cardFront$$.setAttribute("class", "front");
    cardBack$$.setAttribute("class", "back");


    // cardFront$$.appendChild(h2$$);
    // cardFront$$.appendChild(id$$);
    cardFront$$.appendChild(header$$)
    header$$.appendChild(h2$$)
    header$$.appendChild(id$$)
    cardFront$$.appendChild(types$$);
    cardFront$$.appendChild(imageContainer$$);
    imageContainer$$.appendChild(img$$);
    cardFront$$.appendChild(circle$$);

   


    ol$$.appendChild(cardLi$$)

    //Con este escuchador de eventos giramos la carta al hacer click
    cardLi$$.addEventListener('click', function () {

      cardLi$$.classList.toggle('is-flipped')

    });
  }
};



// function loader() {


function quitePreloader() {
  let loader = document.querySelector('#preloader');
  loader.style.display = "none";

}
const myTimeOut = setTimeout(quitePreloader, 2000);


function init() {
  getPokemons();




};

window.onload = init;