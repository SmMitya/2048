'use strict';

/* 
  - Двигать все цифры разом вверх / вниз / влево или право соединяя одинаковые цифры.
  - Для того, чтобы передвигать цифры, нужно нажимать по клавишам ← ↑ ↓ →
  - В каждом раунде появляется новая плитка номинала «2»
  - Нажатием стрелки игрок может скинуть все плитки игрового поля в одну из 4 сторон.
  - Если при движении в сторону, две плитки одного номинала «налетают» одна на другую, то они превращаются в одну, суммируя свои значения.
  - Если при нажатии кнопки местоположение плиток или их номинал не изменится, то ход не совершается.
  - Игра заканчивается поражением, если после очередного хода невозможно совершить действие.
*/

import Board from './board.js';

/* 
  игровая логика, начать игру, проследить не окончена ли игра, есть ли победитель и подобная логика
*/

class GameManager {
  constructor() {
    this.isGameOver = false;
    this.score = 0;
    this.board = null;
  }

  init() {
    this.board = new Board();
    this.board.init();
    this.board.generateNewCell();
    this.board.generateNewCell();
    document.addEventListener('keyup', this.arrowBtnHandler.bind(this));
  }

  checkIsGameOver() {
    console.log('checkIsGameOver');
  }

  arrowBtnHandler(e) {
    const direction = e.key;

    if (direction === 'ArrowUp') {
      this.board.movingColumn(direction);
      this.board.combineColumn(direction);
      this.board.generateNewCell();
    } else if (direction === 'ArrowDown') {
      this.board.movingColumn(direction);
      this.board.combineColumn(direction);
      this.board.generateNewCell();
    } else if (direction === 'ArrowLeft') {
      this.board.movingRow(direction);
      this.board.combineRow(direction);
      this.board.generateNewCell();
    } else if (direction === 'ArrowRight') {
      this.board.movingRow(direction);
      this.board.combineRow(direction);
      this.board.generateNewCell();
    }
  }
}

const start = new GameManager();

// Запуск игры
start.init();
