import { useState, useEffect } from 'react'
import Job from '../types/job'

type Props = {
  keyword?: string
  id?: string
}

export function useJobs({ keyword, id }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [jobs, setJobs] = useState<Job[]>([])
  const destUrl = id ? `/apis/job/${id}` : `/apis/job?search=${keyword}`
  const url = destUrl

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        setError('')
        const res = await fetch(url)
        const json = await res.json()
        // const json = ps.slice(0, 5);
        setJobs(json)
      } catch (error) {
        setError('Failed to fetch')
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [url])
  return { jobs, isLoading, error }
}

export function useJob(id: string) {
  const { jobs, isLoading, error } = useJobs({ id })
  return { job: jobs[0], isLoading, error }
}
