import { useState, useEffect } from 'react'
import axios from 'axios'
import Job from '../types/job'

type Props = {
  page: number // 当前页码 基于1
  pageSize: number // 每页条数
  id?: string // 职位id
  keyword?: string // 搜索关键字 对应职位记录的 title 字段
}

export function useJobs({ page = 1, pageSize = 10, id, keyword }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [jobs, setJobs] = useState<Job[]>([])
  const [total, setTotal] = useState<number>(0)
  const api = id ? `/apis/job/${id}` : '/apis/job'
  type Params = null | {
    page: number
    pageSize: number
    search?: string
  }
  let params: Params = id
    ? null
    : {
        page,
        pageSize,
        search: keyword
      }
  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      setError('')
      axios
        .get(api, {
          params
        })
        .then(({ data }) => {
          const jobs = data.slice(0, 3)
          setTotal(jobs.length)
          setJobs(jobs)
        })
        .catch((error) => {
          setError('Failed to fetch')
        })
        .then(() => {
          setIsLoading(false)
        })
    }
    loadData()
  }, [id, page, pageSize, keyword])
  return { jobs, total, isLoading, error }
}

export function useJob(id: string, page = 1, pageSize = 1) {
  const { jobs, isLoading, error } = useJobs({ page, pageSize, id })
  return { job: jobs[0], isLoading, error }
}
