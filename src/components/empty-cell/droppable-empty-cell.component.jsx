import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { updateTablePosition } from "../../redux/layout/layout.actions";
import EmptyCell from "./empty-cell.component";

const DroppableEmptyCell = ({ position, ...otherProps }) => {
  const dispatch = useDispatch();
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "TABLE",
    drop: (item) => {
      dispatch(updateTablePosition(item, position));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      style={{
        backgroundColor: isOver ? "GhostWhite" : "white",
        height: "100%",
        width: "100%",
      }}
      ref={dropRef}
    >
      <EmptyCell {...otherProps} />
    </div>
  );
};

export default DroppableEmptyCell;
