import React from "react";

export default function Like({ onLike, liked }) {
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";
  return (
    <div>
      <i
        onClick={onLike}
        className={classes}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
      ></i>
    </div>
  );
}
