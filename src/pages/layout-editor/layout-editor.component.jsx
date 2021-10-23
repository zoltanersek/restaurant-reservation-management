import React, { useEffect } from "react";
import EditTable from "../../components/edit-table/edit-table.component";
import "./layout-editor.styles.scss";
import { useSelector } from "react-redux";
import {
  selectLoading,
  selectShowModal,
} from "../../redux/layout/layout.selectors";
import LayoutPreview from "../../components/layout-preview/layout-preview.component";
import { useDispatch } from "react-redux";
import {
  fetchStart,
  setActivePosition,
  setActiveTable,
  toggleLayoutModal,
} from "../../redux/layout/layout.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const LayoutPreviewWithSpinner = WithSpinner(LayoutPreview);

const LayoutEditorPage = () => {
  const dispatch = useDispatch();
  const showModal = useSelector(selectShowModal);
  const isLoading = useSelector(selectLoading);
  useEffect(() => {
    dispatch(fetchStart());
  }, [dispatch]);

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
      <LayoutPreviewWithSpinner
        isLoading={isLoading}
        emptyCellClickHandler={emptyCellClickHandler}
        layoutElementClickHandler={layoutElementClickHanlder}
        draggable
      />
    </div>
  );
};

export default LayoutEditorPage;
