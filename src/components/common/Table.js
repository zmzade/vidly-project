import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export default function Table({ columns, onSort, sortedColumn, data }) {
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        onSort={onSort}
        sortedColumn={sortedColumn}
      />
      <TableBody data={data} columns={columns} />
    </table>
  );
}
