import React from "react";
import EmptyCell from "../../components/empty-cell/empty-cell.component";
import LayoutElement from "../../components/layout-element/layout-element.component";
import "./layout-preview.styles.scss";
import { useSelector } from "react-redux";
import { selectTables } from "../../redux/layout/layout.selectors";
import DraggableLayoutElement from "../layout-element/draggable-layout-element.component";
import DroppableEmptyCell from "../empty-cell/droppable-empty-cell.component";

const LayoutPreview = ({
  draggable,
  emptyCellClickHandler,
  layoutElementClickHandler,
}) => {
  const tables = useSelector(selectTables);
  const allPositions = tables.map((it) => it.position);
  const tableAtPosition = (position) =>
    tables.find((it) => it.position === position);
  return (
    <div className="layout-container">
      {[...Array(150)].map((x, i) => (
        <div key={i} className="layout-element">
          {allPositions.includes(i) ? (
            <div className="cell" onClick={() => layoutElementClickHandler(tableAtPosition(i))}>
              {draggable ? (
                <DraggableLayoutElement
                  table={tableAtPosition(i)}
                  position={i}
                />
              ) : (
                <LayoutElement table={tableAtPosition(i)} position={i} />
              )}
            </div>
          ) : (
            <div className="cell" onClick={() => emptyCellClickHandler(i)}>
              {draggable ? (
                <DroppableEmptyCell position={i} />
              ) : (
                <EmptyCell position={i} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LayoutPreview;
