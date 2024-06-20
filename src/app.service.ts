import { Injectable } from '@nestjs/common';

export type Todo = {
  id: number;
  title: string;
  isDone: boolean;
};

type updateTodo = {
  id: number;
  data: Todo;
  todoList: Todo[];
};

type deleteTodo = {
  id: number;
  todoList: Todo[];
};

@Injectable()
export class AppService {
  createTodo({ title, todoList }: { title: string; todoList: Todo[] }): Todo[] {
    return [
      ...todoList,
      {
        id: todoList.length + 1,
        title,
        isDone: false,
      },
    ];
  }

  updateTodo({ id, data, todoList }: updateTodo): Todo[] {
    const updatedTodo = todoList;

    updatedTodo[Number(id) - 1] = {
      id: Number(id),
      ...data,
    } as Todo;

    return [...updatedTodo];
  }

  deleteTodo({ id, todoList }: deleteTodo): Todo[] {
    const list = todoList.filter((todo) => todo.id !== Number(id));

    return list;
  }
}
