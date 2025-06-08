// o querySelector => seleciona apenas um elenmento (o primeiro que ele encontrar com as características que passarmos)


/* Escopo */
const body = document.querySelector('body');
const game = document.querySelector('.game');

/* Restart e contagem do timer*/
const count = document.querySelector('h1');
const reset = document.querySelector('.reset');

/* Personagem principal */
const ash = document.querySelector('#ash');

/* Pokemons */
const charmander = document.querySelector('#charmander');
const pikachu = document.querySelector('#pikachu');
const zubat = document.querySelector('#zubat');

/* Pro pokemon seguir o personagem principal */
let findCharmander = false;
let findPikachu = false;
let findZubat = false;

/* Áudio */
const audio = document.querySelector("audio");
audio.volume = 0.1;

const musicControl = document.querySelector('.music-control');

musicControl.addEventListener('click', (event) => {
    event.stopPropagation()

    event.target.src = `!${event.target.src}`.includes('on.png')
        ? "./assets/icons/off.png"
        : "./assets/icons/on.png";

    `${event.target.src}`.includes('on.png') ? audio.play() : audio.pause();
})

/* Posição do personagem principal */
function getRightPosition() {
    return parseInt(ash.style.right.split('px')) || 2;
}

function getTopPosition() {
    return parseInt(ash.style.top.split('px')) || 2;
}

/* Funções dos pokemons */

charmander.style.display = "none";
pikachu.style.display = "nome";
zubat.style.display = "none";

function verifyLookPokemon(to) {

    const pokemonRightPosition = to === 'ArrowLeft' ? `${getRightPosition() - 64}px` : `${getRightPosition() + 64}px`;

    if(findCharmander) {
        const newTopPosition = to = "ArrowUp" ? `${getTopPosition() + 8}px` : `${getTopPosition() - 8}px`;

        charmander.style.right = pokemonRightPosition;
        charmander.style.top = newTopPosition;
    }

    if(findPikachu) {
        const newTopPosition = to = "ArrowUp" ? `${getTopPosition() + 36}px` : `${getTopPosition() - 36}px`;

        pikachu.style.right = pokemonRightPosition;
        pikachu.style.top = newTopPosition;
    }

    if(findZubat) {
        const newTopPosition = to = "ArrowUp" ? `${getTopPosition() + 72}px` : `${getTopPosition() - 72}px`;

        zubat.style.right = pokemonRightPosition;
        zubat.style.top = newTopPosition;
    }

    if (
        getTopPosition() >= 2 &&
        getTopPosition() <= 98 &&
        getRightPosition() >= 130 &&
        getRightPosition() <=216
    ) {
        charmander.style.display = "block";
        findCharmander = true;
        return;
    }

    if (
        getTopPosition() >= 474 &&
        getTopPosition() <= 594 &&
        getRightPosition() <= 138 &&
        getRightPosition() >=42
    ) {
        zubat.style.display = "block";
        findZubat = true;
        return;
        
    }

    if (
        getTopPosition() >= 266 &&
        getTopPosition() <= 394 &&
        getRightPosition() >= 546 &&
        getRightPosition() <=650
    ) {
        pikachu.style.display = "block";
        findPikachu = true;
        return;
        
    }
}


/* Eventos */
/*addEventListener pegar o tipo de evento que quer, dando uma função de callback*/

body.addEventListener('keydown', (event) => {
    event.stopPropagation();

    switch (event.code) {
        case 'ArrowLeft':
            if (getRightPosition() < 770) {
                ash.style.right = `${getRightPosition() + 8}px`;
                ash.src = './assets/left.png';
            }
            break;
           
        
        case 'ArrowRight':
            if(getRightPosition() > 2) {
                ash.style.right = `${getRightPosition() - 8}px`;
                ash.src = './assets/right.png';
            }
            break;

        case 'ArrowDown':
            if(getTopPosition() < 625) {
                ash.style.top = `${getTopPosition() + 8}px`;
                ash.src = './assets/front.png';
            }
            break;

        case 'ArrowUp':
            if(getTopPosition() > 2) {
                ash.style.top = `${getTopPosition() - 8}px`;
                ash.src = './assets/back.png';
            }
            break;

        default:

            break;
    }

    verifyLookPokemon(event.code);
})