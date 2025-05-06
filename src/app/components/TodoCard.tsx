'use client';

interface TodoCardProps {
  id: string;
  title: string;
  description: string;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export default function TodoCard({ id, title, description, onComplete, onDelete, loading }: TodoCardProps) {
  return (
    <div className="bg-gray-300 rounded-xl p-6 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-black mb-1">{title}</h3>
          <p className="text-base text-black">{description}</p>
        </div>
        <button
          onClick={() => onComplete(id)}
          disabled={loading}
          className={`ml-4 border border-black text-black font-medium rounded-lg px-6 py-1.5 transition-colors duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Done
        </button>
      </div>
    </div>
  );
} 