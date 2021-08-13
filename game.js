import Settings from "./settings.js";
import Snake from "./snake.js";
import Score from "./score.js";
import Controls from "./controls.js";
import Food from "./food.js";

class Game {
    constructor(gamefield, moveUp, moveRight, moveDown, moveLeft) {
        this.canvas = document.querySelector(gamefield);
        this.context = this.canvas.getContext('2d');
        this.gamefield = gamefield;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.settings = new Settings(this.width, this.height);
        this.score = new Score(this.context,this.settings);
        this.food = new Food(this.settings);
        this.snake = new Snake(this.width, this.height, this.settings);
        this.controls = new Controls(moveUp, moveRight, moveDown, moveLeft);

    }

    gameLoop() {
        requestAnimationFrame(this.gameLoop.bind(this));
        if (++this.settings.frames < this.settings.speed) {
            return;
        }
        this.settings.frames = 0;

        this.context.clearRect(0, 0, this.width, this.height);
        
        this.controls.control(this.snake, this.settings);
        this.score.drawScore();
        this.drawWalls();
        this.food.spawnFood(this.context);
        this.snake.drawSnake(this.width, this.height, this.context, this.score, this.settings, this.food);
    } 

    drawWalls() {
        this.context.fillStyle = '#00ff1a';
        this.context.fillRect(0, this.settings.blockSize * 4, this.width, this.settings.blockSize);
        this.context.fillRect(0, this.height - this.settings.blockSize, this.width, this.settings.blockSize)
        this.context.fillRect(0, this.settings.blockSize * 4, this.settings.blockSize, this.height);
        this.context.fillRect(this.width - this.settings.blockSize, this.settings.blockSize * 4, this.settings.blockSize, this.height);
    }
}

let game = new Game('.gamefield', '38', '39', '40', '37');
game.gameLoop();

let anotherGame = new Game('.anotherGamefield', '87', '68', '83', '65');
anotherGame.gameLoop();