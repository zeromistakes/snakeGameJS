const canvas = document.querySelector('.gamefield');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;
const blockSize = 20;
const blockWidth = width / blockSize; // 32
const blockHeight = height / blockSize;

const colors = ['#57F500','#7100D6','#E93DEB','#0BC9D6', '#00FAB6','#FA6101','#FA0065'];
const color = getRandomColor();
let score = 0;
let frames = 0;
let speed = 6;


const snake = {
    x: width / 2,
    y: height / 2,
    vx: blockSize,
    vy: 0,
    tail: [],
    tailLength: 3
};

let food = {
    x: randomizer (2, blockWidth - 1) * blockSize,
    y: randomizer (5, blockHeight - 1) * blockSize
};



function gameLoop() {
    requestAnimationFrame(gameLoop);
    if (++frames < speed) {
        return;
    }
    frames = 0;

    context.clearRect(0, 0, width, height);
    drawScore();
    drawWalls();
    spawnFood();
    drawSnake();
} 
requestAnimationFrame(gameLoop);


document.addEventListener('keydown', (event) => {
    if (event.which === 37 && snake.vx === 0) { // left
        snake.vx = -blockSize;
        snake.vy = 0;
    } else if (event.which === 38 && snake.vy === 0) { // up
        snake.vx = 0;
        snake.vy = -blockSize;
    } else if (event.which === 39 && snake.vx === 0) { // right
        snake.vx = blockSize;
        snake.vy = 0;
    } else if (event.which === 40 && snake.vy === 0) { // down
        snake.vx = 0;
        snake.vy = blockSize;
    }
});

function drawSnake() {
    snake.x += snake.vx;
    snake.y += snake.vy;

    setWallCollision();

    snake.tail.unshift({ x: snake.x, y: snake.y});
    
    if(snake.tail.length > snake.tailLength) {
        snake.tail.pop();
    }

    snake.tail.forEach((elem,index) => {
        if (index === 0) {
            context.fillStyle = '#000000';
        } else {
            context.fillStyle = color;
        }
        context.fillRect(elem.x, elem.y, blockSize, blockSize);

        if (elem.x === food.x && elem.y === food.y) {
            snake.tailLength++;
            incrScore();
            setRandomFoodCoords();
        }

        for (let i = index + 1; i < snake.tail.length; i++) {
            if (elem.x === snake.tail[i].x && elem.y === snake.tail[i].y) {
                restart();
            }
        }
    });
}

function drawWalls() {
    context.fillStyle = '#00ff1a';
    context.fillRect(0, blockSize * 4, width, blockSize);
    context.fillRect(0, height - blockSize, width, blockSize)
    context.fillRect(0, blockSize * 4, blockSize, height);
    context.fillRect(width - blockSize, blockSize * 4, blockSize, height);
}



function setWallCollision() {
    if(snake.x < blockSize) {
        snake.x = width - blockSize * 2;
    } else if(snake.x >= width - blockSize) {
        snake.x = blockSize;
    } else if(snake.y < blockSize * 5) {
        snake.y = height - blockSize * 2;
    } else if(snake.y >= height - blockSize) {
        snake.y = blockSize * 5;
    }
}


function spawnFood() {
    context.fillStyle = color;
    context.fillRect(food.x, food.y, blockSize, blockSize);
}

function setRandomFoodCoords() {
    food.x = randomizer (2, blockWidth - 1 ) * blockSize;
    food.y = randomizer (5, blockHeight - 1) * blockSize;
}



function restart() {
    score = 0;
    snake.x = width / 2;
    snake.y = height / 2;
    snake.vx = blockSize;
    snake.vy = 0;
    snake.tail = [];
    snake.tailLength = 3;
}

function drawScore() {
    context.font = '40px Arial';
    context.fillStyle = '#000000';
    context.fillText(`Score: ${score}`, blockSize, blockSize * 3);
}

function incrScore() {
    score++;
    drawScore();
}

function randomizer (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor () {
    const index = randomizer(0, colors.length);
    return colors[index];
}



