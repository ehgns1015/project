import TodoManager from './todoManager';

describe('할 일 관리', () => {
  let todoManager;

  test('생성할 수 있다.', () => {
    todoManager = new TodoManager();
    expect(todoManager).toBeDefined();
  });

  test('할 일을 추가할 수 있다. 할 일은 아직 완료되지 않았다.', () => {
    const newTodo = todoManager.addTodo('자바스크립트 공부');
    expect(newTodo.contents).toBe('자바스크립트 공부');
    expect(newTodo.done).toBeDefined();
    expect(newTodo.done).toBeFalsy();
  });

  test('할 일 목록을 가져 올 수 있다.', () => {
    const todoList = todoManager.getList();
    expect(todoList.length).toBe(1);
  });

  test('할 일을 완료할 수 있다. done 속성으로는 변경이 불가능하고 makeDone만 완료할 수 있다.', () => {
    const todoList = todoManager.getList();
    const todo = todoList[0];
    try {
      todo.done = true;
    } catch (e) {
    } finally {
      expect(todo.done).toBeFalsy();
    }

    todo.makeDone();
    expect(todo.done).toBeTruthy();
  });

  test('남은 할 일을 알 수 있다.', () => {
    todoManager.addTodo('놀기');
    try {
      todoManager.leftTodo = 100;
    } catch (e) {
    } finally {
      expect(todoManager.leftTodo).toBe(1);
    }
  });
});
