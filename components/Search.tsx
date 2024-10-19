import React, { useEffect, useState } from "react"

export type SearchPropsType = {
  query: string
  setQuery: Function
}

const Search = ({ query, setQuery }: SearchPropsType) => {
  const handleChange = (e: React.SyntheticEvent<EventTarget>) => {
    const value = (e.target as HTMLInputElement).value
    setQuery(value)
  }

  return (
    <section className='search'>
      <div>
        <input
          type='text'
          id='text'
          name='dataSearch'
          value={query}
          onChange={handleChange}
        />
      </div>
    </section>
  )
}

export default Search
