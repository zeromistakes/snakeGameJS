export default class Food {

    constructor(settings) {
            this.settings = settings;
            this.x = this.randomizer(2, this.settings.blockWidth - 1) * this.settings.blockSize;
            this.y = this.randomizer(5, this.settings.blockHeight - 1) * this.settings.blockSize;

    }

    setRandomFoodCoords() {
        this.x = this.randomizer(2, this.settings.blockWidth - 1 ) * this.settings.blockSize;
        this.y = this.randomizer(5, this.settings.blockHeight - 1) * this.settings.blockSize;
    }

    spawnFood(context) {
        context.fillStyle = this.settings.color;
        context.fillRect(this.x, this.y, this.settings.blockSize, this.settings.blockSize);
    }

    randomizer(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}