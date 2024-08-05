import fetchData from "@/lib/api"
import { useState } from "react"

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

type PetInput = {
  name: string
  breed: string
  age: number
  contactId: string
}

const useCreatePet = () => {
  const [pet, setPet] = useState<Pet>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown | null>(null)

  const createPet = async (input: PetInput) => {
    setIsLoading(true)

    try {
      const responseBody = await fetchData('/pet/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })
      setPet(responseBody)
    } catch (error) {
      setError(error)
    }

    setIsLoading(false)
  }

  return {
    data: pet,
    isLoading,
    createPet,
    error
  }
}

export default useCreatePet