const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 800;
canvas.height = 550;

// Create the unit size
const box = 20;

// Load images (optional, can be replaced by solid colors)
const ground = " #5a189a";
const foodColor = "#00bbf9";

// Create the snake
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

// Create the food
let food = {
    x: Math.floor(Math.random() * 29 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

// Create the score
let score = 0;

// Control the snake
let d;
document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

// Check collision function
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Draw everything to the canvas
function draw() {
    ctx.fillStyle = ground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "#073b4c" : "#ef476f";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "#06d6a0";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x, food.y, box, box);

    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Which direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // Wrap around the screen
    if (snakeX < 0) snakeX = canvas.width - box;
    if (snakeX >= canvas.width) snakeX = 0;
    if (snakeY < 0) snakeY = canvas.height - box;
    if (snakeY >= canvas.height) snakeY = 0;

    // If the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 29 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        // Remove the tail
        snake.pop();
    }

    // Add new head
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Check for collision with itself
    if (collision(newHead, snake)) {
        gameOver();
    }

    snake.unshift(newHead);

    // Display the score
    document.getElementById("score").innerText = "Score: " + score;
}

function gameOver() {
    document.getElementById("gameOverScreen").classList.remove("hidden");
    clearInterval(game);
}

function restartGame() {
    document.getElementById("gameOverScreen").classList.add("hidden");

    // Reset game variables
    snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };
    food = {
        x: Math.floor(Math.random() * 29 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    score = 0;
    d = undefined;

    // Restart the game loop
    game = setInterval(draw, 100);
}

// Set up restart button
document.getElementById("restartButton").addEventListener("click", restartGame);

// Call draw function every 100 ms
let game = setInterval(draw, 100);
