import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from '@/components/ui/card'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import useFetchPetById from "@/hooks/api/useFetchPetById";
import useDeletePetById from "@/hooks/api/useDeletePetById";

const PetDetails: FC = () => {
  const [updatedAt, setUpdatedAt] = useState<string | undefined>(undefined)
  const { id } = useParams()
  const navigate = useNavigate()

  const { data } = useFetchPetById(id)

  const { deletePet } = useDeletePetById(id)

  useEffect(() => {
    if (!data) return

    const updatedAt = new Date(data.updatedAt)

    if (!updatedAt) return

    const day = String(updatedAt.getDate()).padStart(2, '0')
    const month = String(updatedAt.getMonth() + 1).padStart(2, '0')
    const year = String(updatedAt.getFullYear())
    setUpdatedAt(`${day}/${month}/${year}`)
  }, [data?.updatedAt, data])

  return (
    <div className="px-6 py-3">
      <Header />

      <main>
        <Breadcrumb className="mb-6 pt-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Início</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/pets">Pets</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Detalhes</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">Detalhes do Pet</h1>

        <div>
          <Card className="max-w-4xl">
            <CardContent className="py-4 flex flex-row-reverse justify-between">
              <div className="flex gap-x-2">
                <Button variant="secondary">
                  <a href={`/pets/${id}/editar`}>Editar</a>
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger className="h-0">
                    <Button variant="destructive">Remover</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados de nossos servidores.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => {
                        deletePet()
                        navigate(`/pets`)
                      }}>Continuar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="space-y-2">
                <div className="text-muted-foreground text-sm italic mb-6">Atualizado em {updatedAt}</div>

                <div>
                  <div className="bg-gray-400 w-72 h-72 max-w-md rounded" />
                </div>
                <div>

                  <div className="flex gap-x-1 text-foreground/80">
                    <label className="font-semibold ">Nome: </label>
                    <div>{data?.name}</div>
                  </div>

                  <div className="flex gap-x-1 text-foreground/80">
                    <label className="font-semibold ">Idade: </label>
                    <div>
                      {data?.age}
                      {data?.age === 1 ? " ano" : " anos"}
                    </div>
                  </div>

                  <div className="flex gap-x-1 text-foreground/80">
                    <label className="font-semibold ">Raça: </label>
                    <div>{data?.breed}</div>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div >
      </main >
    </div >
  )
}

export default PetDetails