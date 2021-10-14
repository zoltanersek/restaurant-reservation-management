import React from 'react';
import { useDrag } from 'react-dnd';
import {ReactComponent as Table} from "../../assets/table.svg"

import './layout-element.styles.scss'

const LayoutElement = ({tableNumber, location}) => {
    const [{isDragging}, drag, dragPreview] = useDrag(() => ({
        type: 'TABLE',
        item: {tableNumber, location},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    return (
        <div ref={dragPreview} style={{opacity: isDragging ? 0.5 : 1}}>
            <div ref={drag}>
                <div className='table-container'>
                    <Table />
                </div>
                <div className='table-number-container'>
                    #{tableNumber}
                </div>
            </div>
        </div>
    )
}

export default LayoutElement;