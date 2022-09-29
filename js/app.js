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
  if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
    return;
  }

  console.log(e.key);
}

/* 
  отвечает за игровую логику, начать игру, проследить не окончена ли игра, есть ли победитель и подобная логика
*/
class GameManager {
  constructor() {
    this.isGameOver = false;
    this.score = 0;
    this.board = null;
  }

  init() {
    this.board = new Board();
    this.board.init()
    document.addEventListener('keyup', ArrowBtnHandler);
  }

  checkIsGameOver() {
    console.log('checkIsGameOver');
  }
}

/* твечает за игровое поле, создание новых ячеек на поле, логику объединения ячеек при клике на клавиши */
class Board {
  constructor() {
    this.widthBoard = 4;
    this.cells = [];
    this.wrapper = document.querySelector('.grid-container');
  }

  // Создание поля с 16 ячеек

  init() {
    const fragment = document.createDocumentFragment(); 

    for (let i = 0; i < this.widthBoard * this.widthBoard; i++) {
      const cell = new Cell();
      

      fragment.append(cell.getNewElement());
      this.cells.push(cell.dom);
    }

    this.wrapper.append(fragment);
    this.generateNewCell();
  }

  // Заполнение пустой ячейки новым значением

  generateNewCell() {
    const randomNumber = Math.floor(Math.random() * this.cells.length);

    if (this.cells[randomNumber].innerHTML === '') {
      this.cells[randomNumber].innerHTML = 2;
      this.addColours();
      // проверить на GameOver
    } else {
      this.generateNewCell();
    }
  }

  // Добавление цвета ячейкам с цифрами

  addColours() {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].style.backgroundColor = colorCell[Math.trunc(Math.sqrt(this.cells[i].innerHTML))];
    }
  }
}

/* Класс отвечает за отдельную ячейку, её значение, цвет и ссылку на DOM элемент. */
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
    const square = document.createElement('div');
    square.classList.add('grid-cell');
    this.dom = square;

    return square;
  }
}

const start = new GameManager();

start.init();
