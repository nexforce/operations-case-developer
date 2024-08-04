import { FC } from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "./ui/navigation-menu";
import logo from '../assets/logo.jpeg'

const Header: FC = () => {
  return (
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
  )
}

export default Header