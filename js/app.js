'use strict';

/* 
  1) Запускаем игру и создаем ранlомно цифры 2 в клетках
  2) Находим значения клеток
  3) подписываемся на события пол клику стрелок
  4) при нажатие на стрелку, сравниваем ячейки в направлении стрелки.
  Если равны складываем , если иначе то нет
*/

const colorCell = [
  '#afa192', 
  '#eee4da', 
  '#ede0c8', 
  '#f2b179', 
  '#ffcea4', 
  '#e8c064', 
  '#ffab6e', 
  '#fd9982', 
  '#ead79c', 
  '#76daff', 
  '#beeaa5', 
  '#d7d4f0',
];

function ArrowBtnHandler(e) {
  console.log(e.key);
}

class GameManager {
  constructor() {
    this.isGameOver = false;
    this.score = 0;
    this.board = null;
  }

  init() {
    this.board = new Board();
    document.addEventListener('keyup', ArrowBtnHandler);
  }

  checkIsGameOver() {
    console.log('checkIsGameOver');
  }
}

class Board {
  constructor() {
    this.widthBoard = 4;
    this.squares = [];
    this.wrapper = document.querySelector('.grid');
  }

  init() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < this.widthBoard * this.widthBoard; i++) {
      const square = document.createElement('div');

      square.classList.add('cell');

      fragment.append(square);
      this.squares.push(square);
    }

    this.wrapper.append(fragment);
  }

  generateNewCell() {
    console.log('generateNewCell');
  }

  addColours() {
    console.log('addColours');
  }
}

class Cell {
  constructor() {
    this.value = '';
    this.dom = null;
  }

  getValue() {
    return this.value;
  }

  setValue() {
    console.log('setValue');
  }

  getNewElement() {
    console.log('getNewElement');
  }
}

const start = new GameManager();

start.init();

