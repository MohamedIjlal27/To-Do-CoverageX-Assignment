import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export default function Pagination({
  limit,
  onLimitChange,
}: PaginationProps) {
  const limits = [5, 10, 20, 50];

  return (
    <div className="flex items-center gap-2 mt-6">
      <label htmlFor="limit" className="text-sm text-gray-600">
        Show:
      </label>
      <select
        id="limit"
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
        className="border rounded px-2 py-1 text-sm"
      >
        {limits.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
      <span className="text-sm text-gray-600">entries</span>
    </div>
  );
} 