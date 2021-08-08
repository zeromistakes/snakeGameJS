class Game {
    constructor() {
        this.canvas = document.querySelector('.gamefield');
        this.context = this.canvas.getContext('2d');

        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.blockSize = 20;
        this.blockWidth = this.width / this.blockSize; // 32
        this.blockHeight = this.height / this.blockSize;

        this.colors = ['#57F500','#7100D6','#E93DEB','#0BC9D6', '#00FAB6','#FA6101','#FA0065'];
        this.color = this.getRandomColor();
        this.score = 0;
        this.frames = 0;
        this.speed = 6;


        this.snake = {
            x: this.width / 2,
            y: this.height / 2,
            vx: this.blockSize,
            vy: 0,
            tail: [],
            tailLength: 3
        };

        this.secondSnake = {
            x: this.width / 4,
            y: this.height / 4,
            vx: this.blockSize,
            vy: 0,
            tail: [],
            tailLength: 3
        };

        this.food = {
            x: this.randomizer (2, this.blockWidth - 1) * this.blockSize,
            y: this.randomizer (5, this.blockHeight - 1) * this.blockSize
        };
    }


    gameLoop() {
        requestAnimationFrame(this.gameLoop.bind(this));
        if (++this.frames < this.speed) {
            return;
        }
        this.frames = 0;
        this.context.clearRect(0, 0, this.width, this.height);
        this.control();
        this.controlSecondSnake();
        this.drawScore();
        this.drawWalls();
        this.spawnFood();
        this.drawSnake(this.snake);
        this.drawSnake(this.secondSnake);
        
    } 

    control() {
        document.addEventListener('keydown', (event) => {
            if (event.which === 37 && this.snake.vx === 0) { // left
                this.snake.vx = -this.blockSize;
                this.snake.vy = 0;
            } else if (event.which === 38 && this.snake.vy === 0) { // up
                this.snake.vx = 0;
                this.snake.vy = -this.blockSize;
            } else if (event.which === 39 && this.snake.vx === 0) { // right
                this.snake.vx = this.blockSize;
                this.snake.vy = 0;
            } else if (event.which === 40 && this.snake.vy === 0) { // down
                this.snake.vx = 0;
                this.snake.vy = this.blockSize;
            }
        });
    }

    controlSecondSnake() {
        document.addEventListener('keydown', (event) => {
            if (event.which === 65 && this.secondSnake.vx === 0) { // left
                this.secondSnake.vx = -this.blockSize;
                this.secondSnake.vy = 0;
            } else if (event.which === 87 && this.secondSnake.vy === 0) { // up
                this.secondSnake.vx = 0;
                this.secondSnake.vy = -this.blockSize;
            } else if (event.which === 68 && this.secondSnake.vx === 0) { // right
                this.secondSnake.vx = this.blockSize;
                this.secondSnake.vy = 0;
            } else if (event.which === 83 && this.secondSnake.vy === 0) { // down
                this.secondSnake.vx = 0;
                this.secondSnake.vy = this.blockSize;
            }
        });
    }

    drawSnake(snake) {
        snake.x += snake.vx;
        snake.y += snake.vy;
    
        this.setWallCollision(snake);
        this.changeTailLength(snake);
        this.colorizeSnake(snake);
        this.checkFoodCollision(snake);
        this.restartCondition(snake);
    }

    changeTailLength(snake) {
        snake.tail.unshift({ x: snake.x, y: snake.y});
        
        if (snake.tail.length > snake.tailLength) {
            snake.tail.pop();
        }
    }

    restartCondition(snake) {
        snake.tail.forEach((elem,index) => {
    
            for (let i = index + 1; i < snake.tail.length; i++) {
                if (elem.x === snake.tail[i].x && elem.y === snake.tail[i].y) {
                    this.restart(snake);
                }
            }
        });
    }

    checkFoodCollision(snake) {
        snake.tail.forEach((elem) => {
    
            if (elem.x === this.food.x && elem.y === this.food.y) {
                snake.tailLength++;
                this.incrScore();
                this.setRandomFoodCoords();
            }
        });
    }

    colorizeSnake(snake) {
        snake.tail.forEach((elem,index) => {
            if (index === 0) {
                this.context.fillStyle = '#000000';
            } else if (snake === this.snake){
                this.context.fillStyle = 'red';
            } else {
                this.context.fillStyle = 'blue';
            }
            this.context.fillRect(elem.x, elem.y, this.blockSize, this.blockSize);
        });
    }


    drawWalls() {
        this.context.fillStyle = '#00ff1a';
        this.context.fillRect(0, this.blockSize * 4, this.width, this.blockSize);
        this.context.fillRect(0, this.height - this.blockSize, this.width, this.blockSize)
        this.context.fillRect(0, this.blockSize * 4, this.blockSize, this.height);
        this.context.fillRect(this.width - this.blockSize, this.blockSize * 4, this.blockSize, this.height);
    }

    setWallCollision(snake) {
        if(snake.x < this.blockSize) {
            snake.x = this.width - this.blockSize * 2;
        } else if(snake.x >= this.width - this.blockSize) {
            snake.x = this.blockSize;
        } else if(snake.y < this.blockSize * 5) {
            snake.y = this.height - this.blockSize * 2;
        } else if(snake.y >= this.height - this.blockSize) {
            snake.y = this.blockSize * 5;
        }
    }

    spawnFood() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.food.x, this.food.y, this.blockSize, this.blockSize);
    }
    
    setRandomFoodCoords() {
        this.food.x = this.randomizer(2, this.blockWidth - 1 ) * this.blockSize;
        this.food.y = this.randomizer(5, this.blockHeight - 1) * this.blockSize;
    }

    restart(snake) {
        score = 0;
        snake.x = this.width / 2;
        snake.y = this.height / 2;
        snake.vx = this.blockSize;
        snake.vy = 0;
        snake.tail = [];
        snake.tailLength = 3;
    }

    drawScore() {
        this.context.font = '40px Arial';
        this.context.fillStyle = '#000000';
        this.context.fillText(`Score: ${this.score}`, this.blockSize, this.blockSize * 3);
    }

    incrScore() {
        this.score++;
        this.drawScore();
    }

    randomizer (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    getRandomColor () {
        const index = this.randomizer(0, this.colors.length);
        return this.colors[index];
    }
    
}

let game = new Game();

game.gameLoop();

