import Baseball from './Baseball';
import GuessInputControl from './GuessInputControl';
import GameStore from './GameStore';

class App {
  constructor() {
    const queryParam = new URLSearchParams(location.search);

    const gameId = queryParam.get('id');
    this.resultsContainerEl = document.querySelector('.result-container');
    this.gameStore = new GameStore();
    if (gameId) {
      this.baseball = this.loadGame(gameId);
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

  loadGame(gameId) {
    try {
      return this.gameStore.loadGame(gameId);
    } catch (error) {
      console.error(error);
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
    // 게임에 처음으로 guess를 입력했으면 게임이 저장되었기 때문에 리로드를 해도 데이터가 보관된다.
    if (this.baseball.history.length == 1) {
      this.saveGame();
    }
    if (result.isDone()) {
      alert('정답을 맞추었습니다!');
      this.resetGame();
    }
  }

  resetGame() {
    this.inputControl.disable('정답을 맞추었습니다!');
  }

  createResultEl(guess, result) {
    console.log(result);
    return `<li class="list-group-item">
              <span class="guess">${guess.reduce((p, c) => `${p} ${c}`)}</span>
              <span class="badge result">${result}</span>
            </li>`;
  }
}

new App();
