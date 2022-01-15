import React from "react";
import Input from "./Input";

export default function SearchBox({ value, onChange }) {
  return (
    <Input
      type="text"
      onChange={(e) => onChange(e.target.value)}
      name="query"
      value={value}
      placeholder="Search ..."
      className="form-control my-3"
    />
  );
}
