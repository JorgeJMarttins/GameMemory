function Jogar() {

    // Variáveis para o estado do jogo
    let vazio = "Vazio";
    let resetar = 0;
    let pontuacao = 0;
    let IdPrimeiraImagem = null;
    let checagem = false;
    let cartas = [];
    let qtdCartas = 0
    // Efeitos sonoros
    let somdeacerto = new Audio('somdeacerto.mp3');
    let somdeerro = new Audio('somdeerro.mp3');
    let somvitoria = new Audio('vitoria.mp3');
    let somdereset = new Audio ("somdereset.mp3");
    let somAtivo = true


    // Remove o botão de iniciar se ele existir
    const botaoiniciar = document.getElementById("iniciar");
    if (botaoiniciar){
        AtivarTelaCheia();
    }

    const botoesDificuldade = document.querySelectorAll('.dificuldades');
    if (botoesDificuldade.onclick){
        
    }
    botoesDificuldade.forEach(botao => botao.remove());

    //criação do botão de volume
    const buttonSound = document.createElement('button');
    buttonSound.setAttribute("id", "volume");
    buttonSound.innerHTML = '<span class="material-symbols-outlined"> volume_up </span>'
    buttonSound.addEventListener("click", tirarSom);
    document.querySelector("body").appendChild(buttonSound);

    // Cria o botão de reiniciar
    const button = document.createElement("button");
    button.setAttribute("id", "desistir");
    button.textContent = "Reiniciar";
    button.addEventListener("click", ReiniciarPagina);
    document.querySelector("body").appendChild(button);

    // Limpa o tabuleiro antes de criar um novo
    const tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = '';

    // Constroi o tabuleiro de acordo com a dificuldade
    function criarBotao(id, texto, evento) {
        const botao = document.createElement("button");
        botao.setAttribute("id", id);
        botao.setAttribute("class", "dificuldades");
        botao.textContent = texto;
        botao.addEventListener("click", evento);
        document.querySelector("body").appendChild(botao);
    }

    criarBotao("facil", "-Fácil-", ModoFacil);
    criarBotao("medio", "-Médio-", ModoMedio);
    criarBotao("dificil", "-Difícil-", ModoDificil);

    function construirTabuleiro(cartasArray, numCartas) {
        cartas = cartasArray;
        qtdCartas = numCartas;
        
        for (let i = 0; i < cartasArray.length; i++) {
            const img = document.createElement("img");
            img.setAttribute("src", "imgs/verso.jpg");
            img.setAttribute("id", i);
            img.classList.add("card");
            img.addEventListener("click", () => {
                exibirCarta(i);
                AtivarTelaCheia();
            });
            tabuleiro.appendChild(img);
        }
        removerDificuldade();
    }

    function ModoFacil() {

        document.getElementById("tabuleiro").style.gridTemplateColumns = "repeat(3, 1fr)";
        document.getElementById("tabuleiro").style.padding = "40px";
        const cartas = [
            "imgs/1.jpg", "imgs/2.jpg", "imgs/3.jpg", "imgs/4.jpg", "imgs/5.jpg",
            "imgs/6.jpg", "imgs/1.jpg", "imgs/2.jpg", "imgs/3.jpg", "imgs/4.jpg",
            "imgs/5.jpg", "imgs/6.jpg"
        ];
        cartas.sort(() => Math.random() - 0.5);
        construirTabuleiro(cartas, 6);
    }

    function ModoMedio() {

        document.getElementById("tabuleiro").style.gridTemplateColumns = "repeat(4, 1fr)";
        

        const cartas = [
            "imgs/1.jpg", "imgs/2.jpg", "imgs/3.jpg", "imgs/4.jpg", "imgs/5.jpg",
            "imgs/6.jpg", "imgs/7.jpg", "imgs/8.jpg", "imgs/9.jpg", "imgs/10.jpg",
            "imgs/1.jpg", "imgs/2.jpg", "imgs/3.jpg", "imgs/4.jpg", "imgs/5.jpg",
            "imgs/6.jpg", "imgs/7.jpg", "imgs/8.jpg", "imgs/9.jpg", "imgs/10.jpg"
        ];
        cartas.sort(() => Math.random() - 0.5);
        construirTabuleiro(cartas, 10);
    }

    function ModoDificil() {
        
        
        document.getElementById("tabuleiro").style.gridTemplateColumns = "repeat(8, 1fr)";
        
        const cartas = [
            "imgs/1.jpg", "imgs/2.jpg", "imgs/3.jpg", "imgs/4.jpg", "imgs/5.jpg",
            "imgs/6.jpg", "imgs/7.jpg", "imgs/8.jpg", "imgs/9.jpg", "imgs/10.jpg",
            "imgs/11.jpg", "imgs/12.jpg", "imgs/13.jpg", "imgs/14.jpg", "imgs/15.jpg",
            "imgs/16.jpg", "imgs/17.jpg", "imgs/18.jpg", "imgs/19.jpg", "imgs/20.jpg",
            "imgs/1.jpg", "imgs/2.jpg", "imgs/3.jpg", "imgs/4.jpg", "imgs/5.jpg",
            "imgs/6.jpg", "imgs/7.jpg", "imgs/8.jpg", "imgs/9.jpg", "imgs/10.jpg",
            "imgs/11.jpg", "imgs/12.jpg", "imgs/13.jpg", "imgs/14.jpg", "imgs/15.jpg",
            "imgs/16.jpg", "imgs/17.jpg", "imgs/18.jpg", "imgs/19.jpg", "imgs/20.jpg"
        ];
        cartas.sort(() => Math.random() - 0.5);
        construirTabuleiro(cartas, 20);
        
    }

    function removerDificuldade(){
        document.getElementById("facil").remove();
        document.getElementById("medio").remove();
        document.getElementById("dificil").remove();
    }

    function exibirCarta(posicao) {
        if (checagem || posicao == IdPrimeiraImagem) return;

        const img = document.getElementById(posicao);
        img.src = cartas[posicao];

        if (vazio == "Vazio") {
            vazio = posicao;
            IdPrimeiraImagem = posicao;
        } else {
            let posicaoAnterior = vazio;
            checagem = true;

            if (cartas[posicao] != cartas[posicaoAnterior]) {
                somdeerro.play();
                setTimeout(() => {
                    document.getElementById(posicao).src = "imgs/verso.jpg";
                    document.getElementById(posicaoAnterior).src = "imgs/verso.jpg";
                    vazio = "Vazio";
                    checagem = false;
                }, 500);
                pontuacao -= 10;
            }else {
                document.getElementById(posicao).onclick = null;
                document.getElementById(posicaoAnterior).onclick = null;
                document.getElementById(posicao).id = null;
                document.getElementById(posicaoAnterior).id = null;
                
                somdeacerto.play();
                setTimeout(() => {
                    vazio = "Vazio";
                    checagem = false;
                }, 1);
                pontuacao += 50;
                resetar += 1;

                if (resetar == qtdCartas) {
                    somvitoria.play();
                    tabuleiro.innerHTML = '';
                    const div = document.createElement("div");
                    div.setAttribute("id", "pontuacao");
                    tabuleiro.appendChild(div);

                    let final = document.getElementById("pontuacao").style;
                    final.backgroundColor = 'rgb(129, 0, 0)';
                    final.color = 'white';
                    final.height = '150px';
                    final.width = '500px';
                    final.borderRadius = '12px';
                    final.padding = '5px';
                    final.margin = 'auto';
                    final.marginTop = '17%';
                    final.textAlign = 'center';
                    final.marginBottom = '17%';

                    document.getElementById("desistir").remove();

                    document.getElementById("pontuacao").innerHTML = `<h1>Parabéns, Você concluiu o jogo</h1><h2>Sua pontuação é de: ${pontuacao}</h2>`;
                    
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }
            }
        }
    }

    // Reinicia o jogo
    function ReiniciarPagina() {
        somdereset.play()
        buttonSound.remove();
        Jogar();
    }

    function AtivarTelaCheia() {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    }

    // Modifica a função que alterna o som
    function tirarSom() {
        if (somAtivo) {
            // Desativa os sons
            somdeacerto.muted = true;
            somdeerro.muted = true;
            somvitoria.muted = true;
            somdereset.muted = true;
            somAtivo = false;
            buttonSound.innerHTML = '<span class="material-symbols-outlined"> no_sound </span>'; // Alterar o ícone para volume desligado
        } else {
            // Ativa os sons
            somdeacerto.muted = false;
            somdeerro.muted = false;
            somvitoria.muted = false;
            somdereset.muted = false;
            somAtivo = true;
            buttonSound.innerHTML = '<span class="material-symbols-outlined"> volume_up </span>'; // Alterar o ícone para volume ligado
        }
    }
}
