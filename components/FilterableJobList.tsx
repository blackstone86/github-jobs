import React, { useEffect } from 'react'
import { useState } from 'react'
import { JobList } from './JobList'
import { SearchForm } from './SearchForm'
import { Header } from './Header'
import { Pagination } from './Pagination'
import { useJobs } from './useJobs'

type FiltersProps = {
  onChange?: (fullTime: boolean, location: string) => void
}

function Filters({ onChange }: FiltersProps) {
  const locations = ['London', 'Amsterdam', 'New York', 'Berlin']
  const [fullTime, setfullTime] = useState<boolean>(false)
  const [location, setLocation] = useState<string>('')

  function dispatchChange(ft: boolean, lc: string) {
    typeof onChange === 'function' && onChange(ft, lc)
  }

  return (
    <div className="filters">
      <label>
        <input
          type="checkbox"
          checked={fullTime}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setfullTime(e.target.checked)
            dispatchChange(e.target.checked, location)
          }}
        />
        Full time
      </label>
      <label>
        <div className="location-title">LOCATION</div>
        <input type="search" />
      </label>
      <fieldset
        onChange={(e: React.ChangeEvent<HTMLFieldSetElement>) => {
          const el = e.target as unknown as HTMLInputElement
          setLocation(el.value)
          dispatchChange(fullTime, el.value)
        }}
      >
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
  const [fullTime, setFullTime] = useState<boolean>(true)
  const [location, setLocation] = useState<string>('')
  const { jobs, total, isLoading, error } = useJobs({
    page,
    pageSize,
    keyword,
    fullTime,
    location
  })

  return (
    <div className="job-list">
      <Header>
        <SearchForm onKeywordChange={(k: string) => setKeyword(k)} />
      </Header>
      <Filters
        onChange={(ft: boolean, lc: string) => {
          setFullTime(ft)
          setLocation(lc)
        }}
      />
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <JobList jobs={jobs} isLoading={isLoading}>
          <Pagination
            total={total}
            onChange={(p: number, ps: number) => {
              setPage(p)
              setPageSize(ps)
            }}
          />
        </JobList>
      )}
    </div>
  )
}
