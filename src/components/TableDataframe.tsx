import React from "react";

interface TableDataframeProps {
  columns: string[];
  data: (string | number | object | null)[][];
}

const TableDataframe: React.FC<TableDataframeProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-700"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600"
                >
                  {/* Handle special rendering for complex data types */}
                  {Array.isArray(cell) ? (
                    <ul className="list-disc list-inside">
                      {cell.map((item, idx) => (
                        <li key={idx}>{JSON.stringify(item)}</li>
                      ))}
                    </ul>
                  ) : typeof cell === "object" && cell !== null ? (
                    <pre className="text-xs">{JSON.stringify(cell, null, 2)}</pre>
                  ) : (
                    cell?.toString() || "—"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDataframe;
