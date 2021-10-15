import React from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { setActivePosition, toggleLayoutModal, updateTablePosition } from '../../redux/layout/layout.actions'

import './empty-cell.styles.scss'

const EmptyCell = ({position}) => {
    const dispatch = useDispatch();
    const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
        accept: 'TABLE',
        drop: (item) => {
            dispatch(updateTablePosition(item, position))
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }))

    const showCreateModal = () => {
        dispatch(setActivePosition(position))
        dispatch(toggleLayoutModal())
    }

    return (
        <div style={{height: "100%", width: "100%", backgroundColor: isOver ? "GhostWhite" : "white"}}
         ref={dropRef}
        onClick={showCreateModal}>
        </div>
    )
}

export default EmptyCell;