import fetchData from "@/lib/api"
import { useEffect, useState } from "react"

type Pet = {
  id: string
  name: string
  breed: string
  age: number
  contactId: string
  hubSpotId: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

type PetsPagination = {
  items: Pet[]
  totalItems: number
  totalPages: number
  currentPage: number
  pageSize: number
}

const useFetchPets = () => {
  const [petsPagination, setPetsPagination] = useState<PetsPagination>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown | null>(null)

  const fetchPets = async () => {
    setIsLoading(true)

    try {
      const responseBody = await fetchData('/pet')
      setPetsPagination(responseBody)
    } catch (error) {
      setError(error)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchPets()
  }, [])

  return {
    data: petsPagination,
    isLoading,
    error
  }
}

export default useFetchPets