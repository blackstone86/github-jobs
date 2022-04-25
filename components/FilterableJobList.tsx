import React, { useEffect } from 'react'
import { useState } from 'react'
import { JobList } from './JobList'
import { SearchForm } from './SearchForm'
import { Header } from './Header'
import { Pagination } from './Pagination'
import { useJobs } from './useJobs'

function Filters() {
  const locations = ['London', 'Amsterdam', 'New York', 'Berlin']
  return (
    <div className="filters">
      <label>
        <input type="checkbox" />
        Full time
      </label>
      <label>
        <div className="location-title">LOCATION</div>
        <input type="search" />
      </label>
      <fieldset>
        {locations.map((location) => (
          <label key={location}>
            <input type="radio" value={location} name="location" />
            {location}
          </label>
        ))}
      </fieldset>
    </div>
  )
}

export function FilterableJobList() {
  const [keyword, setKeyword] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const { jobs, total, isLoading, error } = useJobs({ page, pageSize, keyword })

  return (
    <div className="job-list">
      <Header>
        <SearchForm onKeywordChange={(k: string) => setKeyword(k)} />
      </Header>
      <Filters />
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <JobList jobs={jobs} isLoading={isLoading}>
          <Pagination
            total={total}
            onChange={(page: number, pageSize: number) => {
              // console.log(page, pageSize)
              setPage(page)
              setPageSize(pageSize)
            }}
          />
        </JobList>
      )}
    </div>
  )
}
