import { FC } from "react";
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const PetCard: FC = () => {
  const id = '12345'

  return (
    <Card className="pt-4 max-w-sm pe-4">
      <CardContent className="text-base">
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