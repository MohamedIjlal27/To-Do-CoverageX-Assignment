'use client';

import { useState } from 'react';

interface TodoCardProps {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
  loading?: boolean;
}

export default function TodoCard({ id, title, description, completed, onComplete, onDelete, onEdit, loading }: TodoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(id, editedTitle, editedDescription);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={`bg-gray-300 rounded-xl p-6 mb-6 ${completed ? 'opacity-75' : ''}`}>
      <div className="flex justify-between items-center">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full text-xl font-bold text-black mb-1 bg-white rounded-lg px-3 py-1.5 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full text-base text-black bg-white rounded-lg px-3 py-1.5 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                rows={3}
              />
            </div>
          ) : (
            <>
              <h3 className={`text-xl font-bold text-black mb-1 ${completed ? 'line-through' : ''}`}>{title}</h3>
              <p className={`text-base text-black ${completed ? 'line-through' : ''}`}>{description}</p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onComplete(id)}
            disabled={loading || completed}
            className={`border border-black text-black font-medium rounded-lg px-6 py-1.5 transition-colors duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed ${completed ? 'bg-gray-400' : ''}`}
          >
            {completed ? 'Completed' : 'Done'}
          </button>
          <button
            onClick={handleEdit}
            disabled={loading}
            className="border border-black text-black font-medium rounded-lg px-6 py-1.5 transition-colors duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button
            onClick={() => onDelete(id)}
            disabled={loading}
            className="border border-black text-black font-medium rounded-lg px-6 py-1.5 transition-colors duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
} 