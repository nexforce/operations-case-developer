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

const useFetchPetById = (id?: string) => {
  const [pet, setPet] = useState<Pet>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown | null>(null)

  const fetchPet = async () => {
    setIsLoading(true)

    try {
      const responseBody = await fetchData(`/pet/${id}`)
      setPet(responseBody)
    } catch (error) {
      setError(error)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchPet()
  }, [])

  return {
    data: pet,
    isLoading,
    error
  }
}

export default useFetchPetById