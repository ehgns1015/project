import Baseball from './Baseball';

export default class GameStore {
  static KEY = 'FC_ONLINE_BASEBALL_GAME';
  constructor() {
    this.games = this.getGames() || {};
  }

  getGames() {
    const data = localStorage.getItem(GameStore.KEY);
    return JSON.parse(data);
  }

  loadGame(gameId) {
    const found = this.getGames()[gameId];
    if (found) {
      const { id, digit, history, problem } = found;
      return new Baseball(digit, id, problem, history);
    } else {
      throw new Error(`can not find any game for gameId = ${gameId}`);
    }
  }

  save(game) {
    this.games[game.id] = game;
    this.#setItem();
  }

  delete(gameId) {
    delete this.games[gameId];
    this.#setItem();
  }

  #setItem() {
    const jsonData = JSON.stringify(this.games);
    localStorage.setItem(GameStore.KEY, jsonData);
  }
}
