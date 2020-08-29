import TodoApp from './app';

describe('할 일 관리 앱', () => {
  let todoApp;

  test('초기데이터어 의해서 목록을 렌더링한다.', () => {
    todoApp = new TodoApp([{ contents: '공부하기', done: false }]);
    expect(todoApp.todoContainerEl.children.length).toBe(1);
  });

  test('각 할 일은 체크박스와 라벨을 가지고 있다.', () => {
    todoApp = new TodoApp();
    const todoEl = todoApp.createTodoEl({ done: false, contents: 'hello' });
    expect(todoEl).toBeDefined();
    expect(todoEl.querySelector('input[type="checkbox"]')).toBeDefined();
    expect(todoEl.querySelector('label').innerHTML).toBe('hello');
  });

  test('할일을 추가할 수 있다.', () => {
    todoApp = new TodoApp();
    todoApp.addTodo('밥먹기');

    expect(todoApp.todoManager.getList().length).toEqual(1);
    expect(todoApp.todoContainerEl.querySelector('label').innerHTML).toBe('밥먹기');
  });

  test('남은 할 일을 타이틀에 표시한다.', () => {
    todoApp = new TodoApp([{ done: false, contents: 'hello' }]);
    expect(todoApp.titleEl.querySelector('.left-count').innerHTML).toBe('(1개)');
  });
});
