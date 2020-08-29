export default class GuessInputControl {

    constructor (
        containerSelector, { callback = function () {}, digitNumber} = {}) {
            this.inputE1.addEventListener('keydown', (e) => {
                if (e.keyCode === 13) {
                    const values = Array.from(e.target.value).map((v) => Number(v));
                    if (values.length !== digitNumber) {
                        callback.call(null, [], new Error('자릿수가 맞지 않습니다.'))
                        return;
                    }
                    this.clear();
                    callback.call(null, values);
                    return;
                }
            })
        }
    clear() {
        this.inputE1.value = ''
    }

    disable(message) {
        this.inputE1.disabled = true;
        this.inputE1.placeholder = message;
    }
}