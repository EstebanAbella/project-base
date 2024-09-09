import React, { useEffect, useState } from 'react'
import Button, { ButtonType } from './Button'


interface PaginationProps {
  fetchData: any
  id?: number | string
  offsetState: number
  limit: number
  totalItems: number
  setOffsetState: Function
}

const Pagination = ({ id, offsetState, limit, totalItems, fetchData, setOffsetState }: PaginationProps) => {
  const [initialRender, setInitialRender] = useState<boolean>(true)

  useEffect(() => {
    if(!initialRender) {
      const loadData = async () => {
        try {
          if(id) {
              await fetchData(id, offsetState, limit);
          } else {
              await fetchData(offsetState, limit);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      loadData()
    }
    setInitialRender(false)
  }, [offsetState])

  const handleNext = () => {
    if(offsetState  <= totalItems) {
      setOffsetState(offsetState + limit)
    }
  }

  const handlePrevious = () => {
    if (offsetState > 0) {
      setOffsetState(offsetState - limit)
    }
  }

  return (
    <section className={'container'}>
      <div className={'paginationControls'}>
        <Button
          type={offsetState === 0 ? ButtonType.SECONDARY : ButtonType.PRIMARY}
          value="<" onClick={handlePrevious}
          disabled={offsetState === 0}
        />
        {<p className={`${offsetState === 0 ? 'nonePoint' : ''}`}>...</p>}
        <p className={'pageInfo'}>{`${offsetState / limit + 1}`}</p>
        {<p className={`${offsetState + limit >= totalItems || totalItems < limit ? 'nonePoint' : ''}`}>...</p>}
        <Button
          type={offsetState + limit >= totalItems || totalItems < limit ? ButtonType.SECONDARY : ButtonType.PRIMARY}
          value=">" onClick={handleNext}
          disabled={offsetState + limit >= totalItems || totalItems < limit}
        />
      </div>
    </section>
  )
}

export default Pagination