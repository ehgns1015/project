class TodoManager {
  constructor(todos = []) {
    this.todos = [];
    todos.forEach((v) => this.addTodo(v.contents, v.done));
  }

  addTodo(contents, done) {
    const newTodo = {
      contents: contents,
      makeDone() {
        Object.defineProperty(this, 'done', {
          writable: false,
          configurable: true,
          value: true,
        });
      },
      toggle() {
        Object.defineProperty(this, 'done', {
          writable: false,
          configurable: true,
          value: !this.done,
        });
      },
    };
    Object.defineProperty(newTodo, 'done', {
      writable: false,
      configurable: true,
      value: done || false,
    });
    this.todos.push(newTodo);
    return newTodo;
  }

  getList() {
    return this.todos;
  }

  get leftTodo() {
    return this.todos.reduce((acc, curr) => (curr.done === false ? acc + 1 : acc), 0);
  }
}

export default TodoManager;
