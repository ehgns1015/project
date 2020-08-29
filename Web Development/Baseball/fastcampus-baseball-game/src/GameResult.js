export default class GameResult {
    constructor(digit, strike, ball) {
        this.digit = digit;
        this.strike = strike;
        this.ball = ball;
    }

    isDone() {
        return this.ball == 0 && this.strike == this.digit;
    }

    toString() {
        let resultString = `${this.strike}S${this.ball}B`;
        if (this.strike === 0 && this.ball === 0) {
            resultString = 'OUT';
        }
        return resultString;
    }
}