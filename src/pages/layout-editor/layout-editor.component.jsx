import React from "react";
import EditTable from "../../components/edit-table/edit-table.component";
import "./layout-editor.styles.scss";
import { useSelector } from "react-redux";
import { selectShowModal } from "../../redux/layout/layout.selectors";
import LayoutPreview from "../../components/layout-preview/layout-preview.component";
import { useDispatch } from "react-redux";
import { setActivePosition, setActiveTable, toggleLayoutModal } from "../../redux/layout/layout.actions";

const LayoutEditorPage = () => {
  const dispatch = useDispatch();
  const showModal = useSelector(selectShowModal);
  const emptyCellClickHandler = (position) => {
    dispatch(setActivePosition(position));
    dispatch(toggleLayoutModal());
  };

  const layoutElementClickHanlder = (table) => {
    dispatch(setActiveTable(table));
    dispatch(toggleLayoutModal());
  };

  return (
    <div>
      {showModal && <EditTable />}
      <LayoutPreview
        emptyCellClickHandler={emptyCellClickHandler}
        layoutElementClickHandler={layoutElementClickHanlder}
        draggable
      />
    </div>
  );
};

export default LayoutEditorPage;