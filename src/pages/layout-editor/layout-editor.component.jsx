import React, { useState } from 'react';
import EmptyCell from '../../components/empty-cell/empty-cell.component';
import LayoutElement from '../../components/layout-element/layout-element.component';
import './layout-editor.styles.scss'

const initialState = [
    {
        tableNumber: 1,
        index: 0
    },
    {
        tableNumber: 2,
        index: 1
    },
    {
        tableNumber: 3,
        index: 2
    }
]

const LayoutEditorPage = () => {
    const [tables, setTables] = useState(initialState)

    const fullIndexes = tables.map(it => it.index)

    const getTableNumber = (index) => {
        return tables.find(it => it.index === index).tableNumber
    }

    const updateTables = (item, index) => {
        console.log("logged with", item, index)
        const newTables = [...tables.filter(it => it.tableNumber !== item.tableNumber), {tableNumber: item.tableNumber, index}]
        setTables(newTables)
    }
    return (
        <div className="layout-container">
            {[...Array(150)].map((x, i) =>
                <div key={i} className="layout-element">
                    {
                        fullIndexes.includes(i) ? <LayoutElement tableNumber={getTableNumber(i)} location={i} /> :
                         <EmptyCell updateTables={updateTables} index={i} />
                    }
                </div>
            )}
        </div>
    )
}

export default LayoutEditorPage;