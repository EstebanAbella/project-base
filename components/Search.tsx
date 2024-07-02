import React, { useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import {
  resetSearch,
  setSearchClients,
  setSearchSeller,
} from '../redux/search/actions'

const mapStateToProps = (state: RootState) => {
  const searchReducer = state.search
  return {
    surveySellerSearchStatus: searchReducer.surveySellerSearchStatus,
  }
}

const mapDispatchToProps = {
  setSearchSeller,
  setSearchClients,
  resetSearch,
}

export type SearchType = 'SELLER' | 'CLIENTS'

type SearchPropsType = {
  data: any
  searchType: SearchType
  searchString: string
  setStateSearch: (e: boolean) => void
  resetSearch: Function
  setSearchSeller: Function
  setSearchClients: Function
}

const Search = ({
  data,
  searchType,
  searchString,
  setStateSearch,
  resetSearch,
  setSearchSeller,
  setSearchClients,
}: SearchPropsType) => {
  const [form, setForm] = useState({ search: searchString })

  const handleChange = (e: React.SyntheticEvent<EventTarget>) => {
    const name = (e.target as HTMLInputElement).name
    const value = (e.target as HTMLInputElement).value
    setForm({ ...form, [name]: value })
    if (form.search.length - 1 === 0) {
      setStateSearch(true)
      resetSearch()
    }
  }

  const handleClick = () => {
    if (form.search.length >= 2) {
      setStateSearch(false)
      switch (searchType) {
        case 'SELLER':
          resetSearch()
          setSearchSeller(data, form.search)
          break
        case 'CLIENTS':
          setSearchClients(data, form.search)
          break
      }
    }
  }

  return (
    <section className="search">
      <form>
        <div className="textField">
          <input
            type={'text'}
            name="search"
            value={form.search}
            placeholder="Buscar"
            required
            onChange={handleChange}
            className={`input`}
          />
          <span
            className={`icon-search ${form.search.length < 2 ? 'empty' : ''}`}
            id={'icon'}
            onClick={handleClick}
          ></span>
        </div>
      </form>
    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
