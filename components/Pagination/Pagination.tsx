import React from "react"
import { Button, ButtonType } from "../Button/Button"

interface PaginationPropsType {
  offsetState: number
  limit: number
  totalItems: number
  setOffsetState: Function
}

export const Pagination = ({
  offsetState,
  limit,
  totalItems,
  setOffsetState,
}: PaginationPropsType) => {
  const handleNext = () => {
    if (offsetState <= totalItems) {
      setOffsetState(offsetState + limit)
    }
  }

  const handlePrevious = () => {
    if (offsetState > 0) {
      setOffsetState(offsetState - limit)
    }
  }

  return (
    <section className={"container"}>
      <div className={"paginationControls"}>
        <Button
          type={offsetState === 0 ? ButtonType.SECONDARY : ButtonType.PRIMARY}
          value='<'
          onClick={handlePrevious}
          disabled={offsetState === 0}
        />
        {<p className={`${offsetState === 0 ? "nonePoint" : ""}`}>...</p>}
        <p className={"pageInfo"}>{`${offsetState / limit + 1}`}</p>
        {
          <p
            className={`${offsetState + limit >= totalItems || totalItems < limit ? "nonePoint" : ""}`}
          >
            ...
          </p>
        }
        <Button
          type={
            offsetState + limit >= totalItems || totalItems < limit
              ? ButtonType.SECONDARY
              : ButtonType.PRIMARY
          }
          value='>'
          onClick={handleNext}
          disabled={offsetState + limit >= totalItems || totalItems < limit}
        />
      </div>
    </section>
  )
}
