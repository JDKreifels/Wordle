let word = getRandWord();
let tries = [];
let count = 0;
let letters = [];
let lockedCells = [];

function getRandWord() {
  let word = words[Math.floor(Math.random() * words.length)];
  console.log(word);
  return word;
}

function setKeyboard() {
  const table = document.getElementById('keyboard');
  const rows = table.getElementsByClassName('keyRows');
  let keys;
  for (let r = 0; r < rows.length; r++) {
    keys = rows[r].getElementsByClassName('keys');
    for (let c = 0; c < keys.length; c++) {
      if (keyboard[r][c] == 'BackSpace') {
        keys[c].addEventListener('click', (event) => {
          removeLetter();
        });
      } else if (keyboard[r][c] == 'Enter') {
        keys[c].addEventListener('click', (event) => {
          testTry();
        });
      } else {
        keys[c].addEventListener('click', (event) => {
          setBoard(keyboard[r][c]);
        });
      }
    }
  }
}

function keyboardEntries(key, color) {
  key.toUpperCase();
  const table = document.getElementById('keyboard');
  const rows = table.getElementsByClassName('keyRows');
  let keys;
  for (let r = 0; r < rows.length; r++) {
    keys = rows[r].getElementsByClassName('keys');
    for (let c = 0; c < keys.length; c++) {
      if (key == keys[c].innerHTML) {
        if (color === 'green') {
          keys[c].setAttribute('id', 'green');
        } else if (color === 'yellow' && !letters.includes(key)) {
          keys[c].setAttribute('id', 'yellow');
        } else if (!letters.includes(key)) {
          keys[c].setAttribute('id', 'grey');
        }
        letters.push(keys[c].innerHTML);
      }
    }
  }
}

function setBoard(key) {
  if (count > 5) {
    count = 0;
  }
  key = key.toUpperCase();
  const table = document.getElementById('tryTable');
  const rows = table.getElementsByClassName('row');
  cells = rows[count].getElementsByClassName('cell');
  for (let c = 0; c < cells.length; c++) {
    if (!lockedCells.includes(cells[c])) {
      if (cells[c].innerHTML == ' ') {
        cells[c].innerHTML = key;
        cells[c].setAttribute('id', 'input');
        break;
      }
    }
  }
}

function resetBoard() {
  removeRowListner();
  count = 0;
  tries = [];
  letters = [];
  addRowListner();
  const table = document.getElementById('tryTable');
  const rows = table.getElementsByClassName('row');
  let cells;

  for (let r = 0; r < rows.length; r++) {
    cells = rows[r].getElementsByClassName('cell');
    for (let c = 0; c < cells.length; c++) {
      cells[c].innerHTML = '';
      cells[c].removeAttribute('id');
    }
  }
  setTries();
}

function resetKeys() {
  const table = document.getElementById('keyboard');
  const rows = table.getElementsByClassName('keyRows');
  let keys;
  for (let r = 0; r < rows.length; r++) {
    keys = rows[r].getElementsByClassName('keys');
    for (let c = 0; c < keys.length; c++) {
      keys[c].removeAttribute('id');
    }
  }
}

function removeLetter() {
  const table = document.getElementById('tryTable');
  const rows = table.getElementsByClassName('row');
  cells = rows[count].getElementsByClassName('cell');
  for (let c = cells.length - 1; c >= 0; c--) {
    if (lockedCells.includes(cells[c])) {
      continue;
    } else if (cells[c].innerHTML != ' ') {
      cells[c].removeAttribute('id');
      cells[c].innerHTML = ' ';
      break;
    }
  }
}

function setTries() {
  const table = document.getElementById('tryTable');
  const rows = table.getElementsByClassName('row');
  let cells;
  for (let r = 0; r < rows.length; r++) {
    cells = rows[r].getElementsByClassName('cell');
    for (let c = 0; c < cells.length; c++) {
      if (r < tries.length && c < tries[r].length) {
        cells[c].innerHTML = tries[r][c].toUpperCase();
      } else {
        cells[c].innerHTML = ' ';
      }
    }
  }
}

window.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    testTry();
  }
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    setBoard(event.key);
  }
  if (event.code === 'Backspace') {
    removeLetter();
  }
});

document.getElementById('reset').addEventListener('click', (event) => {
  let error = document.getElementsByTagName('h1');
  const table = document.getElementById('tryTable');
  const rows = table.getElementsByClassName('row');
  resetBoard();
  resetKeys();
  document.getElementsByTagName('h1')[0].innerHTML =
    'WORD WAS ' + word.toUpperCase();
  rows[count].setAttribute('id', 'error');
  error[0].setAttribute('id', 'popup');
  let ticker = setTimeout(() => {
    document.getElementsByTagName('h1')[0].innerHTML = '';
    rows[count].removeAttribute('id');
    error[0].removeAttribute('id');
  }, 2000);
  word = getRandWord();
});

document
  .getElementsByClassName('color_blind')[0]
  .addEventListener('click', (event) => {
    if (document.styleSheets[5].disabled == true) {
      document.styleSheets[5].disabled = false;
      document.styleSheets[6].disabled = false;
    } else {
      document.styleSheets[5].disabled = true;
      document.styleSheets[6].disabled = true;
    }
  });
document
  .getElementsByClassName('day_night')[0]
  .addEventListener('click', (event) => {
    if (document.styleSheets[3].disabled == true) {
      document.styleSheets[3].disabled = false;
      document.styleSheets[4].disabled = false;
    } else {
      document.styleSheets[3].disabled = true;
      document.styleSheets[4].disabled = true;
    }
  });
document
  .getElementsByClassName('lock')[0]
  .addEventListener('click', (event) => {
    const table = document.getElementById('tryTable');
    const rows = table.getElementsByClassName('row');
    cells = rows[count].getElementsByClassName('cell');
    for (let c = 0; c < cells.length; c++) {
      cells[c].removeAttribute('id');
      if (cells[c].innerHTML != ' ') {
        cells[c].setAttribute('id', 'input');
      }
    }
    lockedCells = [];
  });

function testTry() {
  guess = '';
  error = document.getElementsByTagName('h1');
  const table = document.getElementById('tryTable');
  const rows = table.getElementsByClassName('row');
  cells = rows[count].getElementsByClassName('cell');
  for (let c = 0; c < cells.length; c++) {
    if (cells[c].innerHTML != ' ') {
      guess += cells[c].innerHTML;
    }
  }
  guess = guess.toLowerCase();
  if (guess.length < 5) {
    document.getElementsByTagName('h1')[0].innerHTML = 'NOT LONG ENOUGH';
    error[0].setAttribute('id', 'popup');
    rows[count].setAttribute('id', 'error');
    let ticker = setTimeout(() => {
      document.getElementsByTagName('h1')[0].innerHTML = '';
      rows[count].removeAttribute('id');
      error[0].removeAttribute('id');
    }, 2000);
  } else if (!words.includes(guess)) {
    document.getElementsByTagName('h1')[0].innerHTML = 'NOT IN DICTIONARY';
    rows[count].setAttribute('id', 'error');
    error[0].setAttribute('id', 'popup');
    let ticker = setTimeout(() => {
      document.getElementsByTagName('h1')[0].innerHTML = '';
      rows[count].removeAttribute('id');
      error[0].removeAttribute('id');
    }, 2000);
  } else {
    tries.push(guess);
    letterSearch(guess);
    count++;
    if (count < 6) {
      addRowListner();
    }
  }
}

function letterSearch(guess) {
  let counter = 0;
  const table = document.getElementById('tryTable');
  const rows = table.getElementsByClassName('row');
  const cells = rows[count].getElementsByClassName('cell');
  let lockin = word;
  for (let i = 0; i < guess.length; i++) {
    if (guess.charAt(i) === word.charAt(i)) {
      lockin = setCharAt(lockin, i, '1');
      counter++;
    }
  }
  let timePlus = 0;
  for (let i = 0; i < guess.length; i++) {
    let ticker = setTimeout(() => {
      if (guess.charAt(i) === word.charAt(i)) {
        keyboardEntries(cells[i].innerHTML, 'green');
        cells[i].setAttribute('id', 'green');
      } else if (lockin.includes(guess.charAt(i))) {
        keyboardEntries(cells[i].innerHTML, 'yellow');
        cells[i].setAttribute('id', 'yellow');
        lockin = setCharAt(lockin, lockin.indexOf(guess.charAt(i)), '1');
      } else if (
        lockin.indexOf(guess.charAt(i)) == -1 &&
        guess.charAt(i) != word.charAt(i)
      ) {
        keyboardEntries(cells[i].innerHTML, 'grey');
        cells[i].setAttribute('id', 'grey');
      }
    }, timePlus);
    timePlus += 300;
  }
  removeRowListner();
  if (counter == 5) {
    count = 5;
  }
  setTries();
}

function addRowListner() {
  const table = document.getElementById('tryTable');
  const rows = table.getElementsByClassName('row');
  cells = rows[count].getElementsByClassName('cell');
  for (let c = 0; c < cells.length; c++) {
    workingCell = cells[c];
    cells[c].addEventListener('click', eventHandled, true);
  }
}

function removeRowListner() {
  const table = document.getElementById('tryTable');
  const rows = table.getElementsByClassName('row');
  for (let r = 0; r < rows.length; r++) {
    cells = rows[r].getElementsByClassName('cell');
    for (let c = 0; c < cells.length; c++) {
      cells[c].removeEventListener('click', eventHandled, true);
    }
  }
  lockedCells = [];
}

function eventHandled() {
  const table = document.getElementById('tryTable');
  const rows = table.getElementsByClassName('row');
  cells = rows[count].getElementsByClassName('cell');
  if (this.id == 'selected') {
    this.removeAttribute('id');
    if (this.innerHTML != ' ') {
      this.setAttribute('id', 'input');
    }
    lockedCells.splice(lockedCells.indexOf(this), 1);
  } else {
    lockedCells.push(this);
    this.setAttribute('id', 'selected');
  }
}

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

window.onload = function () {
  setTries();
  setKeyboard();
  addRowListner();
  document.styleSheets[5].disabled = true;
  document.styleSheets[6].disabled = true;
  document.styleSheets[3].disabled = true;
  document.styleSheets[4].disabled = true;
};
