import React from "react"

export type SearchPropsType = {
  query: string
  setQuery: Function
}

export const Search = ({ query, setQuery }: SearchPropsType) => {
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
          placeholder='Search'
        />
      </div>
    </section>
  )
}
