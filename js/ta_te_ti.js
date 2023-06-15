document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = board.getElementsByTagName('td');
    const result = document.getElementById('result');
    const resetButton = document.getElementById('resetButton');
  
    let currentPlayer = 'X';
    let moves = 0;
    let gameEnded = false;
  
    // Agregar eventos de clic a las celdas
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', () => {
        if (!gameEnded && cells[i].innerHTML === '') {
          cells[i].innerHTML = currentPlayer;
          moves++;
  
          if (checkWinner(currentPlayer)) {
            result.innerHTML = `¡${currentPlayer} ha ganado!`;
            gameEnded = true;
          } else if (moves === 9) {
            result.innerHTML = '¡Empate!';
            gameEnded = true;
          } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          }
        }
      });
    }
  
    // Verificar si hay un ganador después de cada movimiento
    function checkWinner(player) {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
  
        if (
          cells[a].innerHTML === player &&
          cells[b].innerHTML === player &&
          cells[c].innerHTML === player
        ) {
          return true;
        }
      }
  
      return false;
    }
  
    // Reiniciar el juego al hacer clic en el botón de reinicio
    resetButton.addEventListener('click', () => {
      for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
      }
  
      currentPlayer = 'X';
      moves = 0;
      gameEnded = false;
      result.innerHTML = '';
    });
  });