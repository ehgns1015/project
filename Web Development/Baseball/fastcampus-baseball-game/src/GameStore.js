import Baseball from './Baseball'

export default class GameStore {
    constructor() {
        this.games = this.getGames() || {};
    }

    getGames() {
        const data = localStorage.getItem(GameStore.KEY);
        return JSON.parse(data);
    }

    loadGame(gameID) {
        const found = this.getGames()[gameID];
        if (found) {
            const { id, digit, history, problem } = found;
            return new Baseball(digit, id, problem, history);
        } else {
            throw new Error(`게임을 찾을 수 없습니다. gameID = ${gameID}`);
        }
    }

    save(game) {
        this.games[game.id] = game;
        this.#setItem();
    }

    delete(gameID) {
        delete this.games[gameID];
        this.#setItem();
    }

    #setItem() {
        const jsonData = JSON.stringify(this.games);
        localStorage.setItem(GameStore.KEY, jsonData);
    }
}