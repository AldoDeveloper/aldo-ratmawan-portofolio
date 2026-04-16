// components/Table
import React, { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export type Column<T> = {
  key: keyof T;
  label: string;
  className?: string;
  style?: React.CSSProperties;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
};

type SortConfig<T> = {
  key: keyof T | null;
  direction: "asc" | "desc";
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  showGridLine?: boolean;
  isLoading?: boolean;
  addTableData?: React.ReactNode;
  onRowClick?: (row: T) => void;
  headerClassName?: string;
  enableRowSelection?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (selectedRows: T[]) => void;
  rowSelectionKey?: keyof T;
  onSort?: (sortConfig: SortConfig<T>) => void;
};

export function Table<T extends Record<string, any>>({
  columns,
  data,
  headerClassName,
  showGridLine = false,
  isLoading = false,
  addTableData,
  onRowClick,
  enableRowSelection = false,
  selectedRows = [],
  onSelectionChange,
  rowSelectionKey = "id" as keyof T,
  onSort,
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    key: null,
    direction: "asc",
  });

  // Handle sorting
  const handleSort = (key: keyof T, sortable: boolean = true) => {
    if (!sortable) return;

    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const newSortConfig = { key, direction };
    setSortConfig(newSortConfig);
    if (onSort) {
      onSort(newSortConfig);
    }
  };

  // Apply sorting to data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      // Handle different data types
      if (typeof aValue === "string" && typeof bValue === "string") {
        const result = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
        return sortConfig.direction === "asc" ? result : -result;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        const result = aValue - bValue;
        return sortConfig.direction === "asc" ? result : -result;
      }

      // For dates or other types, try to convert to string
      const result = String(aValue).localeCompare(String(bValue));
      return sortConfig.direction === "asc" ? result : -result;
    });
  }, [data, sortConfig]);
  // Add checkbox column if row selection is enabled
  const selectionColumn = enableRowSelection
    ? [
        {
          key: "__selection" as keyof T,
          label: "__SELECT_ALL" as any, // Using a special value for the select all header
          className: "w-12",
          sortable: false,
          render: (value: any, row: T) => {
            const isSelected = selectedRows.some(
              (selectedRow) =>
                selectedRow[rowSelectionKey] === row[rowSelectionKey],
            );
            return (
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                checked={isSelected}
                onChange={(e) => {
                  if (e.target.checked) {
                    onSelectionChange?.([...selectedRows, row]);
                  } else {
                    onSelectionChange?.(
                      selectedRows.filter(
                        (selectedRow) =>
                          selectedRow[rowSelectionKey] !== row[rowSelectionKey],
                      ),
                    );
                  }
                }}
              />
            );
          },
        } as Column<T>,
      ]
    : [];

  const allColumns = [...selectionColumn, ...columns];
  return (
    <div className="max-w-full bg-transparent overflow-x-auto">
      <table
        className={`min-w-full border-collapse text-left text-sm text-gray-700 ${showGridLine ? "border-separate border-spacing-0" : ""}`}
      >
        <thead>
          <tr
            className={`bg-gray-100 text-gray-700 uppercase text-xs ${headerClassName}`}
          >
            {allColumns.map((col) => (
              <th
                key={String(col.key)}
                className={`px-4 py-5 font-medium ${col.className} ${
                  showGridLine ? "border-b border-gray-300" : ""
                } ${col.sortable !== false ? "cursor-pointer hover:bg-gray-200" : ""}`}
                onClick={() => handleSort(col.key, col.sortable !== false)}
              >
                {col.key === "__selection" ? (
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    checked={
                      sortedData.length > 0 &&
                      selectedRows.length === sortedData.length
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        onSelectionChange?.(sortedData);
                      } else {
                        onSelectionChange?.([]);
                      }
                    }}
                  />
                ) : (
                  <div className="flex items-center">
                    <span>{col.label}</span>
                    {col.sortable !== false && (
                      <span className="ml-1">
                        {sortConfig.key === col.key ? (
                          sortConfig.direction === "asc" ? (
                            <FaSortUp className="text-gray-600" />
                          ) : (
                            <FaSortDown className="text-gray-600" />
                          )
                        ) : (
                          <FaSort className="text-gray-400" />
                        )}
                      </span>
                    )}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td
                className="py-5"
                colSpan={allColumns.length}
                style={{ textAlign: "center" }}
              >
                <div className="flex justify-center flex-col gap-2">
                  {/* <Spinner /> */}
                  <h1>Loading...</h1>
                </div>
              </td>
            </tr>
          )}
          {sortedData.length < 1 && !isLoading && (
            <tr>
              <td
                className="py-5"
                colSpan={allColumns.length}
                style={{ textAlign: "center" }}
              >
                Data Kosong...
              </td>
            </tr>
          )}
          {sortedData.length > 0 && !isLoading && (
            <>
              {sortedData.map((row, idx) => {
                const isSelected = selectedRows.some(
                  (selectedRow) =>
                    selectedRow[rowSelectionKey] === row[rowSelectionKey],
                );
                return (
                  <tr
                    key={idx}
                    className={`hover:bg-blue-200/20 ${isSelected ? "bg-blue-100" : ""}`}
                  >
                    {allColumns.map((col) => {
                      // Skip rendering the selection column's data cell since it's handled by the render function
                      if (col.key === "__selection") {
                        return (
                          <td
                            key={String(col.key)}
                            className={`px-4 py-5 ${col.className}`}
                          >
                            {col.render ? col.render(undefined, row) : null}
                          </td>
                        );
                      }

                      // Handle regular data columns
                      const value = col.key
                        .toString()
                        .split(".")
                        .reduce((acc, key) => acc?.[key], row);
                      return (
                        <td
                          key={String(col.key)}
                          style={col.style}
                          onClick={
                            onRowClick
                              ? () => onRowClick(row as any)
                              : undefined
                          }
                          className={`max-w-[200px] align-top break-words px-4 cursor-pointer py-5 ${idx < sortedData.length && showGridLine ? "border border-gray-200" : "border-b border-gray-200"} ${col.className}`}
                        >
                          {col.render
                            ? col.render(value as any, row)
                            : (value as any)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {addTableData}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}