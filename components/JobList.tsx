import React, { ReactNode } from 'react'
import Link from 'next/link'
import Job from '../types/job'

function JobCard({
  type,
  company,
  company_logo,
  location,
  title,
  created_at,
  id
}: Job) {
  return (
    <Link href={`/jobs/${id}`}>
      <article className="job-card">
        <img className="logo" src={company_logo} />
        <div className="company">{company}</div>
        <div className="title">{title}</div>
        <div className="type">{type}</div>
        <div className="location">{location}</div>
        <div className="created-at">{created_at}</div>
      </article>
    </Link>
  )
}

type LoadingCardsProps = {
  count: number
}

function LoadingCards({ count }: LoadingCardsProps) {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, idx) => (
          <article key={idx} className="job-card">
            <div className="logo loading-logo loading" />
            <div className="company loading"> </div>
            <div className="title loading"> </div>
            <div className="company loading"> </div>
          </article>
        ))}
    </>
  )
}

type JobListProps = {
  jobs: Job[]
  isLoading: boolean
  children?: ReactNode
}

export function JobList({ jobs, isLoading, children }: JobListProps) {
  return (
    <div className="results">
      {isLoading ? (
        <LoadingCards count={5} />
      ) : jobs.length === 0 ? (
        'No results'
      ) : (
        jobs.map((job) => <JobCard {...job} key={job.id} />)
      )}
      <div className="results-pagination">{children}</div>
    </div>
  )
}
