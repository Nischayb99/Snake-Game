# 🐍 Snake Game

A modern, responsive Snake game built with HTML5, CSS3, and JavaScript. Features a sleek design, smooth gameplay, and mobile-friendly controls.

## ✨ Features

- **Classic Snake Gameplay** - Control the snake and grow by eating food
- **Responsive Design** - Works perfectly on desktop and mobile devices
- **Enhanced Mobile Controls** - Large, touch-friendly directional buttons
- **High Score Tracking** - Keeps track of your best score using local storage
- **Progressive Difficulty** - Game speed increases every 50 points
- **Modern UI** - Clean, gradient-based design with smooth animations
- **Multiple Control Options** - Arrow keys, WASD, and touch controls
- **Pause Functionality** - Press spacebar or pause button to pause/unpause
- **About Page** - Developer information and tech stack details

## 🎮 Controls

### Desktop Controls

- **Arrow Keys** (↑↓←→) - Move the snake
- **WASD Keys** - Alternative movement (W=Up, A=Left, S=Down, D=Right)
- **Spacebar** - Pause/Resume game

### Mobile Controls

- **Touch Buttons** - Large directional buttons below the game area
- **Pause Button** - Tap to pause/resume game

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
├── index.html      # Complete game with HTML, CSS, and JavaScript
└── README.md       # Project documentation
```

## 🛠️ Technologies Used

- **HTML5 Canvas** - Game rendering and graphics
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript ES6** - Game logic, controls, and local storage
- **Remix Icons** - Modern icon set for UI elements
- **Google Fonts** - Poppins font family for clean typography

## 📱 Mobile Optimization

The game is fully responsive and includes:

- **Touch-friendly Controls** - Large, responsive directional buttons
- **Adaptive Canvas Sizing** - Scales perfectly on different screen sizes
- **Mobile-optimized UI** - All elements adapted for touch interaction
- **Gesture Prevention** - Prevents accidental zoom and context menus
- **Smooth Touch Response** - Immediate visual feedback on button press

## 🎯 Game Mechanics

- **Initial Speed**: 150ms per move
- **Speed Increase**: Every 50 points, speed increases (minimum 80ms)
- **Scoring**: 10 points per food eaten
- **Collision Detection**: Wall and self-collision ends the game
- **Food Generation**: Random placement avoiding snake body
- **High Score**: Automatically saved to browser local storage

## 🎨 Customization

You can easily customize the game by modifying:

- **Colors** - Change the `COLORS` object in the JavaScript section
- **Game Speed** - Adjust `gameState.speed` and progression logic
- **Canvas Size** - Modify `CANVAS_WIDTH` and `CANVAS_HEIGHT`
- **Scoring System** - Update point values and speed thresholds
- **Visual Effects** - Customize animations and styling in CSS

## 🏆 Gameplay Tips

1. **Plan Ahead** - Think about your path before making turns
2. **Use Walls** - Use the edges strategically to control movement
3. **Stay Calm** - Don't panic when the snake gets longer
4. **Practice Controls** - Get comfortable with both keyboard and touch controls
5. **Beat Your Score** - Challenge yourself to beat your high score

## 👨‍💻 Developer

**Nischay Bandodiya**

- Portfolio: [nischay-bandodiya-portfolio.vercel.app](https://nischay-bandodiya-portfolio.vercel.app)
- GitHub: [github.com/Nischayb99](https://github.com/Nischayb99)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📱 Browser Compatibility

- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Edge (Desktop & Mobile)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- Thanks to the open-source community for inspiration
- Remix Icons for the beautiful, modern icon set
- Google Fonts for the clean typography
- HTML5 Canvas API for smooth game rendering

---

**Enjoy playing! 🎮**

_Built with ❤️ by Nischay Bandodiya_
