import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import EditReservation from "../../components/edit-reservation/edit-reservation.component";
import LayoutPreview from "../../components/layout-preview/layout-preview.component";
import { setActiveTableReservations, toggleReservationModal } from "../../redux/reservation/reservation.actions";
import { selectShowModal } from "../../redux/reservation/reservation.selectors";

const ReservationManagement = () => {
  const showModal = useSelector(selectShowModal);
  const dispatch = useDispatch();

  const layoutElementClickHanlder = (table) => {
      dispatch(setActiveTableReservations(table))
      dispatch(toggleReservationModal())
  }

  return (
    <div>
      {showModal && <EditReservation />}
      <LayoutPreview
        emptyCellClickHandler={() => {}}
        layoutElementClickHandler={layoutElementClickHanlder}
      />
    </div>
  );
};

export default ReservationManagement;
