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
let specialFood = { x: getRandomPosition(), y: getRandomPosition() };
let specialFoodActive = false;
let specialFoodTimer = 0;
let normalFoodCount = 0; // นับจำนวนครั้งที่กินอาหารปกติ
let score = 0; // เพิ่มตัวแปรเก็บคะแนน

function updateGame() {
    // ตรวจสอบการกินอาหารปกติ
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;  // เพิ่มคะแนน
        document.getElementById("score").innerText = "Score: " + score; // อัปเดต HTML
        normalFoodCount++; // เพิ่มตัวนับการกินอาหาร
        food = { x: getRandomPosition(), y: getRandomPosition() };
    }

    // ตรวจสอบการกินอาหารพิเศษ
    if (snake[0].x === specialFood.x && snake[0].y === specialFood.y) {
        score += 5; // ได้ 5 คะแนนเมื่อกินอาหารพิเศษ
        document.getElementById("score").innerText = "Score: " + score; // อัปเดต HTML
        specialFoodActive = false;
    }
}

function updateGame() {
    // ตรวจสอบว่าถึงเวลาสร้างอาหารพิเศษหรือยัง
    if (normalFoodCount >= 3 && !specialFoodActive) {
        spawnSpecialFood();
    }

    // วาดอาหารพิเศษถ้ามีอยู่
    if (specialFoodActive) {
        drawRect("gold", specialFood.x, specialFood.y);
        handleSpecialFoodTimer();
    }

    // ตรวจสอบการกินอาหารปกติ
    if (snake[0].x === food.x && snake[0].y === food.y) {
        eatNormalFood();
    }

    // ตรวจสอบการกินอาหารพิเศษ
    if (snake[0].x === specialFood.x && snake[0].y === specialFood.y) {
        eatSpecialFood();
    }
}

// ฟังก์ชันสร้างอาหารพิเศษ
function spawnSpecialFood() {
    specialFood = { x: getRandomPosition(), y: getRandomPosition() };
    specialFoodActive = true;
    specialFoodTimer = 50; // อยู่ได้นาน 50 รอบ
    normalFoodCount = 0; // รีเซ็ตตัวนับอาหารปกติ
}

// ฟังก์ชันจัดการตัวจับเวลาอาหารพิเศษ
function handleSpecialFoodTimer() {
    specialFoodTimer--;
    if (specialFoodTimer <= 0) {
        specialFoodActive = false; // ซ่อนอาหารพิเศษเมื่อหมดเวลา
    }
}

// ฟังก์ชันกินอาหารปกติ
function eatNormalFood() {
    score++;
    normalFoodCount++; // เพิ่มจำนวนครั้งที่กินอาหารปกติ
    food

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
