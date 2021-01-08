const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"


// começar jogo
startGame();

function startGame() {
    
    // montar tabuleiro  // criar cartas
    initializeCards(game.createCardsFromTechs());
}


function initializeCards(cards) {
    // pegar o tabuleiro
    let gameBoard = document.getElementById('gameBoard');
    
    // limpa o tabuleiro
    gameBoard.innerHTML = ''

    // para cada carta vai criar o elemento html
    game.cards.forEach((card) => {

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

function flipCard() {

    // se eu conseguir colocar uma carta, eu coloco o flip
    if(game.setCard(this.id)){
        // add a classe flip no elemento clicado, o this é a divzona
        this.classList.add('flip');

        // pega o moves
        let movesLayer = document.getElementById('moves');
        // add no moves
        let moves = game.addMove();
        // exibe
        movesLayer.innerHTML = moves;


        // se tiver a secondCard ele vai verificar se deu match
        if(game.secondCard) {
            // se teve um match limpa as variáveis
            if(game.checkMatch()) {
                game.clearCards()

                // em todo match, ve se tem um gameOver
                if(game.checkGameOver()) {
                    let gameOverLayer = document.getElementById('gameOver');
                    gameOverLayer.style.display = 'flex';
                    
                }
            } else {
                // tempinho
                setTimeout(() => {

                    // pega as cartas que foram selecionadas
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    // remove as classes para voltar para baixo
                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');

                    // tira o flipped = true dos elemntos e limpa a variável
                    game.unflipCards();
                }, 1000)
            
            }
        }
    }
    
}


function restart() {
    game.resetMoves();
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById('gameOver');
    gameOverLayer.style.display = 'none';
}