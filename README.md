# 🐍 Snake Game

A modern, responsive Snake game built with HTML5, CSS3, and JavaScript. Features a sleek design, smooth gameplay, and mobile-friendly controls.

## ✨ Features

- **Classic Snake Gameplay** - Control the snake and grow by eating food
- **Responsive Design** - Works perfectly on desktop and mobile devices
- **High Score Tracking** - Keeps track of your best score using local storage
- **Progressive Difficulty** - Game speed increases as you score more points
- **Modern UI** - Clean, gradient-based design with smooth animations
- **Touch Controls** - Mobile-friendly directional buttons
- **Keyboard Support** - Arrow keys and WASD controls
- **Pause Functionality** - Press spacebar to pause/unpause the game

## 🎮 How to Play

1. **Start**: Click "Start Playing" on the home page
2. **Control**: Use arrow keys (↑↓←→) or WASD keys to move the snake
3. **Goal**: Eat the red food to grow and increase your score
4. **Avoid**: Don't hit the walls or your own body
5. **Pause**: Press spacebar to pause the game anytime

## 🚀 Getting Started

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start playing!

```bash
git clone https://github.com/yourusername/snake-game.git
cd snake-game
```

### File Structure

```
snake-game/
├── index.html      # Main HTML file
├── style.css       # Styling and responsive design
├── script.js       # Game logic and functionality
└── README.md       # Project documentation
```

## 🛠️ Technologies Used

- **HTML5** - Structure and Canvas for game rendering
- **CSS3** - Styling with gradients, animations, and responsive design
- **JavaScript** - Game logic, controls, and local storage
- **Remix Icons** - Modern icon set for UI elements
- **Google Fonts** - Poppins font family

## 📱 Mobile Support

The game is fully responsive and includes:

- Touch-friendly control buttons
- Adaptive canvas sizing
- Mobile-optimized UI elements
- Gesture-friendly interactions

## 🎯 Game Mechanics

- **Initial Speed**: 150ms per move
- **Speed Increase**: Every 50 points, speed increases by 10ms
- **Scoring**: 10 points per food eaten
- **Collision Detection**: Wall and self-collision ends the game
- **Food Generation**: Random placement avoiding snake body

## 🔧 Customization

You can easily customize the game by modifying:

- Colors in `COLORS` object in `script.js`
- Game speed and difficulty progression
- Canvas size (`CANVAS_WIDTH`, `CANVAS_HEIGHT`)
- Scoring system
- Visual effects and animations

## 🤝 Contributing

This is my first project! Contributions, issues, and feature requests are welcome.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- Thanks to the open-source community for inspiration
- Remix Icons for the beautiful icon set
- Google Fonts for the typography

---

**Enjoy playing! 🎮**
