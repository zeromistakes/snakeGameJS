export default class Settings {

    constructor(width, height){
        this.blockSize = 20;
        this.blockWidth = width / this.blockSize; // 32
        this.blockHeight = height / this.blockSize;

        this.color = 'red';
        this.frames = 0;
        this.speed = 6;
    }
    
}