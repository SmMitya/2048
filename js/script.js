'use strict';

import '../css/style.css';

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
      this.board.generateNewElement();
    } else if (direction === 'ArrowDown') {
      this.board.movingColumn(direction);
      this.board.combineColumn(direction);
      this.board.generateNewElement();
    } else if (direction === 'ArrowLeft') {
      this.board.movingRow(direction);
      this.board.combineRow(direction);
      this.board.generateNewElement();
    } else if (direction === 'ArrowRight') {
      this.board.movingRow(direction);
      this.board.combineRow(direction);
      this.board.generateNewElement();
    }
  }
}

const start = new GameManager();

// Запуск игры
start.init();
