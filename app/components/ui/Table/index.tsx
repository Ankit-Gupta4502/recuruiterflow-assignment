import React from "react";
import { classNameMerger } from "~/utils";

export type Column<T> = {
  key: string;
  label: string;
  accessor: (item: T) => React.ReactNode;
};

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  getRowId: (item: T) => string | number;
  containerClassName?: string;
  tableClassName?: string;
  isLoading?: boolean;
}

function Table<T>({
  data,
  columns,
  getRowId,
  containerClassName = "",
  tableClassName = "",
  isLoading = false,
}: TableProps<T>) {

  const renderRows = () => {
    if (isLoading) {
      return (
        <tr className="h-20 animate-pulse">
          <td colSpan={columns.length} className=" text-center">
            Loading...
          </td>
        </tr>
      );
    }

    if (data.length === 0) {
      return (
        <tr className="h-20 text-center">
          <td colSpan={columns.length} className=" text-center">
            No data found
          </td>
        </tr>
      );
    }

    return data.map((item) => (
      <tr key={getRowId(item)} className="hover:bg-gray-50 transition">
        {columns.map((column) => (
          <td key={column.key} className="px-4 py-3 text-gray-700">
            {column.accessor(item)}
          </td>
        ))}
      </tr>
    ));
  };
  
  return (
    <div
      className={classNameMerger(
        "max-w-6xl container mx-auto mt-6 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden",
        containerClassName
      )}
    >
      <table
        className={classNameMerger(
          "w-full table-fixed text-sm",
          tableClassName
        )}
      >
        <thead className="bg-gray-50 border-b border-b-gray-200">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left font-medium text-gray-600"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
