import React from "react";
import { useDrag } from "react-dnd";
import LayoutElement from "./layout-element.component";

const DraggableLayoutElement = ({ table, ...otherProps }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: "TABLE",
      item: table,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [table]
  );

  return (
    <div
      ref={dragPreview}
      style={{ opacity: isDragging ? 0.5 : 1, width: "100%", height: "100%" }}
    >
      <div ref={drag}>
        <LayoutElement table={table} {...otherProps} />
      </div>
    </div>
  );
};

export default DraggableLayoutElement;
