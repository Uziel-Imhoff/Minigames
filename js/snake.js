document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  const gridSize = 20;
  const gridWidth = Math.floor(canvas.width / gridSize);
  const gridHeight = Math.floor(canvas.height / gridSize);

  let snake = [{ x: 0, y: 0 }];
  let direction = 'right';
  let food = { x: 0, y: 0 };
  let gameRunning = false;

  let previousFrameTime = 0;
  let frameDelay = 100; // Milisegundos de retraso entre cada fotograma
  let accumulatedTime = 0;

  function getRandomPosition() {
    return Math.floor(Math.random() * gridWidth);
  }

  function drawSnake() {
    ctx.fillStyle = '#333';
    for (let i = 0; i < snake.length; i++) {
      const { x, y } = snake[i];
      ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }

  function drawFood() {
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  }

  function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    if (direction === 'up') head.y--;
    if (direction === 'down') head.y++;
    if (direction === 'left') head.x--;
    if (direction === 'right') head.x++;

    if (head.x < 0) head.x = gridWidth - 1;
    if (head.x >= gridWidth) head.x = 0;
    if (head.y < 0) head.y = gridHeight - 1;
    if (head.y >= gridHeight) head.y = 0;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      generateFood();
    } else {
      snake.pop();
    }

    checkCollision();
  }

  function generateFood() {
    food.x = getRandomPosition();
    food.y = getRandomPosition();

    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === food.x && snake[i].y === food.y) {
        generateFood();
        break;
      }
    }
  }

  function checkCollision() {
    const head = snake[0];

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        endGame();
        break;
      }
    }
  }

  function endGame() {
    gameRunning = false;
    startButton.innerText = 'Reiniciar Juego';
    startButton.disabled = false;
  }

  function resetGame() {
    snake = [{ x: 0, y: 0 }];
    direction = 'right';
    generateFood();
  }

  function handleKeyPress(e) {
    if (!gameRunning) {
      return;
    }

    if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
  }

  function gameLoop(currentTime) {
    const elapsedTime = currentTime - previousFrameTime;
    previousFrameTime = currentTime;
    accumulatedTime += elapsedTime;

    if (accumulatedTime > frameDelay) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSnake();
      drawFood();
      moveSnake();
      accumulatedTime = 0;
    }

    if (gameRunning) {
      requestAnimationFrame(gameLoop);
    }
  }

  function startGame() {
    if (gameRunning) {
      return;
    }

    resetGame();

    gameRunning = true;
    startButton.disabled = true;
    previousFrameTime = performance.now();
    requestAnimationFrame(gameLoop);
  }

  const startButton = document.getElementById('startButton');
  startButton.addEventListener('click', () => {
    if (gameRunning) {
      endGame();
      resetGame();
    }
    startGame();
  });
  document.addEventListener('keydown', handleKeyPress);
});