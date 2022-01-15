import React from "react";

export default function ListGroup({ items, selectedItem, onItemSelect }) {
  return (
    <ul className="list-group">
      <li
        className={
          selectedItem === "allGenres"
            ? "list-group-item active"
            : "list-group-item"
        }
        onClick={() => onItemSelect("allGenres")}
        style={{ cursor: "pointer" }}
      >
        All Genres
      </li>
      {items.map((item) => (
        <li
          key={item._id}
          className={
            selectedItem === item ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
          style={{ cursor: "pointer" }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
