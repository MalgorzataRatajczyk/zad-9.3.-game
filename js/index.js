"use strict";

(function () {

	document.getElementById('start').innerHTML = 'Click NEW GAME button to start game' + '<br>';

	// zmienne
	var paper = document.getElementById('paper'); // gracz wybiera papier
	var stone = document.getElementById('stone'); // gracz wybiera kamień
	var scissors  = document.getElementById('scissors'); // gracz wybiera nożyczki
	var output = document.getElementById('output'); // wyświetla wynik rundy
	var playerWin = 0; // wynik gracza przed rozpoczęciem gry
	var computerWin = 0; //wynik komputera przed rozpoczęciem gry
	var rounds = 0; // ilość rudn przed rozpoczęciem gry
	var computerChoice = document.getElementById('computerChoice'); //wstawia wybór komputera
	var startGame = document.getElementById('startGame');
	
	startGame.addEventListener('click', function () {
		
		reset();
		
		var newGame = window.prompt('Enter the number of won rounds ending the game'); // pyta gracza o ilość rund do rozegrania
		document.getElementById('roundToWin').innerHTML = newGame; // wstawia ustaloną przez gracza ilość rund
		
		rounds = newGame;
		
	});
	 
	function reset() {
		rounds = 0;
		playerWin = 0;
		computerWin = 0;
		
		paper.disabled = false;
		stone.disabled = false;
		scissors.disabled = false;
		
		document.getElementById('playerWin').innerHTML = playerWin;
		document.getElementById('computerWin').innerHTML = computerWin;
		
		output.innerHTML = '';
		computerChoice.innerHTML = '';
	}

	// funkcja losująca liczbę z zakresu 1 do 3
	function randomNumber (a, b) {
		var Number = Math.floor(Math.random() *3) + 1;
		return Number;
	}
	// funkcja przypisująca do wylosowanej liczby wybór komputera
	function computerPick() {
		var computerMove = randomNumber(1,3);
		
		if (computerMove == 1) {
			computerMove = 'paper'; 
		}	else if (computerMove == 2) {
			computerMove = 'stone';
		} else if (computerMove == 3) {
			computerMove =  'scissors';
		}
		
		computerChoice.innerHTML = computerMove; // wyświetla wybór komputera
		
		return computerMove;
		
	}
 
	paper.addEventListener('click', function () {
		var computerMove = computerPick();
		compare('paper', computerMove, output);
	}); 

	stone.addEventListener('click', function () {
		var computerMove = computerPick();
		compare('stone', computerMove, output);
	});

	scissors.addEventListener('click', function () {
		var computerMove = computerPick();
		compare('scissors', computerMove, output);
	});

	function compare (playerMove, computerMove, output) {
	
		if (playerMove === computerMove) {
			output.innerHTML = 'It is a tie!';

  	} else if (playerMove == 'paper' && computerMove == 'scissors') {
			output.innerHTML = 'You lose! Try again.';
			computerWin++;
		} else if (playerMove == 'stone' && computerMove == 'paper') {
			output.innerHTML = 'You lose! Try again.';
			computerWin++;
		} else if (playerMove == 'scissors' && computerMove == 'stone') {
			output.innerHTML = 'You lose! Try again.';
			computerWin++;
		} else {
			output.innerHTML = 'You win!';
			playerWin++;
		}
	  	document.getElementById('playerWin').innerHTML = playerWin;
			document.getElementById('computerWin').innerHTML = computerWin;
		
			checkGameOver(playerWin, computerWin, rounds);
				
	}
	
	// funkcja kończąca grę
	function checkGameOver (playerWin, computerWin, newGame) {
		
		console.log(playerWin, computerWin, newGame);
		
		if (playerWin == newGame || computerWin == newGame) {
			
			if (playerWin > computerWin) {
				output.innerHTML += ('</br> CONGRATULATION, YOU WON THE ENTIRE GAME!!!');
			}	else {
				output.innerHTML += ('</br> GAME OVER - YOU LOSE'); 
			}
			
			paper.disabled = true;
			stone.disabled = true;
			scissors.disabled = true;
						
		}
		
	}
	
})();