import React from "react";
import { Check, Trash2, Calendar, User, Edit } from "lucide-react";
import type { Task } from "../../types";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border-2 transition-all duration-200 hover:shadow-md ${
        task.completed
          ? "border-green-200 bg-green-50"
          : "border-gray-200 hover:border-indigo-300"
      }`}>
      <div className='p-6'>
        <div className='flex items-start justify-between mb-3'>
          <div className='flex items-start space-x-3 flex-1'>
            <button
              onClick={() => onToggleComplete(task.id)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                task.completed
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-gray-300 hover:border-indigo-500"
              }`}>
              {task.completed && <Check className='w-4 h-4' />}
            </button>

            <div className='flex-1'>
              <h3
                className={`text-lg font-medium transition-all duration-200 ${
                  task.completed
                    ? "text-green-800 line-through"
                    : "text-gray-900"
                }`}>
                {task.title}
              </h3>
            </div>
          </div>

          <div className='flex items-center space-x-2 ml-4'>
            <button
              onClick={() => onEdit(task)}
              className='p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors duration-200'
              title='Edit task'>
              <Edit className='w-4 h-4' />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className='p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200'
              title='Delete task'>
              <Trash2 className='w-4 h-4' />
            </button>
          </div>
        </div>

        {task.description && (
          <div className='mb-4'>
            <p
              className={`text-sm leading-relaxed ${
                task.completed ? "text-green-700" : "text-gray-600"
              }`}>
              {task.description}
            </p>
          </div>
        )}

        <div className='flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100'>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-1'>
              <Calendar className='w-3 h-3' />
              <span>{formatDate(task.createdDate)}</span>
            </div>
            <div className='flex items-center space-x-1'>
              <User className='w-3 h-3' />
              <span>{task.username}</span>
            </div>
          </div>

          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              task.completed
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-700"
            }`}>
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
