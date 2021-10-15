import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import {ReactComponent as Table} from "../../assets/table.svg"
import { setActiveTable, toggleLayoutModal } from '../../redux/layout/layout.actions';

import './layout-element.styles.scss'

const LayoutElement = ({table}) => {
    const dispatch = useDispatch();
    const [{isDragging}, drag, dragPreview] = useDrag(() => ({
        type: 'TABLE',
        item: table,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }), [table])

    const showEditModal = () => {
        dispatch(setActiveTable(table));
        dispatch(toggleLayoutModal());
    }

    return (
        <div ref={dragPreview} style={{opacity: isDragging ? 0.5 : 1}} onClick={showEditModal}>
            <div ref={drag}>
                <div className='table-container'>
                    <Table />
                </div>
                <div className='table-number-container'>
                    <h4>Table #{table.number}</h4>
                    <span>{`${table.seats} seat${table.seats > 1 ? 's' : ''}`}</span>
                </div>
            </div>
        </div>
    )
}

export default LayoutElement;