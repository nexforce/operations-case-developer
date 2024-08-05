import fetchData from "@/lib/api"
import { useState } from "react"

const useDeletePetById = (id?: string) => {
  const [success, setSuccess] = useState<boolean>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown | null>(null)

  const deletePet = async () => {
    setIsLoading(true)

    try {
      await fetchData(`/pet/${id}`, {
        method: 'DELETE'
      })

      setSuccess(true)
    } catch (error) {
      setError(error)
    }

    setIsLoading(false)
  }

  return {
    success,
    deletePet,
    isLoading,
    error
  }
}

export default useDeletePetById