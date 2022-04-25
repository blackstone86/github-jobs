import { useState, useEffect } from 'react'
import Job from '../types/job'

type Props = {
  page: number // 当前页码 基于1
  pageSize: number // 每页条数
  id?: string // 职位id
  keyword?: string // 搜索关键字 对应职位记录的 title 字段
}

export function useJobs({ page, pageSize, id, keyword }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [jobs, setJobs] = useState<Job[]>([])
  const [total, setTotal] = useState<number>(0)
  const destUrl = id ? `/apis/job/${id}` : `/apis/job?search=${keyword}`
  const url = destUrl

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        setError('')
        const res = await fetch(url)
        const json = (await res.json()).slice(0, 3)
        setTotal(json.length)
        setJobs(json)
      } catch (error) {
        setError('Failed to fetch')
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [url])
  return { jobs, total, isLoading, error }
}

export function useJob(id: string, page = 1, pageSize = 1) {
  const { jobs, isLoading, error } = useJobs({ page, pageSize, id })
  return { job: jobs[0], isLoading, error }
}
