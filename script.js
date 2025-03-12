const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");

canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = getRandomFoodPosition();
let specialFood = null;
let dx = gridSize, dy = 0;
let score = 0;
let gameInterval;
let gameRunning = false;

// โหลดเสียง
const eatSound = new Audio("assets/eat.mp3");
const bgMusic = new Audio("assets/bg-music.mp3");
bgMusic.loop = true;

function getRandomFoodPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
    };
}

function drawSnake() {
    ctx.fillStyle = "lime";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function drawSpecialFood() {
    if (specialFood) {
        ctx.fillStyle = "gold";
        ctx.fillRect(specialFood.x, specialFood.y, gridSize, gridSize);
    }
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // ชนขอบ
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        endGame();
        return;
    }

    // ชนตัวเอง
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
    }

    snake.unshift(head);

    // กินอาหารปกติ
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = getRandomFoodPosition();
        eatSound.play();

        // 20% โอกาสเกิดอาหารพิเศษ
        if (Math.random() < 0.2) {
            specialFood = getRandomFoodPosition();
        }
    } else if (specialFood && head.x === specialFood.x && head.y === specialFood.y) {
        score += 50; // อาหารพิเศษให้คะแนนเพิ่มขึ้น
        specialFood = null;
        eatSound.play();
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSpecialFood();
    drawSnake();
}

function gameLoop() {
    moveSnake();
    draw();
}

function endGame() {
    clearInterval(gameInterval);
    gameRunning = false;
    alert("Game Over! Score: " + score);
}

document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp": if (dy === 0) { dx = 0; dy = -gridSize; } break;
        case "ArrowDown": if (dy === 0) { dx = 0; dy = gridSize; } break;
        case "ArrowLeft": if (dx === 0) { dx = -gridSize; dy = 0; } break;
        case "ArrowRight": if (dx === 0) { dx = gridSize; dy = 0; } break;
    }
});

startBtn.addEventListener("click", () => {
    if (!gameRunning) {
        snake = [{ x: 200, y: 200 }];
        dx = gridSize;
        dy = 0;
        score = 0;
        food = getRandomFoodPosition();
        specialFood = null;
        bgMusic.play();
        gameInterval = setInterval(gameLoop, 100);
        gameRunning = true;
    }
});
