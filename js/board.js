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

  // Задержка на появление числа
  generateNewElement() {
    setTimeout(() => {
      this.generateNewCell()
    }, 150);
  }

  movingRow(direction) {
    for (let i = 0; i < this.widthBoard * this.widthBoard; i++) {
      if (i % 4 === 0) {
        this.fillRow(i, direction === 'ArrowLeft');
      }
    }
}

  movingColumn(direction) {
    for (let i = 0; i < this.widthBoard; i++) {
      this.fillColumn(i, direction === 'ArrowUp');
    }
  }

  // объединение значений в строках
  fillRow(rowIndex, isLeft) {
    const row = [];

    for (let i = 0; i < this.widthBoard; i++) {
      row.push(this.cells[rowIndex + i].getValue());
    }

    let filteredRow = row.filter(num => num);
    let emptyCellInRowSize = this.widthBoard - filteredRow.length;

    let newRow = this.makeNewSequence(filteredRow, emptyCellInRowSize, isLeft);

    newRow.forEach((value, i) => {
      this.cells[rowIndex + i].setValue(value);
    });
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

  combineRow(direction) {
    for (let i = 15; i > 0; i--) {
      if ((this.cells[i].getValue() === this.cells[i - 1].getValue()) && this.cells[i].getValue() !== '' && i % 4 !== 0) {
        let combinedTotal = parseInt(this.cells[i].getValue()) + parseInt(this.cells[i - 1].getValue())
        
        this.cells[i].setValue(combinedTotal);
        this.cells[i - 1].setValue('');
      }
    }
    
    this.movingRow(direction)
    // проверить на выигрыш
}

  combineColumn(direction) {
    for (let i = 15; i >= 4; i--) {
      if ((this.cells[i].getValue() === this.cells[i - this.widthBoard].getValue()) && this.cells[i].getValue() !== '') {
        let combinedTotal = parseInt(this.cells[i].getValue()) + parseInt(this.cells[i - this.widthBoard].getValue());
        
        this.cells[i].setValue(combinedTotal);
        this.cells[i - this.widthBoard].setValue('');
      }
    }

    this.movingColumn(direction);
    // проверить на выигрыш
  }


}