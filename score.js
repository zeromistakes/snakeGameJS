export default class Score {
    constructor(context, settings) {
        this.context = context;
        this.settings = settings;
        this.score = 0;
    }

    drawScore() {
        this.context.font = '40px Arial';
        this.context.fillStyle = '#000000';
        this.context.fillText(`Score: ${this.score}`, this.settings.blockSize, this.settings.blockSize * 3);
    }

    incrScore() {
        this.score++;
        this.drawScore();
    }


}