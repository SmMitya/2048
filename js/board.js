import Cell from './cell.js';

/* 
  игровое поле, создание новых ячеек на поле, логику объединения ячеек при клике на клавиши 
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

export default class Board {
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