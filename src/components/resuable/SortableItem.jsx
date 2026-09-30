import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem(props) {
  const {
    children,
    className = "",
    style: styleProp = {},
    disableSortAnimation = false,
    showGrabCursor = false,
  } = props;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.id,
    // avoids the dragged/neighboring items animating back to their original slot after drop
    transition: disableSortAnimation ? null : undefined,
  });

  const style = {
    ...styleProp,
    transform: CSS.Transform.toString(transform),
    transition,
    ...(showGrabCursor ? { cursor: isDragging ? "grabbing" : "grab" } : {}),
    ...(isDragging ? { cursor: "grabbing" } : {}),
  };

  return (
    <div ref={setNodeRef} style={style} className={className} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
