const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{ x: 200, y: 200 }];
let direction = { x: gridSize, y: 0 };
let food = { x: getRandomPosition(), y: getRandomPosition() };
let score = 0;

function getRandomPosition() {
    return Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

function drawRect(color, x, y) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, gridSize, gridSize);
}

function updateGame() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (newHead.x < 0 || newHead.x >= canvasSize || newHead.y < 0 || newHead.y >= canvasSize || 
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        alert("Game Over! Your score: " + score);
        resetGame();
        return;
    }

    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        food = { x: getRandomPosition(), y: getRandomPosition() };
        score++;
    } else {
        snake.pop();
    }

    drawGame();
}
function updateGame() {
    document.getElementById("score").innerText = "Score: " + score;
}
function drawGame() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    drawRect("red", food.x, food.y);

    snake.forEach((segment, index) => {
        drawRect(index === 0 ? "lime" : "green", segment.x, segment.y);
    });
}


document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp": if (direction.y === 0) direction = { x: 0, y: -gridSize }; break;
        case "ArrowDown": if (direction.y === 0) direction = { x: 0, y: gridSize }; break;
        case "ArrowLeft": if (direction.x === 0) direction = { x: -gridSize, y: 0 }; break;
        case "ArrowRight": if (direction.x === 0) direction = { x: gridSize, y: 0 }; break;
    }
});

setInterval(updateGame, 100);
