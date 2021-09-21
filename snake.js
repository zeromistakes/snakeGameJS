export default class Snake {

    constructor(width, height, settings) {
            
            

            this.x = width / 2;
            this.y = height / 2;
            this.vx = settings.blockSize;
            this.vy = 0;
            this.tail = [];
            this.tailLength = 3;
    }

    drawSnake(width ,height, context, score, settings, food) {
        this.x += this.vx;
        this.y += this.vy;
    
        this.setWallCollision(width, height, settings);
        this.changeTailLength();
        this.colorizeSnake(context, settings);
        this.checkFoodCollision(food, score);
        this.restartCondition(width, height, score, settings);
    }

    colorizeSnake(context, settings) {
        this.tail.forEach((elem,index) => {
            if (index === 0) {
                context.fillStyle = '#000000';
            } else {
                context.fillStyle = 'red';
            }
            context.fillRect(elem.x, elem.y, settings.blockSize, settings.blockSize);
        });
    }

    setWallCollision(width, height, settings) {
        if(this.x < settings.blockSize) {
            this.x = width - settings.blockSize * 2;
        } else if(this.x >= width - settings.blockSize) {
            this.x = settings.blockSize;
        } else if(this.y < settings.blockSize * 5) {
            this.y = height - settings.blockSize * 2;
        } else if(this.y >= height - settings.blockSize) {
            this.y = settings.blockSize * 5;
        }
    }

    checkFoodCollision(food, score) {
        this.tail.forEach((elem) => {
    
            if (elem.x === food.x && elem.y === food.y) {
                this.tailLength++;
                score.incrScore();
                food.setRandomFoodCoords();
            }
        });
    }

    changeTailLength() {
        this.tail.unshift({ x: this.x, y: this.y});
        
        if (this.tail.length > this.tailLength) {
            this.tail.pop();
        }
    }

    restartCondition(width, height, score, settings) {
        this.tail.forEach((elem,index) => {
    
            for (let i = index + 1; i < this.tail.length; i++) {
                if (elem.x === this.tail[i].x && elem.y === this.tail[i].y) {
                    this.restart(width, height, score, settings);
                }
            }
        });
    }

    restart(width, height, score, settings) {
        score.score = 0;
        this.x = width / 2;
        this.y = height / 2;
        this.vx = settings.blockSize;
        this.vy = 0;
        this.tail = [];
        this.tailLength = 3;
    }
    
}