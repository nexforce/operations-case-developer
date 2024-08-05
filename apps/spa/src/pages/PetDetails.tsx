import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from '@/components/ui/card'

const fetchCat = async () => {
  const response = await fetch('https://api.sefinek.net/api/v2/random/animal/cat');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const result = await response.json()

  return result;
}

const PetDetails: FC = () => {
  const [updatedAt, setUpdatedAt] = useState<string | undefined>(undefined)
  const [photo, setPhoto] = useState<string>('')
  const { id } = useParams()

  useEffect(() => {
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = String(today.getFullYear())
    setUpdatedAt(`${day}/${month}/${year}`)

    fetchCat().then((result) => {
      setPhoto(result.message)
    })
  }, [])

  useEffect(() => {
    console.log(photo)
  }, [photo])

  return (
    <div className="px-6 py-3">
      <Header />

      <main>
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">Detalhes do Pet</h1>

        <div>
          <Card className="max-w-4xl">
            <CardContent className="py-4 flex flex-row-reverse justify-between">
              <div className="flex gap-x-2">
                <Button variant="secondary">
                  <a href={`/pets/${id}/editar`}>Editar</a>
                </Button>
                <Button variant="destructive">Remover</Button>
              </div>

              <div className="space-y-2">
                <div className="text-muted-foreground text-sm italic mb-6">Atualizado em {updatedAt}</div>

                <div>
                  <div className="bg-gray-400 w-72 h-72 max-w-md rounded" />
                </div>
                <div>

                  <div className="flex gap-x-1 text-foreground/80">
                    <label className="font-semibold ">Nome: </label>
                    <div>Ella</div>
                  </div>

                  <div className="flex gap-x-1 text-foreground/80">
                    <label className="font-semibold ">Idade: </label>
                    <div>1 ano</div>
                  </div>

                  <div className="flex gap-x-1 text-foreground/80">
                    <label className="font-semibold ">Raça: </label>
                    <div>Pele Curto Brasileiro</div>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default PetDetails