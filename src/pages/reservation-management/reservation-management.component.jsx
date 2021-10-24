import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import EditReservation from "../../components/edit-reservation/edit-reservation.component";
import LayoutPreview from "../../components/layout-preview/layout-preview.component";
import PersistStatus from "../../components/persist-status/persist-status.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { fetchStart } from "../../redux/layout/layout.actions";
import { selectLoading } from "../../redux/layout/layout.selectors";
import {
  reservationFetchStart,
  reservationPersistStart,
  setActiveTableReservations,
  toggleReservationModal,
} from "../../redux/reservation/reservation.actions";
import {
  selectReservationLoading,
  selectReservationPersistError,
  selectReservationPersisting,
  selectShowModal,
} from "../../redux/reservation/reservation.selectors";

const LayoutPreviewWithSpinner = WithSpinner(LayoutPreview);

const ReservationManagement = () => {
  const showModal = useSelector(selectShowModal);
  const dispatch = useDispatch();
  const isTableLoading = useSelector(selectLoading);
  const isReservationLoading = useSelector(selectReservationLoading);
  const isPersisting = useSelector(selectReservationPersisting);
  const persistError = useSelector(selectReservationPersistError);

  useEffect(() => {
    dispatch(fetchStart());
    dispatch(reservationFetchStart());
  }, [dispatch]);

  const layoutElementClickHanlder = (table) => {
    dispatch(setActiveTableReservations(table));
    dispatch(toggleReservationModal());
  };

  return (
    <div>
      {showModal && <EditReservation />}
      <PersistStatus
        persisting={isPersisting}
        persistError={persistError}
        onRetry={() => dispatch(reservationPersistStart())}
      />
      <LayoutPreviewWithSpinner
        isLoading={isTableLoading || isReservationLoading}
        emptyCellClickHandler={() => {}}
        layoutElementClickHandler={layoutElementClickHanlder}
      />
    </div>
  );
};

export default ReservationManagement;
