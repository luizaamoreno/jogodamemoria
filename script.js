const cartasArray = [
    { nome: 'A', img: 'path/to/image1.jpg' },
    { nome: 'B', img: 'path/to/image2.jpg' },
    { nome: 'C', img: 'path/to/image3.jpg' },
    { nome: 'D', img: 'path/to/image4.jpg' },
    { nome: 'A', img: 'path/to/image1.jpg' },
    { nome: 'B', img: 'path/to/image2.jpg' },
    { nome: 'C', img: 'path/to/image3.jpg' },
    { nome: 'D', img: 'path/to/image4.jpg' },
];

let tabuleiroJogo = document.getElementById('tabuleiro-jogo');

let primeiraCarta = null
let segundaCarta = null
let travaTabuleiro = false

function embaralhar(array) {
    array.sort(() => 0.5 - Math.random());
}

function criarTabuleiro() {
    embaralhar(cartasArray);
    cartasArray.forEach(item => {
        const carta = document.createElement('div');

        carta.classList.add('carta');
        carta.dataset.nome = item.nome;

        const img = document.createElement('img');
        img.src = item.img
        carta.appendChild(img)

        carta.addEventListener('click', virarCarta);

        tabuleiroJogo.appendChild(carta);

    })

}

function virarCarta(){
    if (travaTabuleiro)
        return;
    if (this === primeiraCarta)
        return;
        
    this.classList.add('virada');

    if (!primeiraCarta){
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    travaTabuleiro = true;

    verificarPar();
}

function verificarPar() {
    if (primeiraCarta.dataset.nome === segundaCarta.dataset.nome) {
        desativarCartas();
    } else {
        desvirarCartas();
    }
}

function desativarCartas() {
    primeiraCarta.removeEventListener('click', virarCarta)

    segundaCarta.removeEventListener('click', virarCarta)

    resetarTabuleiro();
}

function desvirarCartas() {
    setTimeout(() => {
        primeiraCarta.classList.remove('virada');

        segundaCarta.classList.remove('virada');

        resetarTabuleiro();
    }, 1000)
}

function resetarTabuleiro() {
    [primeiraCarta, segundaCarta, travaTabuleiro] = [null, null, false]
}

criarTabuleiro()