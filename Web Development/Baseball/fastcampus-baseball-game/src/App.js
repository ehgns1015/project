import Baseball from './Baseball';
import GuessInputControl from './GuessInputControl';
import GameStore from './GameStore';

class App {
    constructor() {
        const queryParam = new URLSearchParams(location.search);

        const gameID = queryParam.get('id');
        this.resultContainerE1 = document.querySelector('.result-container');
        this.gameStore = new GameStore();
        if (gameID) {
            this.baseball = this.loadGame(gameID);
            this.digit = this.baseball.digit;
        } else {
            this.digit = queryParam.get('digit');
            this.baseball = this.createNewGame();
        }
        this.renderHistory();
        this.inputControl = new GuessInputControl('#guess', {
            callback: this.handleGuess.bind(this),
            digitNumber: this.digit,
        });
    }

    loadGame(gameID) {
        try {
            return this.gameStore.loadGame(gameID);
        } catch (error) {
            alert(error.message);
            return this.createNewGame();
        }
    }

    createNewGame() {
        return new Baseball(this.digit);
    }

    saveGame() {
        this.gameStore.save(this.baseball);
        location.assign(`game.html?id=${this.baseball.id}`);
    }

    renderHistory() {
        const resultsHtml = this.baseball.history
            .map(({ guess, result }) => this.createResultEl(guess, result.toString()))
            .reduce((pre, curr) => pre + curr, '');
        this.resultsContainerEl.innerHTML = resultsHtml;
    }

    handleGuess(values, error) {
        if (error) {
            alert(error.message);
            return;
        }
        const result = this.baseball.getResult(values);
        this.renderHistory();
        if (this.baseball.history.length === 1) {
            this.saveGame();
        }
        if (result.isDone()) {
            alert('정답');
            this.resetGame();
        }
    }

    resetGame() {
        this.inputControl.disable('정답');
    }

    createResultE1(guess, result) {
        return `<li class="list-group-item">
                    <span class="guess">${guess}</span>
                    <span class="badge result">${result}</span>
                </li>`;
    }
}

new App();
