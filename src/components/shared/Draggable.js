import React, { useState } from "react";

const Draggable = props => {
  const { children } = props;
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = e => {
    e.preventDefault();
    setIsDragging(true);
    console.log("start", e);
  };

  const handleDragEnd = e => {
    e.preventDefault();
    setIsDragging(false);
    console.log("end", e);
  };

  const handleDrag = e => {
    e.preventDefault();
    console.log("drag", e);
  };

  const handleDrop = e => {
    e.preventDefault();
    console.log("Dropped", item);
  };

  return children.map((child, idx) => {
    return (
      <div
        key={idx}
        draggable={true}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        style={{
          cursor: isDragging ? "grabbing" : "default",
        }}
      >
        {child}
      </div>
    );
  });
};

export default Draggable;
