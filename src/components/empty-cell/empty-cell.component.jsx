import React from 'react'
import { useDrop } from 'react-dnd'

import './empty-cell.styles.scss'

const EmptyCell = ({ updateTables, index }) => {
    const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
        accept: 'TABLE',
        drop: (item) => {
            updateTables(item, index)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }))
    return (
        <div style={{height: "100%", width: "100%", backgroundColor: isOver ? "GhostWhite" : "white"}}ref={dropRef}>
        </div>
    )
}

export default EmptyCell;