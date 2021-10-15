import React, { useState } from 'react';
import EmptyCell from '../../components/empty-cell/empty-cell.component';
import LayoutElement from '../../components/layout-element/layout-element.component';
import EditTableModal from '../../components/edit-table-modal/edit-table-modal.component';
import './layout-editor.styles.scss'
import { useSelector } from 'react-redux';
import { selectShowModal, selectTables } from '../../redux/layout/layout.selectors';

const LayoutEditorPage = () => {
    const tables = useSelector(selectTables)
    const showModal = useSelector(selectShowModal)
    const allPositions = tables.map(it => it.position)
    const tableAtPosition = (position) => tables.find(it => it.position === position)
    return (
        <div>
            {showModal && <EditTableModal />}
            <div className="layout-container">
                {[...Array(150)].map((x, i) =>
                    <div key={i} className="layout-element">
                        {
                            allPositions.includes(i) ? <LayoutElement table={tableAtPosition(i)} position={i} /> :
                                <EmptyCell position={i} />
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default LayoutEditorPage;