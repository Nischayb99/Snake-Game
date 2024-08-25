// Snake Game Script
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
const canvasSize = 600;
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * canvasSize / box) * box,
    y: Math.floor(Math.random() * canvasSize / box) * box
};

let score = 0;
let d;
let speed = 200; // initial speed in milliseconds
let interval;

document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode == 37 && d != 'RIGHT') {
        d = 'LEFT';
    } else if (event.keyCode == 38 && d != 'DOWN') {
        d = 'UP';
    } else if (event.keyCode == 39 && d != 'LEFT') {
        d = 'RIGHT';
    } else if (event.keyCode == 40 && d != 'UP') {
        d = 'DOWN';
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'black' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw the food
    ctx.fillStyle = 'yellow';
    ctx.fillRect(food.x, food.y, box, box);

    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Direction
    if (d == 'LEFT') snakeX -= box;
    if (d == 'UP') snakeY -= box;
    if (d == 'RIGHT') snakeX += box;
    if (d == 'DOWN') snakeY += box;

    // Wrap-around effect
    if (snakeX >= canvasSize) snakeX = 0;
    if (snakeX < 0) snakeX = canvasSize - box;
    if (snakeY >= canvasSize) snakeY = 0;
    if (snakeY < 0) snakeY = canvasSize - box;

    // Check collision with food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        speed = Math.max(50, speed - 10); // Increase speed, but not below 50ms
        food = {
            x: Math.floor(Math.random() * canvasSize / box) * box,
            y: Math.floor(Math.random() * canvasSize / box) * box
        };
    } else {
        snake.pop();
    }

    // Check collision with self
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snakeX && snake[i].y === snakeY) {
            clearInterval(interval);
            document.getElementById('gameOverScreen').classList.remove('hidden');
        }
    }

    // Add new head
    const newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);

    // Display score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function startGame() {
    d = '';
    score = 0;
    snake = [];
    snake[0] = { x: 10 * box, y: 10 * box };
    food = {
        x: Math.floor(Math.random() * canvasSize / box) * box,
        y: Math.floor(Math.random() * canvasSize / box) * box
    };
    speed = 200; // Reset speed
    interval = setInterval(draw, speed);
}

document.getElementById('restartButton').addEventListener('click', function() {
    document.getElementById('gameOverScreen').classList.add('hidden');
    startGame();
});

document.getElementById("playButton").addEventListener("click", function() {
    document.querySelector('.home-container').classList.add('hidden');
    document.getElementById("gameCanvas").classList.remove('hidden');
    startGame();
});

// Music Player Script
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const trackTitle = document.getElementById('trackTitle');
const artistName = document.getElementById('artistName');
const albumArt = document.getElementById('albumArt');

let currentTrackIndex = 0;
let isPlaying = false;

// Playlist of songs
const playlist = [
    {
        title: 'Altyn',
        artist: 'BorrenFam',
        src: 'Altyn.mp3',
        albumArt: 'Altyn.jpg'
    },
    {
        title: 'SLAY!',
        artist: 'Eternxlkz',
        src: 'SLAY.mp3',
        albumArt: 'SLAY.jpg'
    },
    {
        title: 'REQUIEM',
        artist: 'ROMANTICA',
        src: 'REQUIEM.mp3',
        albumArt: 'REQUIEM.png'
    }
];

function loadTrack(index) {
    const track = playlist[index];
    audioPlayer.src = track.src;
    trackTitle.textContent = track.title;
    artistName.textContent = track.artist;
    albumArt.src = track.albumArt;
    playPauseBtn.textContent = '⏸️';  // Ensure the icon shows 'Pause' when a new track is loaded
    isPlaying = true;  // Set the playing status to true
    audioPlayer.play();  // Auto-play the next track
}

function playPauseTrack() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.textContent = '⏯️';
    } else {
        audioPlayer.play();
        playPauseBtn.textContent = '⏸️';
    }
    isPlaying = !isPlaying;
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
}

audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    progressBar.value = (currentTime / duration) * 100;

    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
});

progressBar.addEventListener('input', () => {
    const duration = audioPlayer.duration;
    const seekTime = (progressBar.value / 100) * duration;
    audioPlayer.currentTime = seekTime;
});

// Automatically play the next track when the current one ends
audioPlayer.addEventListener('ended', nextTrack);

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Load the first track
loadTrack(currentTrackIndex);

playPauseBtn.addEventListener('click', playPauseTrack);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);