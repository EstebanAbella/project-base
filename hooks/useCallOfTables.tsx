import React, { useEffect, useState } from "react"

export type CallOfTablePropsType = {
  action: Function
  id?: number | string
  offsetState: number
  limit: number
  query?: string
  filter?: string
  order?: string
  roles?: string
  setOffsetState: Function
}

export const UseCallOfTables = ({
  id,
  offsetState,
  limit,
  query,
  filter,
  order,
  roles,
  action,
  setOffsetState,
}: CallOfTablePropsType) => {
  const [initialRender, setInitialRender] = useState<boolean>(true)

  useEffect(() => {
    setOffsetState(0)
    setInitialRender(true)
  }, [query])

  useEffect(() => {
    if (!initialRender) {
      const loadData = async () => {
        try {
          if (id) {
            await action(
              id,
              offsetState,
              limit,
              query ?? "",
              filter ?? "",
              order ?? "",
              roles ?? ""
            )
          } else {
            await action(
              offsetState,
              limit,
              query ?? "",
              filter ?? "",
              order ?? "",
              roles ?? ""
            )
          }
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
      loadData()
    }
    setInitialRender(false)
  }, [offsetState, query, filter])
}
