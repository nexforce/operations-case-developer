import { FC } from "react";
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type Props = {
  id: string
  name: string
  age: number
  breed: string
}

const PetCard: FC<Props> = ({ id, name, age, breed }) => {
  return (
    <Card className="pt-4 max-w-sm pe-4">
      <CardContent className="text-base">
        <div className="flex gap-x-1 text-foreground/80">
          <label className="font-semibold ">Nome: </label>
          <div>{name}</div>
        </div>

        <div className="flex gap-x-1 text-foreground/80">
          <label className="font-semibold ">Idade: </label>
          <div>
            {age}
            {age === 1 ? " ano" : " anos"}
          </div>
        </div>

        <div className="flex gap-x-1 text-foreground/80">
          <label className="font-semibold ">Raça: </label>
          <div>{breed}</div>
        </div>
      </CardContent>

      <CardFooter>
        <Button>
          <a href={`/pets/${id}`}>Ver detalhes</a>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PetCard