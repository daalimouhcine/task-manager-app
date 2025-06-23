import axios from "axios";
import type { CreateTaskRequest, Task, UpdateTaskRequest } from "../types";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthEndpoint = error.config?.url?.includes("/auth/");

      if (!isAuthEndpoint) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks");
  return response.data;
};

export const createTask = async (
  taskData: CreateTaskRequest
): Promise<Task> => {
  const response = await api.post("/tasks", {
    title: taskData.title,
    description: taskData.description || "",
    completed: taskData.completed || false,
  });
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export const toggleTaskCompletion = async (id: number): Promise<Task> => {
  const response = await api.patch(`/tasks/${id}/toggle`);
  return response.data;
};

export const updateTask = async (
  id: number,
  taskData: UpdateTaskRequest
): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, {
    title: taskData.title,
    description: taskData.description || "",
    completed: taskData.completed || false,
  });
  return response.data;
};

export default api;
