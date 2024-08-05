import fetchData from "@/lib/api"
import { useEffect, useState } from "react"

const useFetchBreeds = () => {
  const [breeds, setBreeds] = useState<string[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown | null>(null)

  const fetchBreeds = async () => {
    setIsLoading(true)

    try {
      const responseBody = await fetchData(`/pet/breed`)
      setBreeds(responseBody)
    } catch (error) {
      setError(error)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchBreeds()
  }, [])

  return {
    data: breeds,
    isLoading,
    error
  }
}

export default useFetchBreeds