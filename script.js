// Game state
let gameState = {
    isRunning: false,
    isPaused: false,
    score: 0,
    highScore: localStorage.getItem('snakeHighScore') || 0,
    speed: 150,
    level: 1
};

// DOM elements
const homePage = document.getElementById('homePage');
const gamePage = document.getElementById('gamePage');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreElement = document.getElementById('finalScore');
const newRecordElement = document.getElementById('newRecord');

// Navigation
const navBtns = document.querySelectorAll('.nav-btn');
const startGameBtn = document.getElementById('startGameBtn');
const backToHomeBtn = document.getElementById('backToHome');
const restartBtn = document.getElementById('restartButton');

// Modal
const howToPlayBtn = document.getElementById('howToPlayBtn');
const howToPlayModal = document.getElementById('howToPlayModal');
const closeModalBtn = document.getElementById('closeModal');

// Game settings
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
const GRID_SIZE = 20;

// Set canvas size
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// Game objects
let snake = [];
let food = {};
let direction = '';
let gameLoop = null;

// Colors
const COLORS = {
    background: '#1a1a2e',
    snakeHead: '#f59e0b',
    snakeBody: '#10b981',
    food: '#ef4444',
    border: '#4f46e5'
};

// Initialize game
function initGame() {
    snake = [
        { x: GRID_SIZE * 10, y: GRID_SIZE * 10 },
        { x: GRID_SIZE * 9, y: GRID_SIZE * 10 },
        { x: GRID_SIZE * 8, y: GRID_SIZE * 10 }
    ];

    generateFood();
    gameState.score = 0;
    gameState.speed = 150;
    gameState.level = 1;
    direction = 'RIGHT';

    updateScore();
    updateHighScore();
}

// Generate food at random position
function generateFood() {
    const maxX = Math.floor(CANVAS_WIDTH / GRID_SIZE) - 1;
    const maxY = Math.floor(CANVAS_HEIGHT / GRID_SIZE) - 1;

    do {
        food = {
            x: Math.floor(Math.random() * maxX) * GRID_SIZE,
            y: Math.floor(Math.random() * maxY) * GRID_SIZE
        };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
}

// Draw game elements
function draw() {
    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw snake
    snake.forEach((segment, index) => {
        const isHead = index === 0;

        // Snake body/head
        ctx.fillStyle = isHead ? COLORS.snakeHead : COLORS.snakeBody;
        ctx.fillRect(segment.x, segment.y, GRID_SIZE, GRID_SIZE);

        // Border
        ctx.strokeStyle = isHead ? '#fff' : '#065f46';
        ctx.lineWidth = 2;
        ctx.strokeRect(segment.x, segment.y, GRID_SIZE, GRID_SIZE);

        // Snake head eyes
        if (isHead) {
            ctx.fillStyle = '#000';
            const eyeSize = 3;
            const eyeOffset = 5;

            if (direction === 'RIGHT') {
                ctx.fillRect(segment.x + GRID_SIZE - eyeOffset, segment.y + 4, eyeSize, eyeSize);
                ctx.fillRect(segment.x + GRID_SIZE - eyeOffset, segment.y + GRID_SIZE - 7, eyeSize, eyeSize);
            } else if (direction === 'LEFT') {
                ctx.fillRect(segment.x + 2, segment.y + 4, eyeSize, eyeSize);
                ctx.fillRect(segment.x + 2, segment.y + GRID_SIZE - 7, eyeSize, eyeSize);
            } else if (direction === 'UP') {
                ctx.fillRect(segment.x + 4, segment.y + 2, eyeSize, eyeSize);
                ctx.fillRect(segment.x + GRID_SIZE - 7, segment.y + 2, eyeSize, eyeSize);
            } else if (direction === 'DOWN') {
                ctx.fillRect(segment.x + 4, segment.y + GRID_SIZE - eyeOffset, eyeSize, eyeSize);
                ctx.fillRect(segment.x + GRID_SIZE - 7, segment.y + GRID_SIZE - eyeOffset, eyeSize, eyeSize);
            }
        }
    });

    // Draw food with glow effect
    const foodGradient = ctx.createRadialGradient(
        food.x + GRID_SIZE / 2, food.y + GRID_SIZE / 2, 0,
        food.x + GRID_SIZE / 2, food.y + GRID_SIZE / 2, GRID_SIZE
    );
    foodGradient.addColorStop(0, COLORS.food);
    foodGradient.addColorStop(1, '#dc2626');

    ctx.fillStyle = foodGradient;
    ctx.beginPath();
    ctx.arc(food.x + GRID_SIZE / 2, food.y + GRID_SIZE / 2, GRID_SIZE / 2 - 2, 0, 2 * Math.PI);
    ctx.fill();

    // Food shine effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(food.x + GRID_SIZE / 2 - 3, food.y + GRID_SIZE / 2 - 3, 3, 0, 2 * Math.PI);
    ctx.fill();
}

// Update game logic
function update() {
    if (!gameState.isRunning || gameState.isPaused) return;

    const head = { ...snake[0] };

    // Move snake head based on direction
    switch (direction) {
        case 'UP': head.y -= GRID_SIZE; break;
        case 'DOWN': head.y += GRID_SIZE; break;
        case 'LEFT': head.x -= GRID_SIZE; break;
        case 'RIGHT': head.x += GRID_SIZE; break;
        default: return;
    }

    // Wall collision detection
    if (head.x < 0 || head.x >= CANVAS_WIDTH ||
        head.y < 0 || head.y >= CANVAS_HEIGHT) {
        gameOver();
        return;
    }

    // Self collision detection
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        gameState.score += 10;
        updateScore();
        generateFood();

        // Increase speed every 5 points
        if (gameState.score % 50 === 0) {
            gameState.speed = Math.max(80, gameState.speed - 10);
            gameState.level++;
            clearInterval(gameLoop);
            gameLoop = setInterval(() => {
                update();
                draw();
            }, gameState.speed);
        }
    } else {
        snake.pop();
    }

    draw();
}

// Handle keyboard input
function handleKeyPress(event) {
    if (!gameState.isRunning) return;

    const key = event.key;
    const newDirection = {
        'ArrowUp': 'UP',
        'ArrowDown': 'DOWN',
        'ArrowLeft': 'LEFT',
        'ArrowRight': 'RIGHT',
        'w': 'UP',
        's': 'DOWN',
        'a': 'LEFT',
        'd': 'RIGHT'
    }[key];

    if (newDirection && !isOppositeDirection(newDirection, direction)) {
        direction = newDirection;
    }

    // Pause game with spacebar
    if (key === ' ') {
        event.preventDefault();
        togglePause();
    }
}

// Check if new direction is opposite to current direction
function isOppositeDirection(newDir, currentDir) {
    const opposites = {
        'UP': 'DOWN',
        'DOWN': 'UP',
        'LEFT': 'RIGHT',
        'RIGHT': 'LEFT'
    };
    return opposites[newDir] === currentDir;
}

// Toggle game pause
function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    if (gameState.isPaused) {
        clearInterval(gameLoop);
    } else {
        gameLoop = setInterval(() => {
            update();
            draw();
        }, gameState.speed);
    }
}

// Start game
function startGame() {
    gameState.isRunning = true;
    gameState.isPaused = false;
    initGame();
    draw();

    gameLoop = setInterval(() => {
        update();
        draw();
    }, gameState.speed);
}

// Game over
function gameOver() {
    gameState.isRunning = false;
    clearInterval(gameLoop);

    // Check for new high score
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        localStorage.setItem('snakeHighScore', gameState.highScore);
        newRecordElement.classList.remove('hidden');
        updateHighScore();
    } else {
        newRecordElement.classList.add('hidden');
    }

    finalScoreElement.textContent = `Your Score: ${gameState.score}`;
    gameOverScreen.classList.remove('hidden');
}

// Update score display
function updateScore() {
    scoreElement.textContent = `Score: ${gameState.score}`;
}

// Update high score display
function updateHighScore() {
    highScoreElement.textContent = `Best: ${gameState.highScore}`;
}

// Navigation functions
function showHomePage() {
    homePage.classList.remove('hidden');
    gamePage.classList.add('hidden');
    navBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-page="home"]').classList.add('active');

    // Stop game if running
    if (gameState.isRunning) {
        gameState.isRunning = false;
        clearInterval(gameLoop);
    }
}

function showGamePage() {
    homePage.classList.add('hidden');
    gamePage.classList.remove('hidden');
    navBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-page="game"]').classList.add('active');
    gameOverScreen.classList.add('hidden');

    // Initialize and start game
    startGame();
}

// Event listeners
document.addEventListener('keydown', handleKeyPress);

// Navigation event listeners
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        if (page === 'home') {
            showHomePage();
        } else if (page === 'game') {
            showGamePage();
        }
    });
});

// Game control buttons
startGameBtn.addEventListener('click', showGamePage);
backToHomeBtn.addEventListener('click', showHomePage);
restartBtn.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    startGame();
});

// Touch/click controls for mobile
document.querySelectorAll('.control-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const newDirection = btn.dataset.direction;
        if (gameState.isRunning && !isOppositeDirection(newDirection, direction)) {
            direction = newDirection;
        }
    });
});

// Modal event listeners
howToPlayBtn.addEventListener('click', () => {
    howToPlayModal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
    howToPlayModal.classList.add('hidden');
});

// Close modal when clicking outside
howToPlayModal.addEventListener('click', (e) => {
    if (e.target === howToPlayModal) {
        howToPlayModal.classList.add('hidden');
    }
});

// Initialize high score display
updateHighScore();

// Responsive canvas sizing
function resizeCanvas() {
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;
    const maxWidth = Math.min(containerWidth - 40, CANVAS_WIDTH);

    if (window.innerWidth <= 768) {
        const scale = maxWidth / CANVAS_WIDTH;
        canvas.style.width = maxWidth + 'px';
        canvas.style.height = (CANVAS_HEIGHT * scale) + 'px';
    } else {
        canvas.style.width = CANVAS_WIDTH + 'px';
        canvas.style.height = CANVAS_HEIGHT + 'px';
    }
}

// Handle window resize
window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', resizeCanvas);

// Prevent default arrow key behavior
document.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
    }
});

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    showHomePage();
    resizeCanvas();
});