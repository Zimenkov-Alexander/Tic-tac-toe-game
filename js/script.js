'use strict';

window.addEventListener('DOMContentLoaded', () => {

	const gameBlocks = document.querySelectorAll('.game--block'),
		  newGameBtn = document.querySelector('#reset'),
		  resteScoreBtn = document.querySelector('#reset-score'),
		  modal = document.querySelector('.modal'),
		  modalText = document.querySelector('.modal__text'),
		  modalBtnClose = modal.querySelector('[data-close]'),
		  scorePlayerOne = document.querySelector('[data-player="1"]'), 
		  scorePlayerTwo = document.querySelector('[data-player="2"]'); 
	
	const checkArray = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

	let index = 0,
		scorePlayer1 = 0,
		scorePlayer2 = 0;

		takeLocalStorage();

	gameBlocks.forEach(item => {
		item.addEventListener('click', () => {
			if (!item.classList.contains('X') && !item.classList.contains('circle')){
				if (index%2 === 0){
					item.classList.add('X');
				} else {
					item.classList.add('circle');
				}
				check(checkArray, gameBlocks);
				index++;
				
				if (index === gameBlocks.length){
					endGame ('Ничья!');
				}
			}
		});
	});

	newGameBtn.addEventListener('click', () => {
		clearPlayingField();
		modalClose();
	});	

	resteScoreBtn.addEventListener('click', resteScore);

	modalBtnClose.addEventListener('click', modalClose);

	window.addEventListener('keydown', (evt) => {
		if (evt.key === 'Escape'){
			modal.classList.add('hide');
		}
	});

	function clearPlayingField (){
		gameBlocks.forEach(item => {
			item.classList.remove('X', 'circle');
		});
		index = 0;
	}
	function modalClose(){
		modal.classList.add('hide');
	}
	function check (arrCheck, data){
		for(let i = 0; i < arrCheck.length; i++) {
			if (data[arrCheck[i][0]].classList.contains('X') && data[arrCheck[i][1]].classList.contains('X')
			&& data[arrCheck[i][2]].classList.contains('X')) {
				scorePlayer1++;
				endGame ('Победил игрок 1');
			} else if (data[arrCheck[i][0]].classList.contains('circle') && data[arrCheck[i][1]].classList.contains('circle')
			&& data[arrCheck[i][2]].classList.contains('circle')){
				scorePlayer2++;
				endGame ('Победил игрок 2');
				index--;
			}
		}
	}
	function endGame (text) {
		saveLocalStorage();
		takeLocalStorage();

		modalText.textContent = text;


		modal.classList.remove('hide');
		clearPlayingField();
		setTimeout(modalClose, 2000);
	}
	function resteScore (){
		scorePlayer1 = 0;
		scorePlayer2 = 0;
		saveLocalStorage();
		takeLocalStorage ();
	}
	function saveLocalStorage (){
		localStorage.setItem('scorePlayer1', scorePlayer1);
		localStorage.setItem('scorePlayer2', scorePlayer2);
	}
	function takeLocalStorage (){		
		scorePlayerOne.textContent = localStorage.getItem('scorePlayer1');
		scorePlayerTwo.textContent = localStorage.getItem('scorePlayer2');

		if (!scorePlayerOne.textContent || !scorePlayerTwo.textContent){
			scorePlayerOne.textContent = 0;
			scorePlayerTwo.textContent = 0;
		}
		
	}
});







