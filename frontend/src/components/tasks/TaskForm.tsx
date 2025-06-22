import React, { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import type { TaskFormData } from "../../types";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: TaskFormData) => void;
  isLoading?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    completed: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: "",
        description: "",
        completed: false,
      });

      setErrors({});
    }
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 200) {
      newErrors.title = "Title must not exceed 200 characters";
    }

    if (formData.description.length > 1000) {
      newErrors.description = "Description must not exceed 1000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (
    field: keyof TaskFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 !m-0'>
      <div className='bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-900 flex items-center'>
            <Plus className='w-5 h-5 mr-2 text-indigo-600' />
            Create New Task
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors duration-200'>
            <X className='w-6 h-6' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-4'>
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700 mb-2'>
              Title *
            </label>
            <input
              type='text'
              id='title'
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.title ? "border-red-300" : "border-gray-300"
              }`}
              placeholder='Enter task title'
              maxLength={200}
              disabled={isLoading}
            />
            {errors.title && (
              <p className='mt-1 text-sm text-red-600'>{errors.title}</p>
            )}
            <p className='mt-1 text-xs text-gray-500'>
              {formData.title.length}/200 characters
            </p>
          </div>

          <div>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700 mb-2'>
              Description
            </label>
            <textarea
              id='description'
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none ${
                errors.description ? "border-red-300" : "border-gray-300"
              }`}
              placeholder='Enter task description (optional)'
              maxLength={1000}
              disabled={isLoading}
            />
            {errors.description && (
              <p className='mt-1 text-sm text-red-600'>{errors.description}</p>
            )}
            <p className='mt-1 text-xs text-gray-500'>
              {formData.description.length}/1000 characters
            </p>
          </div>

          <div className='flex justify-end space-x-3 pt-4 border-t border-gray-200'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200'
              disabled={isLoading}>
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
              disabled={isLoading || !formData.title.trim()}>
              {isLoading ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block'></div>
                  Creating...
                </>
              ) : (
                "Create Task"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
