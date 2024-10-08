import React, { useEffect, useState } from "react"

export type SearchPropsType = {
  filter: string
  setFilter: Function
}

const Search = ({ filter, setFilter }: SearchPropsType) => {
  const handleChange = (e: React.SyntheticEvent<EventTarget>) => {
    const value = (e.target as HTMLInputElement).value
    setFilter(value)
  }

  return (
    <section className='search'>
      <div>
        <input
          type='text'
          id='text'
          name='dataSearch'
          value={filter}
          onChange={handleChange}
        />
      </div>
    </section>
  )
}

export default Search
