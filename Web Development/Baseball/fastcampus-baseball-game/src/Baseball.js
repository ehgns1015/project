import { getRandomInt } from "./utils";
import { v4 as uuidv4 } from "uuid";
import GameResult from './GameResult';

export default class Baseball {
    // #gameStore;

    constructor(digit, id, problem, history) {
        // this.#gameStore = gameStore;
        this.id = id || uuidv4();
        this.digit = digit;
        this.problem = problem || this.makeProblem();
        this.history = (history || []).map((v) => ({
            guess: v.guess,
            result: new GameResult(v.result.digit, v.result.strike, v.result.ball),
        }));
    }
    
    makeProblem() {
        let problem = [],
        numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        for(let i = 0; i < this.digit; i++) {
            let max = 9 - i,
            index = getRandomInt(0, max);
            problem.push(numbers[index]);
            numbers.splice(index, 1);
        }
        return problem;
    }

    getResult(guess) {
        let strike = 0,
        ball = 0;
        this.problem.forEach((v,i) => {
            if (guess[i] === v) {
                strike++;
            } else if (this.problem.indexOf(guess[i]) > -1) {
                ball++;
            }           
        });
        const result = new GameResult(this.digit, strike, ball);
        this.history.push({ guess, result });
        return result;
    }
}