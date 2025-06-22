import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Loader } from "lucide-react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import {
  getTasks,
  createTask,
  deleteTask,
  toggleTaskCompletion,
  updateTask,
} from "../../services/api";
import type { Task } from "../../types";

interface TaskFormData {
  title: string;
  description: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const queryClient = useQueryClient();

  // Fetch tasks
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsFormOpen(false);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TaskFormData }) =>
      updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsFormOpen(false);
      setEditingTask(null);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTaskCompletion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (taskData: TaskFormData) => {
    if (editingTask) {
      updateTaskMutation.mutate({ id: editingTask.id, data: taskData });
    } else {
      createTaskMutation.mutate(taskData);
    }
  };

  const handleDeleteTask = (taskId: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTaskMutation.mutate(taskId);
    }
  };

  const handleToggleComplete = (taskId: number) => {
    toggleMutation.mutate(taskId);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <Loader className='w-8 h-8 animate-spin text-indigo-600' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-12'>
        <p className='text-red-600'>Error loading tasks. Please try again.</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold text-gray-900'>Your Tasks</h2>
        <button
          onClick={handleCreateTask}
          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          <Plus className='w-4 h-4 mr-2' />
          New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className='text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300'>
          <p className='text-gray-500'>No tasks yet. Create your first task!</p>
        </div>
      ) : (
        <div className='grid gap-4'>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ))}
        </div>
      )}

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        isLoading={createTaskMutation.isPending || updateTaskMutation.isPending}
        editingTask={editingTask}
      />
    </div>
  );
};

export default TaskList;
