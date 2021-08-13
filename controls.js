export default class Controls {

    constructor (moveUp, moveRight, moveDown, moveLeft) {

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
    }

    control(snake, settings) {
        document.addEventListener('keydown', (event) => {

            let stringKeyCode = String(event.which);
            let newDirection = this.keymap[this.moveRight];
            
            if(this.keymap.hasOwnProperty(stringKeyCode) ) {
                newDirection = this.keymap[stringKeyCode]; 
            } 
            
            if (snake.vx != -newDirection.vx && snake.vy != -newDirection.vy ) {
               snake.vx = newDirection.vx * settings.blockSize;
               snake.vy = newDirection.vy * settings.blockSize; 
            } 

        });
    }
}