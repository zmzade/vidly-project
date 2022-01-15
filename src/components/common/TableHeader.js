import React from "react";

export default function TableHeader({ columns, onSort, sortedColumn }) {
  const raiseSort = (path) => {
    if (sortedColumn.path === path) {
      sortedColumn.order = sortedColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortedColumn.path = path;
      sortedColumn.order = "asc";
    }
    onSort(path);
  };

  const renderSortIcon = (column) => {
    if (!column.path) return;
    if (column.path !== sortedColumn.path) return null;
    if (sortedColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
            {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}
