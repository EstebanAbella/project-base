import React, { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import ModalTable from "./ModalTable"
import styles from "./Table.module.scss"
import router from "next/router"

type TableProps = {
  columns: Array<{ name: string; id: string }>
  data: Array<{ [key: string]: any }>
  handleClickOnModal: (action: string, id: string) => void
}

const Table: React.FC<TableProps> = ({ columns, data, handleClickOnModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [visibleColumns, setVisibleColumns] = useState(columns)
  const [columnVisibility, setColumnVisibility] = useState(
    columns.reduce(
      (acc, col) => ({ ...acc, [col.id]: true }),
      {} as { [key: string]: boolean }
    )
  )

  const handleToggleColumnVisibility = (id: string) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [id]: !prevVisibility[id],
    }))
  }

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const reorderArray = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return
    const reorderedColumns = reorderArray(
      visibleColumns,
      result.source.index,
      result.destination.index
    )
    setVisibleColumns(reorderedColumns)
  }

  const mapContentTd = (row: any, col: any) => {
    const content = Array.isArray(row[col.id])
      ? row[col.id].every((item: any) => typeof item === "string")
        ? row[col.id].join(", ")
        : row[col.id]
            .map((item: any) =>
              typeof item === "object"
                ? Object.entries(item)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(", ")
                : item
            )
            .join(", ")
      : typeof row[col.id] === "object"
        ? JSON.stringify(row[col.id], null, 2)
        : row[col.id]

    return content
  }

  return (
    <div className={styles.tableContainer}>
      <table className={`${styles.table}`}>
        <thead>
          <tr>
            {visibleColumns.map(
              (col) =>
                columnVisibility[col.id] && <th key={col.id}>{col.name}</th>
            )}
            <th className={`${styles.columnSmall}`}>Actions</th>
            <th className={`${styles.columnSmall}`}>
              <div className={`${styles.columnSmallIcon}`}>
                <span
                  className='icon-config'
                  onClick={handleOpenModal}
                  role='button'
                  aria-label='Configure columns'
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleOpenModal()
                    }
                  }}
                ></span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {visibleColumns.map(
                (col) =>
                  columnVisibility[col.id] && (
                    <td key={col.id}>
                      <div
                        className={`${styles.tdContent}`}
                        title={mapContentTd(row, col)}
                      >
                        {mapContentTd(row, col)}
                      </div>
                    </td>
                  )
              )}
              <td>
                <div className={`${styles.containerButtonTable}`}>
                  <span
                    className={`icon-pencil ${styles.iconActions}`}
                    onClick={() =>
                      router.push(`/botTrainingSelected/update/${row.id}`)
                    }
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        router.push(`/botTrainingSelected/update/${row.id}`)
                      }
                    }}
                    aria-label='Update'
                  ></span>
                  <span
                    className={`icon-bin ${styles.iconActions}`}
                    onClick={() =>
                      handleClickOnModal("delete", row.id.toString())
                    }
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleClickOnModal("delete", row.id.toString())
                      }
                    }}
                    aria-label='Delete'
                  ></span>
                </div>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <ModalTable onClose={handleCloseModal}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId='columns' direction='vertical'>
              {(provided) => (
                <ul
                  className={styles.columnList}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {visibleColumns.map((col, index) => (
                    <Draggable key={col.id} draggableId={col.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={styles.columnListItem}
                        >
                          <span>{col.name}</span>
                          <span
                            className={
                              columnVisibility[col.id]
                                ? "icon-eye"
                                : "icon-eye-off"
                            }
                            onClick={() => handleToggleColumnVisibility(col.id)}
                            role='button'
                            aria-label='Toggle column visibility'
                            tabIndex={0}
                          ></span>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </ModalTable>
      )}
    </div>
  )
}

export default Table
