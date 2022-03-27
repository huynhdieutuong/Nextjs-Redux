import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'

const SearchBar: FC = () => {
  const [searchText, setSearchText] = useState('')
  const router = useRouter()

  const handleSearch = (e: any) => {
    e.preventDefault()
    router.push(`/search?text=${searchText}`)
  }

  return (
    <div className='ass1-header__search'>
      <form action='#' onSubmit={handleSearch}>
        <label>
          <input
            type='search'
            name='search-text'
            className='form-control'
            placeholder='Input keyword ...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <i className='icon-Search' onClick={handleSearch} />
        </label>
      </form>
    </div>
  )
}

export default SearchBar
