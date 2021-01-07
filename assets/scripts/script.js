const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

let techs = [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react',
];

let cards = null;

// começar jogo
startGame();

function startGame() {
    // criar cartas
    cards = createCardsFromTechs(techs);

    // embaralhar
    shuffleCards(cards);

    // montar tabuleiro
    initializeCards(cards);
}


function initializeCards(cards) {
    // pegar o tabuleiro
    let gameBoard = document.getElementById('gameBoard');
    
    // para cada carta vai criar o elemento html
    cards.forEach((card) => {

        // cria a div (em volta)
        let cardElement = document.createElement('div');
        // atribui o id createIdWithTech()
        cardElement.id = card.id;
        // atribui a classe
        cardElement.classList.add(CARD);
        // atribui o icone
        cardElement.dataset.icon = card.icon;

        // cria o conteúdo da carta (duas divs)
        createCardContent(card, cardElement);

        // add evento de click pra virar carta
        // o cardElement é o this na função, que é a divzona
        cardElement.addEventListener('click', flipCard);
        // coloca a div dentro do board
        gameBoard.appendChild(cardElement);

    });
}

function createCardContent(card, cardElement) {
    // div front
    createCardFace(FRONT, card, cardElement);
    // div front
    createCardFace(BACK, card, cardElement);
}


function createCardFace(face, card, element) {
    
    // cria a div
    let cardElementFace = document.createElement('div');

    // aqui é onde passa se é front ou back
    cardElementFace.classList.add(face);

    if(face === FRONT) {
    
    // Se é front, vai fazer as atribuições

    // cria a tag img
    let iconElement = document.createElement('img');
    // add a class icon
    iconElement.classList.add(ICON);
    // passa o caminho da imagem
    iconElement.src = "./assets/images/" + card.icon + ".png";
    // coloca dentro da div
    cardElementFace.appendChild(iconElement);

    } else {
        // se for back add isso
        cardElementFace.innerHTML = "&lt/&gt";
    }
    // coloca a div dentro da divzona
    element.appendChild(cardElementFace)
}


function shuffleCards(cards) {
    // index atual começa em 20 
    let currentIndex = cards.length;
    let randomIndex = 0;

    while(currentIndex !== 0) {
        // gera um Index aleatório para trocar de posição
        randomIndex = Math.floor(Math.random() * currentIndex);
        // diminui o Index atual
        currentIndex--;

        // joga o valor do cards[randomIndex] em cards[currentIndex]] e ao contrário também.
        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]];
    }
}

function createCardsFromTechs(techs) {

    let cards = [];

    // para cada tech ele chama a função createPairFromTech
    techs.forEach((tech) => {
        cards.push(createPairFromTech(tech));
    });     
    
    // Retorna um array com as 20 cartas. 
    // Se desse só um map, retornaria um array com 10 arrays em pares

    return cards.flatMap(pair => pair);
}

function createPairFromTech(tech) {
    // Retorna 1 array com duas cartas da mesma tech, mas com ids diferentes
    return [
        {
            id: createIdWithTech(tech),
            icon: tech,
            flipped: false
        }, 
        {
            id: createIdWithTech(tech),
            icon: tech,
            flipped: false
        }
    ];
}

function createIdWithTech(tech) {
    // cria Id
    return tech + parseInt(Math.random() * 1000);
}

function flipCard() {
    // add a classe flip no elemento clicado, o this é a divzona
    this.classList.add('flip');
}