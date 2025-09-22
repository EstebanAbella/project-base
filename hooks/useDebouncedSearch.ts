import { useState, useEffect, useMemo } from "react"

export const useDebouncedSearch = (data: any[], query: string, delay = 300) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [query, delay])

  const filteredResults = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return data
    }

    return data.filter((item) =>
      Object.values(item).some(
        (value) =>
          value !== null &&
          value !== undefined &&
          value.toString().toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    )
  }, [debouncedQuery, data])

  return filteredResults
}

// Implements

// const clients: any[] = [
//   { id: "1", name: "Cliente 1", pointOfSale: "POS 1", address: "Calle 1" },
//   { id: "2", name: "Cliente 2", pointOfSale: "POS 2", address: "Calle 2" },
//   { id: "3", name: "Cliente 3", pointOfSale: "POS 3", address: "Calle 3" },
// ]
// const [querySearch, setQuerySearch] = useState("")
// const filteredClients = useDebouncedSearch(clients, querySearch, 300)

// <section>
// <div>
//   <input
//     type='text'
//     placeholder='Buscar clientes'
//     value={querySearch}
//     onChange={(e) => setQuerySearch(e.target.value)}
//   />

//   <ul>
//     {filteredClients.map((client) => (
//       <li key={client.id}>
//         {client.name} - {client.pointOfSale} - {client.address}
//       </li>
//     ))}
//   </ul>
// </div>
// </section>
