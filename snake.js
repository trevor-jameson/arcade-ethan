/*
1. Create a Snake with:
   - Starting position in the middle
   - Moving to the right
   - No tail segments

2. Draw the snake on the screen:
   - Color the snake
   - Draw tail segments
   - Draw snake's head

3. Update the snake's position:
   - Move tail segments
   - Add new tail segment if snake ate a fruit
   - Move snake's head

4. Check if the snake ate a fruit:
   - If head is at the same position as the fruit, make the snake longer and return true
   - Else, return false

5. Check if the snake hit a wall:
   - If head goes outside the screen, reset snake's position, length, and tail

6. Change snake's direction based on input:
   - Set new speed for snake, but don't allow snake to go in opposite direction
*/

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
  { x: 200, y: 100 },
  { x: 200, y: 120 },
  { x: 200, y: 140 },
];

let dx = 20;
let dy = 0;

let apple = {
  x: Math.floor(Math.random() * tileCount) * gridSize,
  y: Math.floor(Math.random() * tileCount) * gridSize,
};

function drawSnakePart(snakePart) {
  context.fillStyle = 'white';
  context.fillRect(snakePart.x, snakePart.y, gridSize, gridSize);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function drawApple() {
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, gridSize, gridSize);
}

function clearCanvas() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function main() {
  setTimeout(function onTick() {
    clearCanvas();
    drawApple();
    moveSnake();
    drawSnake();
    main();
  }, 100);
}

function moveSnake() {
    const head = { x: (snake[0].x + dx + canvas.width) % canvas.width, y: (snake[0].y + dy + canvas.height) % canvas.height };
    snake.unshift(head);
  
    if (head.x === apple.x && head.y === apple.y) {
      apple.x = Math.floor(Math.random() * tileCount) * gridSize;
      apple.y = Math.floor(Math.random() * tileCount) * gridSize;
    } else {
      snake.pop();
    }
  }
  

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
  const LEFT_KEY = 'ArrowLeft';
  const RIGHT_KEY = 'ArrowRight';
  const UP_KEY = 'ArrowUp';
  const DOWN_KEY = 'ArrowDown';

  if (event.key === LEFT_KEY && dx !== 20) {
    dx = -20;
    dy = 0;
  }
  if (event.key === RIGHT_KEY && dx !== -20) {
    dx = 20;
    dy = 0;
  }
  if (event.key === UP_KEY && dy !== 20) {
    dx = 0;
    dy = -20;
  }
  if (event.key === DOWN_KEY && dy !== -20) {
    dx = 0;
    dy = 20;
  }
}

main();

