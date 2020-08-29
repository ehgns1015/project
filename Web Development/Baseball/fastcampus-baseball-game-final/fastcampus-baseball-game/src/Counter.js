const Counter = (() => {
  const VALUE = Symbol();
  return class {
    constructor(id) {
      this[VALUE] = 1;
      this.container = document.getElementById(id);
      if (this.container == null) throw Error(id + ' 찾을 수 없습니다.');
      this.container.innerHTML = this[VALUE];
    }
    increase() {
      if (this[VALUE] > 8) return this[VALUE];
      this[VALUE] += 1;
      this.container.innerHTML = this[VALUE];
      return this[VALUE];
    }
    decrease() {
      if (this[VALUE] < 2) return this[VALUE];
      this[VALUE] -= 1;
      this.container.innerHTML = this[VALUE];
      return this[VALUE];
    }
    get value() {
      return this[VALUE];
    }
  };
})();

const counter = new Counter('digit-number');
document.getElementById('minus-btn').addEventListener('click', (e) => counter.decrease());
document.getElementById('plus-btn').addEventListener('click', (e) => counter.increase());
document.getElementById('start-btn').addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  location.assign(`game.html?digit=${counter.value}`);
});
