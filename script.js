class Game {
    constructor(gamefield, moveUp, moveRight, moveDown, moveLeft) {
        this.canvas = document.querySelector(gamefield);
        this.context = this.canvas.getContext('2d');
        this.gamefield = gamefield;
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

        this.moveUp = moveUp;
        this.moveDown = moveDown;
        this.moveLeft = moveLeft;
        this.moveRight = moveRight;

        this.keymap = {
            [moveUp] : {vx: 0, vy: -1}, 
            [moveDown] : {vx: 0, vy: 1}, 
            [moveLeft] : {vx: -1, vy: 0}, 
            [moveRight] : {vx: 1, vy: 0}  
        };

        this.snake = {
            x: this.width / 2,
            y: this.height / 2,
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
        this.drawScore();
        this.drawWalls();
        this.spawnFood();
        this.drawSnake();
        
    } 

    control() {
        document.addEventListener('keydown', (event) => {

            let stringKeyCode = String(event.which);
            let newDirection = this.keymap[this.moveRight];
        
            if(this.keymap.hasOwnProperty(stringKeyCode) ) {
                newDirection = this.keymap[stringKeyCode]; 
            } 
            
            if (this.snake.vx != -newDirection.vx && this.snake.vy != -newDirection.vy ) {
               this.snake.vx = newDirection.vx * this.blockSize;
               this.snake.vy = newDirection.vy * this.blockSize; 
            } 

        });
    }



    drawSnake() {
        this.snake.x += this.snake.vx;
        this.snake.y += this.snake.vy;
    
        this.setWallCollision();
        this.changeTailLength();
        this.colorizeSnake();
        this.checkFoodCollision();
        this.restartCondition();
    }

    changeTailLength() {
        this.snake.tail.unshift({ x: this.snake.x, y: this.snake.y});
        
        if (this.snake.tail.length > this.snake.tailLength) {
            this.snake.tail.pop();
        }
    }

    restartCondition() {
        this.snake.tail.forEach((elem,index) => {
    
            for (let i = index + 1; i < this.snake.tail.length; i++) {
                if (elem.x === this.snake.tail[i].x && elem.y === this.snake.tail[i].y) {
                    this.restart();
                }
            }
        });
    }

    checkFoodCollision() {
        this.snake.tail.forEach((elem) => {
    
            if (elem.x === this.food.x && elem.y === this.food.y) {
                this.snake.tailLength++;
                this.incrScore();
                this.setRandomFoodCoords();
            }
        });
    }

    colorizeSnake() {
        this.snake.tail.forEach((elem,index) => {
            if (index === 0) {
                this.context.fillStyle = '#000000';
            } else {
                this.context.fillStyle = 'red';
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

    setWallCollision() {
        if(this.snake.x < this.blockSize) {
            this.snake.x = this.width - this.blockSize * 2;
        } else if(this.snake.x >= this.width - this.blockSize) {
            this.snake.x = this.blockSize;
        } else if(this.snake.y < this.blockSize * 5) {
            this.snake.y = this.height - this.blockSize * 2;
        } else if(this.snake.y >= this.height - this.blockSize) {
            this.snake.y = this.blockSize * 5;
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

    restart() {
        this.score = 0;
        this.snake.x = this.width / 2;
        this.snake.y = this.height / 2;
        this.snake.vx = this.blockSize;
        this.snake.vy = 0;
        this.snake.tail = [];
        this.snake.tailLength = 3;
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

let game = new Game('.gamefield', '38', '39', '40', '37');
game.gameLoop();

let anotherGame = new Game('.anotherGamefield', '87', '68', '83', '65');
anotherGame.gameLoop();





