import { FC } from "react"

import PetCard from "@/components/pet-card"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

const Home: FC = () => {
  return (
    <>
      <div className="px-6 py-3">
        <Header />

        <main className="text-center pt-20 w-full flex flex-col gap-y-4">
          <div>
            Esse é o teste prático de <span className="font-semibold">Matheus Oliveira</span> para a Nexforce.
          </div>

          <div>Accese o cabeçalho de navegação acima para utilizar a aplicação.</div>

          <div className="flex gap-x-1 mx-auto pt-8">
            <div className="font-semibold">Tema:</div>
            <div>Pets</div>
          </div>

          <div>
            <Button variant="outline">
              <a href="/pets">Acessar</a>
            </Button>
          </div>
        </main>
      </div>
    </>
  )
}

export default Home