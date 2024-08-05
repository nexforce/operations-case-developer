import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FC } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import useCreatePet from "@/hooks/api/useCreatePet"

const formSchema = z.object({
  name: z.string().min(2).max(80),
  age: z.string(),
  breed: z.string().min(2).max(80),
})

const CreatePetForm: FC = () => {
  const { createPet } = useCreatePet()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      age: undefined,
      breed: undefined
    },
  })

  function onSubmit({ age, ...values }: z.infer<typeof formSchema>) {
    createPet({
      ...values,
      age: Number(age),
      contactId: '44671233162'
    })
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
            <BreadcrumbPage>Adicionar</BreadcrumbPage>
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

          <Button type="submit">Adicionar pet</Button>
        </form>
      </Form>
    </div>
  )
}

export default CreatePetForm