import { useState, useEffect } from "react";
import positions from './mock-positions.json';
import Job from '../types/job';

type Props = {
  keyword?: string,
  id?: string
}

export function useJobs({ keyword, id }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [jobs, setJobs] = useState<Job[]>([]);
  // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  // const destUrl = id
  //   ? `https://jobs.github.com/positions/${id}.json`
  //   : `https://jobs.github.com/positions.json?search=${keyword}`;
  // const url = `${proxyUrl}${destUrl}`;

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setError('');
        // const res = await fetch(url);
        // const json = await res.json();
        const json = positions.slice(0, 5);
        setJobs(json);
      } catch (error) {
        setError("Failed to fetch");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  // }, [url]);
  }, []);
  return { jobs, isLoading, error };
}

export function useJob(id: string) {
  const { jobs, isLoading, error } = useJobs({ id });
  return { job: jobs, isLoading, error };
}
