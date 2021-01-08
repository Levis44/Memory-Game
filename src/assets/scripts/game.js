let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,
    cards : null,
    moves : 1,

    techs : [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],


    setCard: function(id) {

        // cria um array com somente um card, que tem o id passado
        // card = o primeiro elemento do array (que só tem um mesmo)
        let card = this.cards.filter(card => card.id === id)[0];

        // se a card estiver flipada ou o lockmode estiver true, retorna false
        if(card.flipped || this.lockMode){
            return false;
        }

        // se a firstCard for diferente de null, ela vai valer o card e retornar true
        // se não, a card vai ser o secondCard e vai ativar o lockMode
        if(!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

        

    },

    unflipCards: function() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    // se os ícones forem iguais, deu match (retorna true)
    checkMatch: function () {

        // se o firstCard ou o secondCard forem nulos, retorna false
        // pra ó ver se são iguais se tiverem sido setadas
        if(!this.firstCard || !this.secondCard) {
            return false;
        } else {
            return this.firstCard.icon === this.secondCard.icon
        }
       
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    checkGameOver: function() {
        // cria um filtro pra ver todas as cartas que tiverem com flipped false
        // retorna se não tiver nenhuma ou se ainda tiver
        return this.cards.filter(card => !card.flipped).length == 0;
    },


    createCardsFromTechs: function() {

        this.cards = [];
    
        // para cada tech ele chama a função createPairFromTech
        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech));
        });     
        
        // Retorna um array com as 20 cartas. 
        // Se desse só um map, retornaria um array com 10 arrays em pares
    
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },
    
    createPairFromTech: function (tech) {
        // Retorna 1 array com duas cartas da mesma tech, mas com ids diferentes
        return [
            {
                id: this.createIdWithTech(tech),
                icon: tech,
                flipped: false
            }, 
            {
                id: this.createIdWithTech(tech),
                icon: tech,
                flipped: false
            }
        ];
    },
    
    createIdWithTech: function (tech) {
        // cria Id
        return tech + parseInt(Math.random() * 1000);
    },

    
    shuffleCards: function (cards) {
        // index atual começa em 20 
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while(currentIndex !== 0) {
            // gera um Index aleatório para trocar de posição
            randomIndex = Math.floor(Math.random() * currentIndex);
            // diminui o Index atual
            currentIndex--;

            // joga o valor do cards[randomIndex] em cards[currentIndex]] e ao contrário também.
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    },

    addMove : function () {
        return this.moves++
    },

    resetMoves : function () {
        this.moves = 1;
    }

}

