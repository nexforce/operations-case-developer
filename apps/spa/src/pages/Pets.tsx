import { FC, useEffect, useState } from "react"

import PetCard from "@/components/pet-card"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import useFetchPets from "@/hooks/api/useFetchPets"

const Pets: FC = () => {
  const [page, setPage] = useState(1)

  useEffect(() => {
    console.log(page)
  }, [page])

  const { data } = useFetchPets(page)

  return (
    <>
      <div className="px-6 py-3">
        <Header />

        <main className="flex flex-col gap-y-4">
          <div className="flex flex-row justify-between items-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Início</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Pets</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex justify-end">
              <Button className="bg-blue-700">
                <a href="/pet/adicionar">Adicionar</a>
              </Button>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data?.items.map(pet => (
              <PetCard
                id={pet.id}
                name={pet.name}
                age={pet.age}
                breed={pet.breed}
                key={pet.id}
              />
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              {new Array(data?.totalPages).fill(0).map((_, index) => (
                <PaginationItem>
                  <PaginationLink onClick={() => {
                    setPage(index + 1)
                  }} className={data?.currentPage == index + 1 ? "bg-primary text-white hover:bg-primary/80 hover:text-white cursor-pointer" : "hover:border hover:bg-border-foreground cursor-pointer"}>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </>
  )
}

export default Pets