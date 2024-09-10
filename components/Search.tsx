import React, { useEffect, useState } from "react"

export type SearchPropsType = {
    offsetState: number
    limit: number
    query?: string
    filter: string
    order?: string
    setFilter: Function
    searchOn: Function
    id?: number | string
    setOffsetState: Function
}

const Search = ({filter, setFilter, offsetState, limit, query, order, searchOn, id, setOffsetState}: SearchPropsType) => {
    const [initialRender, setInitialRender] = useState<boolean>(true)

    useEffect(() => {
        if(!initialRender) {
          setOffsetState(0)
          const loadData = async () => {
            try {
              if(id) {
                  await searchOn(
                    id,
                    offsetState,
                    limit,
                    query ?? '',
                    filter,
                    order ?? ''
                )
              } else {
                  await searchOn(
                    offsetState,
                    limit,
                    query ?? '',
                    filter,
                    order ?? ''
                  )
              }
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
          loadData()
        }
        setInitialRender(false)
      }, [filter])

    const handleChange = (e: React.SyntheticEvent<EventTarget>) => {
		const value = (e.target as HTMLInputElement).value
		setFilter(value)
		console.log(filter)
	}

    return(
        <section>
            <div>
                <input type="text" id="text" name="dataSearch" value={filter} onChange={handleChange} />
            </div>
        </section>
    )
}

export default Search