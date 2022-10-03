import Cell from './cell.js';

/* 
  игровое поле, создание новых ячеек на поле, логику объединения ячеек при клике на клавиши 
*/

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
      this.cells.push(cell);
    }

    this.wrapper.append(fragment);
  }

  // Заполнение пустой ячейки новым значением

  generateNewCell() {
    const randomNumber = Math.floor(Math.random() * this.cells.length);

    if (this.cells[randomNumber].getValue() === '') {
      this.cells[randomNumber].setValue(2);
      // проверить на GameOver
    } else {
      this.generateNewCell();
    }
  }

  movingColumn(direction) {
    for (let i = 0; i < this.widthBoard; i++) {
      this.fillColumn(i, direction === 'up');
    }
  }

  // объединение значений в столбцах
  fillColumn(indexColumn, isUp) {
    const column = [];

    for (let i = 0; i < this.widthBoard; i++) {
      column.push(this.cells[indexColumn + this.widthBoard * i ].getValue());
    }

    let filteredColumn = column.filter(num => num);
    let emptyCellInColumnSize = this.widthBoard - filteredColumn.length;

    let newColumn = this.makeNewSequence(filteredColumn, emptyCellInColumnSize, isUp);

    newColumn.forEach((value, i) => {
      this.cells[indexColumn + (this.widthBoard * i)].setValue(value);
    });
  }

  // После сложения, добавляем пустые значения, чтобы получить 4 элемента в строке или столбце (после сложения их становится меньше)
  makeNewSequence(numbers, emptySequensSize, isReverse) {
    let emptySequence = Array(emptySequensSize).fill('');

    return isReverse ? numbers.concat(emptySequence) : emptySequence.concat(numbers);
  }

  combineColumn() {
    for (let i = 15; i >= 4; i--) {
      if ((this.cells[i].getValue() === this.cells[i - this.widthBoard].getValue()) && this.cells[i].getValue() !== '') {
        let combinedTotal = parseInt(this.cells[i].getValue()) + parseInt(this.cells[i - this.widthBoard].getValue());
        
        this.cells[i].setValue(combinedTotal);
        this.cells[i - this.widthBoard].setValue('');
      }
    }

    this.movingColumn();
    // проверить на выигрыш
}
}