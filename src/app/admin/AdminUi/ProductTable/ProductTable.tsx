"use client";
import { SquarePen, Trash2 } from "lucide-react";
import React, { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
}

interface DynamicTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit: (item: T) => void;
  handleDelete: (item: T) => void;
}

const ProductTable = <T,>({
  columns,
  data,
  handleDelete,
  onEdit,
}: DynamicTableProps<T>) => {
  return (
    <>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns?.map((col, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left font-medium text-gray-700"
                >
                  {col.header}
                </th>
              ))}
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((col, colIndex) => {
                  let cellContent: ReactNode;

                  if (typeof col.accessor === "function") {
                    cellContent = col.accessor(item);
                  } else {
                    cellContent = item[col.accessor] as ReactNode;
                  }

                  return (
                    <td
                      key={colIndex}
                      className="px-4 py-3 text-gray-600 whitespace-nowrap"
                    >
                      {cellContent}
                    </td>
                  );
                })}
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-1.5 rounded-md  transition-colors cursor-pointer"
                      aria-label="Edit"
                    >
                      <SquarePen className="text-md" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-1.5 rounded-md text-red-600 transition-colors cursor-pointer"
                      aria-label="Delete"
                    >
                      <Trash2 className="text-md" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data?.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ProductTable;
