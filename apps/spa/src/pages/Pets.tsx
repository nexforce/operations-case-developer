import { FC } from "react"

import PetCard from "@/components/pet-card"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import useFetchPets from "@/hooks/api/useFetchPets"

const Pets: FC = () => {
  const { data } = useFetchPets()

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
                  <PaginationLink className={data?.currentPage == index + 1 ? "bg-gray-700 text-white" : ""} href="#">{index + 1}</PaginationLink>
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