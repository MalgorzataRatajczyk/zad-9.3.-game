"use strict";

(function () {

    document.getElementById('start').innerHTML = 'Click NEW GAME button to start game' + '<br>';
    // podpięcie guzików
    var paper = document.getElementById('paperButton');
    var stone = document.getElementById('stoneButton');
    var scissors = document.getElementById('scissorsButton');
    var final_Output = document.querySelector('.final_Output');

    // zmienne
    var startGame = document.getElementById('startGame'); //guzik rozpoczynający grę

    // zmienna params zawierająca obiekt ze zmiennymi globalnymi
    var params = {
        output: document.getElementById('output'), // wyświetla wynik rundy
        playerWin: 0, // wynik gracza przed rozpoczęciem gry
        computerWin: 0, //wynik komputera przed rozpoczęciem gry
        computerChoice: document.getElementById('computerChoice'), //wstawia wybór komputera
        newGame: 0,
        rounds: 0, //ile rudn trzeba wygrać żeby wygrać całą grę
        gameRounds: 0, //liczba wszystkich rozegranych rund w grze
        roundToWin: document.getElementById('roundToWin'),
        winerIs: '',
        progress: [],
    };

    /* rozpoczęcie gry */
    startGame.addEventListener('click', function () {

        reset();

        params.newGame = window.prompt('Enter the number of won rounds ending the game'); // pyta gracza o ilość rund do rozegrania
        document.getElementById('roundToWin').innerHTML = params.newGame; // wstawia ustaloną przez gracza ilość rund

        params.rounds = params.newGame;

    });

    function reset() {
        params.rounds = 0;
        params.playerWin = 0;
        params.computerWin = 0;

        paper.disabled = false;
        stone.disabled = false;
        scissors.disabled = false;

        document.getElementById('playerWin').innerHTML = params.playerWin;
        document.getElementById('computerWin').innerHTML = params.computerWin;

        params.output.innerHTML = '';
        params.computerChoice.innerHTML = '';
        final_Output.innerHTML = '';
    }

    // funkcja losująca liczbę z zakresu 1 do 3
    function randomNumber(a, b) {

        var Number = Math.floor(Math.random() * 3) + 1;

        return Number;

    }
    // funkcja przypisująca do wylosowanej liczby wybór komputera
    function computerPick() {

        var computerMove = randomNumber(1, 3);

        if (computerMove == 1) {
            computerMove = 'paper';
        } else if (computerMove == 2) {
            computerMove = 'stone';
        } else if (computerMove == 3) {
            computerMove = 'scissors';
        }

        params.computerChoice.innerHTML = computerMove; // wyświetla wybór komputera

        return computerMove;

    }
    // wybieram wszystkie guziki z klasą player-move, wykonuję po nich pętle i podpinam funkcję addEventListener
    var playerMoves = document.querySelectorAll('.player-move'); //przypisuję do zmiennej buttonPlayerMove guziki z klasą player-move

    for (var i = 0; i < playerMoves.length; i++) { //wykonuję pętla po guzikach z klasą player-move	

        playerMoves[i].addEventListener('click', function () {

            var computerMove = computerPick();

            var playerMove = this.getAttribute('data-move'); //pobieram z elementów z klasą player-move atrybut data-move

            gameResult(playerMove, computerMove);

        });

    }

    function gameResult(playerMove, computerMove) { //funkcja porównująca wynik

        if (playerMove === computerMove) {
            params.output.innerHTML = 'It is a tie!';
            params.gameRounds++;
            params.winerIs = 'Tie';

        } else if (playerMove == 'paper' && computerMove == 'scissors') {
            params.output.innerHTML = 'You lose! Try again.';
            params.computerWin++;
            params.gameRounds++;
            params.winerIs = 'computer';

        } else if (playerMove == 'stone' && computerMove == 'paper') {
            params.output.innerHTML = 'You lose! Try again.';
            params.computerWin++;
            params.gameRounds++;
            params.winerIs = 'computer';

        } else if (playerMove == 'scissors' && computerMove == 'stone') {
            params.output.innerHTML = 'You lose! Try again.';
            params.computerWin++;
            params.gameRounds++;
            params.winerIs = 'computer';

        } else {
            params.output.innerHTML = 'You win!';
            params.playerWin++;
            params.gameRounds++;
            params.winerIs = 'player';

        }

        document.getElementById('playerWin').innerHTML = params.playerWin;
        document.getElementById('computerWin').innerHTML = params.computerWin;

        // tabela wyników
        params.progress.push({
                playerMove: playerMove,
                computerMove: computerMove,
                output: params.output,
                gameRounds: params.gameRounds,
                playerWin: params.playerWin,
                computerWin: params.computerWin,
                winerIs: params.winerIs
            });

        checkGameOver();

    }

    // modale 
    var showModalOne = function (event) {
        // pobieram elementy DOM
        var modalOne = document.querySelector('#modal_overlay_one');

        modalOne.classList.add('show');

    };

    // funkcja zamykającą modal, przywiązana do kliknięć na elemencie z klasą "close-one". 
    var hideModalOne = function (event) {
        //event.preventDefault();
        document.querySelector('#modal_overlay_one').classList.remove("show");
    };

    var closeModalOne = document.querySelectorAll('#modal_one .close_modal_one');

    for (var i = 0; i < closeModalOne.length; i++) {
        closeModalOne[i].addEventListener('click', hideModalOne);
    }
    // zamykania modala poprzez kliknięcie w overlay 
    document.querySelector('#modal_overlay_one').addEventListener('click', hideModalOne);
    // blokada propagacji kliknięć z samego modala - inaczej każde kliknięcie wewnątrz modala również by go zamykało. 
    var modalOne = document.querySelector('#modal_one');

    for (var i = 0; i < modalOne.length; i++) {

        modalOne[i].addEventListener('click', function (event) {
            event.stopPropagation();

        });

    }

    function checkGameOver() {

        if (params.playerWin == params.newGame || params.computerWin == params.newGame) {

            if (params.playerWin > params.computerWin) {

                showModalOne();
                document.querySelector('.whoWin').innerHTML = '</br> CONGRATULATION, YOU WON THE ENTIRE GAME!!!';
            } else {

                showModalOne();
                document.querySelector('.whoWin').innerHTML = '</br> GAME OVER - YOU LOSE';
            }

            var html = '<table> \
                <thead> \
                    <tr> \
                        <th>Numer rundy</th> \
                        <th>Ruch gracza</th> \
                        <th>Ruch komputera</th> \
                        <th>Kto wygrał</th> \
                        <th>Wynik gry</th>\
                    </tr> \
                </thead> \
                <tbody>';

                for (var i=0; i < params.progress.length; i++) {
                    html += '<tr> \
                        <td>' + params.progress[i].gameRounds + '</td> \
                        <td>' + params.progress[i].playerMove + '</td> \
                        <td>' + params.progress[i].computerMove + '</td> \
                        <td>' + params.progress[i].winerIs + '</td> \
                        <td>' + params.progress[i].playerWin + ' - ' + params.progress[i].computerWin + '</td> \
                    </tr>';
                }

                html += '</tbody></table>';

                final_Output.innerHTML = html;

            paper.disabled = true;
            stone.disabled = true;
            scissors.disabled = true;

        }

    }

})();
