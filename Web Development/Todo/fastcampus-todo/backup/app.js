import TodoManager from './todoManager';

class TodoApp {
  constructor(todos) {
    this.todoManager = new TodoManager(todos);
    this.todoContainerEl =
      document.querySelector('.todo-container') || document.body.appendChild(document.createElement('div'));
    this.titleEl = document.querySelector('.title h2') || document.body.appendChild(document.createElement('div')); // 추가 // 추가
    this.plusBtnEl = document.querySelector('.add-todo button');
    this.todoElMap = new WeakMap();
    this.renderTodos();
    this.bindEvents();
  }

  renderTodos() {
    this.todoContainerEl.innerHTML = '';
    const todoList = this.todoManager.getList();
    todoList.forEach((v) => this.todoContainerEl.appendChild(this.createTodoEl(v)));
    this.renderTitle();
  }

  createTodoEl(todo) {
    const todoEl = document.createElement('div');
    todoEl.innerHTML = `<input type="checkbox" ${todo.done ? 'checked' : ''}> <label>${todo.contents}</label>`;
    todoEl.className = 'todo';

    this.todoElMap.set(todoEl, todo);
    return todoEl;
  }

  addTodo(contents) {
    this.todoManager.addTodo(contents);
    this.renderTodos();
  }

  renderTitle() {
    var now = new Date();
    if (this.titleEl)
      this.titleEl.innerHTML =
        now.getMonth() +
        1 +
        '월 ' +
        now.getDate() +
        '일 <span class="left-count">(' +
        this.todoManager.leftTodo +
        '개)</span>';
  }

  bindEvents() {
    if (this.plusBtnEl) {
      this.plusBtnEl.addEventListener('click', () => {
        const textEl = document.querySelector('.add-todo input[type="text"]');
        this.addTodo(textEl.value);
        textEl.value = '';
      });
    }
    this.todoContainerEl.addEventListener('click', (evt) => {
      if (evt.target.nodeName === 'INPUT' && evt.target.parentElement.className === 'todo') {
        this.todoElMap.get(evt.target.parentElement).toggle();
        this.renderTitle();
      }
    });
  }
}

export default TodoApp;
