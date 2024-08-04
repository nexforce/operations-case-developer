import { FC } from "react"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'

import logo from '../assets/logo.jpeg'
import PetCard from "@/components/pet-card"

const Home: FC = () => {
  return (
    <>
      <div className="px-6 py-3">
        <header className="flex justify-between mb-8">
          <div className="flex gap-x-2 items-center">
            <img src={logo} alt="Logo of Nexforce" width={25} height={25} />
            <h1 className="text-base font-semibold text-foreground">Case Nexforce</h1>
          </div>

          <NavigationMenu className="pe-6">
            <NavigationMenuList className="gap-x-5">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a className="text-secondary-foreground/70 hover:text-secondary-foreground/90" href="/">Início</a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a className="text-secondary-foreground/70 hover:text-secondary-foreground/90" href="/pets">Pets</a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </header>

        <main className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <PetCard />
          <PetCard />
          <PetCard />
          <PetCard />
          <PetCard />
        </main>
      </div>
    </>
  )
}

export default Home