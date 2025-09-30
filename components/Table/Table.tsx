"use client"
import React, { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useRouter } from "next/navigation"
import { ModalTable } from "./ModalTable"
import { Search } from "../Search"
import { FilterSearchIn } from "../FilterSearchIn"

type TableProps = {
  columns: Array<{
    name: string
    id: string
    isLink?: boolean
    linkBasePath?: string
  }>
  data: Array<{ [key: string]: any }>
  haveActions?: boolean
  actions?: {
    onEdit: (row: any) => void
    onDelete: (row: any) => void
  }
  isSearch?: boolean
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  haveActions = true,
  actions,
  isSearch = false,
}) => {
  //
  const router = useRouter()
  const [query, setQuery] = useState<string>("")
  const [filter, setFilter] = useState<string>("")
  const filterOptions = columns.map((col) => ({
    id: col.id,
    name: col.name,
  }))
  const [filteredData, setFilteredData] =
    useState<Array<{ [key: string]: any }>>(data)

  useEffect(() => {
    const getFilteredData = () => {
      if (!query || !filter) return setFilteredData(data)

      const dataFilter = data.filter((row) => {
        const value = row[filter]
        if (typeof value === "string") {
          return value.toLowerCase().includes(query.toLowerCase())
        } else if (typeof value === "number") {
          return value.toString().includes(query)
        } else if (Array.isArray(value)) {
          return value.join(" ").toLowerCase().includes(query.toLowerCase())
        } else if (typeof value === "object" && value !== null) {
          return JSON.stringify(value)
            .toLowerCase()
            .includes(query.toLowerCase())
        }
        return false
      })

      setFilteredData(dataFilter)
    }

    getFilteredData()
  }, [query, filter])
  //
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
    const value = row[col.id]
    if (typeof value === "number") {
      return new Intl.NumberFormat("es-ES", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(value)
    }
    const content = Array.isArray(value)
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
    <>
      {isSearch && (
        <div className='ContainerFilterSearchInTable'>
          <Search query={query} setQuery={setQuery} />
          <FilterSearchIn filterOptions={filterOptions} setFilter={setFilter} />
        </div>
      )}
      <div className='tableContainer'>
        <table className='table table-striped custom-bg'>
          <thead className='table-dark tableTheadComparison'>
            <tr>
              {visibleColumns.map(
                (col) =>
                  columnVisibility[col.id] && <th key={col.id}>{col.name}</th>
              )}
              {haveActions && <th className='columnSmall'>Actions</th>}
              <th className={`columnSmall`}>
                <div className={`columnSmallIcon`}>
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
            {filteredData?.map((row, index) => (
              <tr key={index}>
                {visibleColumns.map(
                  (col) =>
                    columnVisibility[col.id] && (
                      <td key={col.id}>
                        <div
                          className={`tdContent`}
                          title={mapContentTd(row, col)}
                          {...(col.isLink && col.linkBasePath
                            ? {
                                onClick: () =>
                                  router.push(`${col.linkBasePath}/${row.id}`),
                                style: { cursor: "pointer" },
                              }
                            : {})}
                        >
                          {mapContentTd(row, col)}
                        </div>
                      </td>
                    )
                )}
                {haveActions && (
                  <td>
                    <div className={`containerButtonTable`}>
                      {actions?.onEdit && (
                        <span
                          className={`icon-pencil iconActions`}
                          onClick={() => actions.onEdit(row)}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") actions.onEdit(row)
                          }}
                          aria-label='Update'
                        ></span>
                      )}
                      {actions?.onDelete && (
                        <span
                          className={`icon-bin iconActions`}
                          onClick={() => actions.onDelete(row)}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") actions.onDelete(row)
                          }}
                          aria-label='Delete'
                        ></span>
                      )}
                    </div>
                  </td>
                )}
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
                    className='columnList'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {visibleColumns.map((col, index) => (
                      <Draggable
                        key={col.id}
                        draggableId={col.id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className='columnListItem'
                          >
                            <span>{col.name}</span>
                            <span
                              className={
                                columnVisibility[col.id]
                                  ? "icon-eye"
                                  : "icon-eye-off"
                              }
                              onClick={() =>
                                handleToggleColumnVisibility(col.id)
                              }
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
    </>
  )
}
