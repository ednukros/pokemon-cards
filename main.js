//DECLARAMOS LAS VARIABLES QUE UTILIZAREMOS
let resp;
let resul;
let response;
let results;
let pokemons = [];
let firstPage = 1;
let lastPage;


//SELECCIONAMOS ELEMENTOS HTML 
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const ol$$ = document.querySelector("#pokedex");
const container$$ = document.querySelector(".container");
const typeButton = document.querySelector(".btn-type")
const searchInput$$ = document.querySelector(".search")


//PETICION A LA API
const getPokemons = async () => {
  response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150`);
  results = await response.json();



  for (let i = 1; i < results.results.length; i++) {


    resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);

    resul = await resp.json();
    pokemons.push(resul);

  }
  renderButtons();
  renderFront(pokemons);



}


//FUNCION PARA CREAR LOS BOTONES DE FILTRADO
const renderButtons = () => {

  const divBtnFilter$$ = document.querySelector(".buttons-filter");
  divBtnFilter$$.innerHTML = "";
  const types = [];

  for (const pokemon of pokemons) {

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
      //btn.style.backgroundColor = "#4A9681";
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
      btn.style.backgroundImage = "url('./assets/fight.png')";

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


const filterTypes = (type) => {

  const pokemonFiltered = pokemons.filter((pokemon) =>
    pokemon.types[0].type.name === type)

  //AQUI NO CONSIGO FILTRAR LA SEGUNDA POSICION DEL TYPES
  ol$$.innerHTML = ""
  renderFront(pokemonFiltered)
}

const search = () => {

  const pokemonSearch = pokemons.filter((pokemon) => {
    return pokemon.name
      .toLowerCase()
      .includes(searchInput$$.value.toLocaleLowerCase());
  });


  ol$$.innerHTML = ""
  renderFront(pokemonSearch)
}

searchInput$$.addEventListener("input", search)

function renderFront(pokemonsToPrint) {

  //ol$$.innerHTML = "";

  // const container$$ = document.querySelector(".container");
  // const ol$$ = document.querySelector("#pokedex");

  for (const pokemon of pokemonsToPrint) {
    const cardLi$$ = document.createElement("li");
    const cardFront$$ = document.createElement("div");
    cardLi$$.appendChild(cardFront$$);
    const cardBack$$ = document.createElement("div");
    cardLi$$.appendChild(cardBack$$);
    // ELEMENTOS CARDFRONT
    const h2$$ = document.createElement("h2");
    h2$$.textContent = pokemon.name;



    //Creación de circulo detrás imagen
    const circle$$ = document.createElement("div");

    circle$$.setAttribute("id", "circle");

    cardFront$$.appendChild(circle$$);

    const imageContainer$$ = document.createElement("div");
    const img$$ = document.createElement("img");
    img$$.setAttribute("class", "imgFront")
    img$$.src = pokemon.sprites.other.dream_world.front_default;


    //sprites.other.home.front_default;

    //sprites.versions["generation-v"]["black-white"].animated.front_default;


    const id$$ = document.createElement("h3");
    id$$.textContent = "#" + pokemon.id; //nuevo

    const types$$ = document.createElement("div");


    types$$.setAttribute("id", "typeDiv");

    for (const tipo of pokemon.types) {
      const nameType$$ = document.createElement("span");
      nameType$$.setAttribute("id", "nameType");
      types$$.appendChild(nameType$$);
      nameType$$.textContent = tipo.type.name;


      if (tipo.type.name === "grass") {
        nameType$$.style.color = "#4A9681";
        nameType$$.style.border = "4px solid #4A9681"
        cardLi$$.style.backgroundColor = "#4A9681"
      }
      if (tipo.type.name === "electric") {
        nameType$$.style.color = "#FFEA70";
        nameType$$.style.border = "4px solid ##FFEA70"
        cardLi$$.style.backgroundColor = "#FFEA70";
      }
      if (tipo.type.name === "normal") {
        nameType$$.style.color = "#d8a3ac";
        nameType$$.style.border = "4px solid #d8a3ac"
        cardLi$$.style.backgroundColor = "#d8a3ac";

      }
      if (tipo.type.name === "fire") {
        nameType$$.style.color = "#FF675C";
        nameType$$.style.border = "4px solid #FF675C"
        cardLi$$.style.backgroundColor = "#FF675C";


      }
      if (tipo.type.name === "water") {
        nameType$$.style.color = "#0596C7";
        nameType$$.style.border = "4px solid #0596C7"
        cardLi$$.style.backgroundColor = "#0596C7";
      }
      if (tipo.type.name === "ice") {
        nameType$$.style.color = "#AFEAFD";
        nameType$$.style.border = "4px solid #AFEAFD"
        cardLi$$.style.backgroundColor = "#AFEAFD";
      }
      if (tipo.type.name === "rock") {
        nameType$$.style.color = "#999799";
        nameType$$.style.border = "4px solid #999799"
        cardLi$$.style.backgroundColor = "#999799";
      }
      if (tipo.type.name === "flying") {
        nameType$$.style.color = "#7AE7C7";
        nameType$$.style.border = "4px solid #7AE7C7"
        cardLi$$.style.backgroundColor = "#7AE7C7";
      }

      if (tipo.type.name === "bug") {
        nameType$$.style.color = "#A2FAA3";
        nameType$$.style.border = "4px solid #A2FAA3"
        cardLi$$.style.backgroundColor = "#A2FAA3";
      }
      if (tipo.type.name === "poison") {
        nameType$$.style.color = "#7e54c7";
        nameType$$.style.border = "4px solid #7e54c7"
        cardBack$$.style.backgroundColor = "#7e54c7";
        cardLi$$.style.backgroundColor = "#7e54c7";
      }
      if (tipo.type.name === "ground") {
        nameType$$.style.color = "#d86c00";
        nameType$$.style.border = "4px solid #d86c00"
        cardBack$$.style.backgroundColor = "#d86c00";
        cardLi$$.style.backgroundColor = "#d86c00";
      }
      if (tipo.type.name === "dragon") {
        nameType$$.style.color = "#DA627D";
        nameType$$.style.border = "4px solid #DA627D"
        cardBack$$.style.backgroundColor = "#DA627D";
        cardLi$$.style.backgroundColor = "#DA627D";
      }
      if (tipo.type.name === "steel") {
        nameType$$.style.color = "#1D8A99";
        nameType$$.style.border = "4px solid #1D8A99"
        cardBack$$.style.backgroundColor = "#1D8A99";
        cardLi$$.style.backgroundColor = "#1D8A99";
      }
      if (tipo.type.name === "fighting") {
        nameType$$.style.color = "#2F2F2F";
        nameType$$.style.border = "4px solid #2F2F2F"
        cardBack$$.style.backgroundColor = "#2F2F2F";
        cardLi$$.style.backgroundColor = "#2F2F2F";
      }
      if (tipo.type.name === "psychic") {
        nameType$$.style.color = "#FFC6D9";
        nameType$$.style.border = "4px solid #FFC6D9"
        cardBack$$.style.backgroundColor = "#FFC6D9";
        cardLi$$.style.backgroundColor = "#FFC6D9";
      }
      if (tipo.type.name === "ghost") {
        nameType$$.style.color = "#561D25";
        nameType$$.style.border = "4px solid #561D25"
        cardBack$$.style.backgroundColor = "#561D25";
        cardLi$$.style.backgroundColor = "#561D25";
      }
      if (tipo.type.name === "fairy") {
        nameType$$.style.color = "#e589a8";
        nameType$$.style.border = "4px solid #e589a8"
        cardBack$$.style.backgroundColor = "#e589a8";
        cardLi$$.style.backgroundColor = "#e589a8";
      }
    };

    // ELEMENTOS CARDBACK
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


    const hp$$ = document.createElement("span");
    hp$$.setAttribute("class", "hp")
    cardBack$$.appendChild(hp$$);
    const hpText$$ = document.createElement("p");
    hpText$$.textContent = "Hp"
    hp$$.appendChild(hpText$$);
    const hpResul$$ = document.createElement("p");
    hpResul$$.textContent = pokemon.stats[0].base_stat;
    hp$$.appendChild(hpResul$$);

    const attack$$ = document.createElement("span");
    attack$$.setAttribute("class", "hp")
    cardBack$$.appendChild(attack$$);
    const attackText$$ = document.createElement("p");
    attackText$$.textContent = "Ataque";
    attack$$.appendChild(attackText$$);
    const attackResul$$ = document.createElement("p");
    attackResul$$.textContent = pokemon.stats[1].base_stat;
    attack$$.appendChild(attackResul$$);

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


    cardFront$$.appendChild(h2$$);
    cardFront$$.appendChild(imageContainer$$);
    imageContainer$$.appendChild(img$$);
    cardFront$$.appendChild(id$$);
    cardFront$$.appendChild(types$$);


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
const myTimeOut = setTimeout(quitePreloader, 3000);


function init() {
  getPokemons();

 


};

window.onload = init;