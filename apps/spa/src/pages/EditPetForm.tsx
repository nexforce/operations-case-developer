import { FC, useEffect, useState } from "react";
import { z } from "zod"
import { useNavigate } from 'react-router-dom'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useParams } from "react-router-dom";
import useFetchPetById from "@/hooks/api/useFetchPetById";
import useEditPet from "@/hooks/api/useEditPet";

type PetInput = {
  name: string
  breed: string
  age: number
  contactId: string
}

const formSchema = z.object({
  name: z.string().min(2).max(80),
  age: z.string(),
  breed: z.string().min(2).max(80),
})

const EditPetForm: FC = () => {
  const [defaultValues, setDefaultValues] = useState<PetInput>({
    name: '',
    age: 0,
    breed: '',
    contactId: ''
  })

  const navigate = useNavigate();

  const { id } = useParams()
  const { data } = useFetchPetById(id)
  const { editPet } = useEditPet(id)

  useEffect(() => {
    if (!data) return

    setDefaultValues(data)
  }, [data])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      age: String(defaultValues.age),
      name: defaultValues.name,
      breed: defaultValues.breed,
    },
    defaultValues: {
      age: '',
      name: '',
      breed: ''
    }
  })

  function onSubmit({ age, ...values }: z.infer<typeof formSchema>) {
    editPet({
      age: Number(age),
      ...values,
      contactId: '44671233162'
    })

    navigate(`/pets/${id}`)
  }

  return (
    <div className="px-6 py-3">
      <Header />

      <Breadcrumb className="pt-2 mb-4">
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
            <BreadcrumbLink href={`/pets/${id}`}>Detalhes</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Editar</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Chico" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Idade</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="3" {...field} />
                </FormControl>
                <FormDescription>
                  Use como métrica de anos. Exemplo para 4 anos, use "4"
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Idade</FormLabel>
                <FormControl>
                  <Input placeholder="Siamês" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Atualizar</Button>
        </form>
      </Form>
    </div>
  )
}

export default EditPetForm