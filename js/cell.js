/* 
  Класс отвечает за отдельную ячейку, её значение, цвет и ссылку на DOM элемент. 
*/

export default class Cell {
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
    square.innerHTML = '';
    square.classList.add('grid-cell');
    this.dom = square;

    return square;
  }
}