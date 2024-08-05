import fetchData from "@/lib/api"
import { useState } from "react"

type PetInput = {
  name: string
  breed: string
  age: number
  contactId: string
}

const useEditPet = (id?: string) => {
  const [success, setSuccess] = useState<boolean>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown | null>(null)

  const editPet = async (input: PetInput) => {
    setIsLoading(true)

    try {
      await fetchData(`/pet/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })
      setSuccess(true)
    } catch (error) {
      setError(error)
    }

    setIsLoading(false)
  }

  return {
    success,
    isLoading,
    editPet,
    error
  }
}

export default useEditPet