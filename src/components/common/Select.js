import React from "react";

export default function Select({
  name,
  label,
  value,
  options,
  error,
  onChange,
}) {
  return (
    <div className="form-group">
      <div>
        <label htmlFor={name}>{label}</label>
      </div>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="form-label"
      >
        <option value="" />
        {options.map((option) => {
          return (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
