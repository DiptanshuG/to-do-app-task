export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  subTasks: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}
