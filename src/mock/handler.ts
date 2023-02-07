import todosMock from "./api/todos.mock"

export const handlers = [
  todosMock.get_todos_200_Success,
  todosMock.post_todos_201_Success,
]