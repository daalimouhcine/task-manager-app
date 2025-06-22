export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdDate: string;
  username: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface TaskFormData {
  title: string;
  description: string;
  completed: boolean;
}

export interface UpdateTaskRequest {
  title: string;
  description?: string;
  completed?: boolean;
}
