// components/Pagination.tsx
import React from "react";
import {
  BsChevronDoubleLeft,
  BsChevronLeft,
  BsChevronDoubleRight,
  BsChevronRight,
} from "react-icons/bs";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  count?: number;
  sizes?: Array<number>;
  onChangeSize?: (size: number) => void;
  onPageChange: (page: number) => void;
  maxPageButtons?: number; // number of middle buttons, default: 5
};

export const Pagination: React.FC<PaginationProps> = ({
  count,
  currentPage,
  totalPages,
  onPageChange,
  sizes = [],
  onChangeSize,
  maxPageButtons = 5,
}) => {
  if (totalPages <= 1) return null;

  const buttonClass = (active?: boolean, type?: string) =>
    `${type === "number" ? "border rounded-lg shadow-md" : ""} px-3 py-1 text-sm transition ${
      active
        ? "bg-blue-600 text-gray-500"
        : "bg-white text-gray-500 border-gray-300 hover:bg-gray-100"
    }`;

  const renderPageButtons = () => {
    const pages: (number | string)[] = [];

    const sideCount = Math.floor(maxPageButtons / 2);
    let start = Math.max(2, currentPage - sideCount);
    let end = Math.min(totalPages - 1, currentPage + sideCount);

    if (currentPage <= sideCount + 1) {
      start = 2;
      end = Math.min(totalPages - 1, maxPageButtons);
    } else if (currentPage + sideCount >= totalPages) {
      end = totalPages - 1;
      start = Math.max(2, totalPages - maxPageButtons + 1);
    }

    // Always show first page
    pages.push(1);

    // Ellipsis before
    if (start > 2) pages.push("...");

    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Ellipsis after
    if (end < totalPages - 1) pages.push("...");

    // Always show last page
    if (totalPages > 1) pages.push(totalPages);

    return pages.map((p, idx) =>
      typeof p === "number" ? (
        <button
          key={idx}
          onClick={() => onPageChange(p)}
          className={`${buttonClass(p === currentPage, "number")} rounded bg-gray-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50`}
        >
          {p}
        </button>
      ) : (
        <span key={idx} className="px-2 py-1 text-sm text-gray-500">
          ...
        </span>
      ),
    );
  };

  return (
    <div className="flex items-center justify-between space-x-2 mt-4 flex-wrap">
      <span className="text-sm text-gray-500 font-normal">Total : {count}</span>
      <div className="flex items-center space-x-2 flex-wrap">
        {sizes?.length > 0 && (
          <select
            onChange={(ev) => onChangeSize?.(parseInt(ev.target.value))}
            className="rounded-lg px-3 py-2 outline-none ring-1 ring-gray-300 focus:ring-orange-400  text-gray-500"
          >
            {sizes.map((val, idx) => (
              <option key={idx} value={val}>
                {val}
              </option>
            ))}
          </select>
        )}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          className={`${buttonClass()} ${currentPage === 1 ? "disabled:cursor-not-allowed" : ""}`}
        >
          <BsChevronDoubleLeft size={14} className="fill-gray-500" />
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`${buttonClass()} ${currentPage === 1 ? "disabled:cursor-not-allowed" : ""}`}
        >
          <BsChevronLeft size={14} className="fill-gray-500" />
        </button>

        {renderPageButtons()}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`${buttonClass()} ${currentPage === totalPages ? "disabled:cursor-not-allowed" : ""}`}
        >
          <BsChevronRight size={14} className="fill-gray-500" />
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`${buttonClass()} ${currentPage === totalPages ? "disabled:cursor-not-allowed" : ""}`}
        >
          <BsChevronDoubleRight size={14} className="fill-gray-500" />
        </button>
      </div>
    </div>
  );
};