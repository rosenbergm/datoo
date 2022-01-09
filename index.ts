import {useState, useEffect} from 'react'

interface GetOptions {
  fetchOptions: RequestInit
  runAutomatically: boolean
}

export const useGetData = <T,>(url: string, decoder: (data: unknown) => (T | null), options?: GetOptions)  => {
  const [isLoading, setLoading] = useState(options?.runAutomatically ?? true)
  const [data, setData] = useState<T | null>(null)

  const setAndDecode = (data: unknown) => setData(decoder(data))

  useEffect(() => {
    setLoading(true)

    fetch(url, {
      method: 'GET',
      ...options?.fetchOptions
    })
      .then(setAndDecode)
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [])

  return {
    isLoading,
    data
  }
}

