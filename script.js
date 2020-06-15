const boardGame = document.getElementById('boardGame');


let pokemons = [
    {
        name: 'Pikachu',
        src: 'src/pikachu.jpeg'
    },
    {
        name: 'Mewtwo',
        src: 'src/Mewtwo.jpeg'
    },
    {
        name: 'Baltazar',
        src: 'src/Baltazar.jpeg'
    }
];


let pokebalImage = 'src/pokeball.jpeg';

const randomPokemon = () => {
    let pokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
    return pokemon;

}


let pokemonsArray = [];

const createPokemonsToArray = (function () {

    pokemons.forEach(pokemon => {
        let pokemonCreate = randomPokemon();
        pokemonsArray.push(pokemonCreate);

        let copyPokemonCreate = { ...pokemonCreate };
        pokemonsArray.push(copyPokemonCreate);

        pokemons = pokemons.filter(el => el !== pokemonCreate);
    })
})();

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

let createPokemonArray = [];

const randomArrayWithPokemons = (function () {
    shuffle(pokemonsArray).map(pokemon => {
        let pokemonImage = document.createElement('img');
        pokemonImage.classList.add('box');
        pokemonImage.src = pokebalImage;
        pokemonImage.dataset.src = pokemon.src;
        pokemonImage.dataset.name = pokemon.name;
        boardGame.appendChild(pokemonImage);
        
    })
})();



let pokemonImages = [];

const previousPokemonsImages = (e) => {
    let pokemon = e.target;
    src = pokemon.dataset.src;
    pushPokemon(pokemon) && pokemon.setAttribute('src', src);
}

const pushPokemon = (node) => {
    if (pokemonImages.includes(node)) {
        return false;
    } else {
        pokemonImages.push(node);
    }
    if (pokemonImages.length == 2) {
        if (pokemonImages[0].dataset.name !== pokemonImages[1].dataset.name) {
            function closer(tab) {
                return () => {
                    tab.forEach(el => {
                        el.src = pokebalImage;
                    })
                }
            }
            setTimeout(closer([...pokemonImages]), 500);
        }
        pokemonImages.length = 0;
        return true;
    }
    return true;
}


const buttonBorderAdd = (e) => {
    const button = document.querySelector('button');
    button.addEventListener('mouseover', () => {
        button.classList.add('buttonBorder');
    })
    button.addEventListener('mouseout', () => {
        button.classList.remove('buttonBorder');
    })
    button.addEventListener('click', () => {
        location.reload();
    })
}


buttonBorderAdd();
boardGame.addEventListener('click', previousPokemonsImages);















