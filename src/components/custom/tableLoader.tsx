import React from "react";

interface TableLoaderProps {
  col: number;
  rows: number;
  isHeader?: boolean;
}

const TableLoader: React.FC<TableLoaderProps> = ({
  rows = 6,
  col = 5,
  isHeader = true,
}) => {
  // Create the grid style dynamically
  const gridTemplateColumns = `repeat(${col}, minmax(0, 1fr))`;

  return (
    <>
      {/* It is used for table header loading------------  */}
      {isHeader ? (
        <div className="rounded-lg border">
          <div
            className="grid gap-4 bg-gray-100 p-4 dark:bg-gray-800"
            style={{ gridTemplateColumns }}
          >
            {Array.from({ length: col }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="h-5 w-full animate-pulse rounded-md bg-gray-300 dark:bg-gray-700"
              />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}

      {/* It is used for table body loader------------------  */}
      <div className="space-y-4 p-4">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-4"
            style={{ gridTemplateColumns }}
          >
            {Array.from({ length: col }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="h-6 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-600"
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default TableLoader;
