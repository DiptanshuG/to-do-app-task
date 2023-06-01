import { Todo } from "./Todo";

export interface User {
    id: string;
    name: string;
    email: string;
    todos: Todo[];
  }
  