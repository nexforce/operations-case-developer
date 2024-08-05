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

type UseFetchPetsInput = {
  page: number
  breedFilter?: string
}

const useFetchPets = ({ page, breedFilter }: UseFetchPetsInput) => {
  const [petsPagination, setPetsPagination] = useState<PetsPagination>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown | null>(null)

  const fetchPets = async () => {
    setIsLoading(true)

    try {
      let url = `/pet?page=${page}&pageSize=8`

      if (breedFilter && breedFilter !== "Raça") {
        url += `&breed=${breedFilter}`
      }

      const responseBody = await fetchData(url)
      setPetsPagination(responseBody)
    } catch (error) {
      setError(error)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchPets()
  }, [page, breedFilter])

  return {
    data: petsPagination,
    isLoading,
    error
  }
}

export default useFetchPets