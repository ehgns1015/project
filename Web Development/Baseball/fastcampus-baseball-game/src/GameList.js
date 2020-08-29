import GameStore from './GameStore';

class GameList {
    constructor(containerSelector) {
        this.containerE1 = document.querySelector(containerSelector);
        this.gameStore = new GameStore();
        this.containerE1.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-continue-game')) {
                if (e.target.hasAttribute('disabled')) {
                    e.preventDefault();
                }
            }
            if (e.target.classList.contains('btn-delete-game')) {
                e.preventDefault();
                this.deleteGame(e.target.dataset.id);
            }
        });
    }

    createCardTemp = (game) => `
        <div class="col-sm-4 col-md-3">
            <div class="thumbnail">
                <div id="${game.id}" class="caption">
                    <h3>${game.digit}자리 게임</h3>
                    <p>id: ${game.id}</p>
                    <p>
                        <a href="game.html?id=${game.id}" 
                        class="btn btn-primary btn-continue-game"
                        ${game.done ? 'disabled' : ''}>이어하기</a>
                        <a href="#" class="btn btn-danger btn-delete-game" 
                        data-id="${game.id}">삭제하기</a>
                    </p>
                </div>
            </div>
        </div>`;

    render() {
        const games = this.gameStore.getGames();
        if (games == null) {
            this.containerE1.innerHTML = '<h1>진행중인 게임이 없습니다.</h1>';
            return;
        }
        const itemsHTML = Object.values(games).map((game) => this.createCardTemp(game)).reduce((pre, curr) => pre + curr, '');
        this.containerE1.innerHTML = itemsHTML;
    }

    deleteGame(id) {
        this.gameStore.delet(id);
        this.render();
    }
}

new GameList('.container .row').render();
