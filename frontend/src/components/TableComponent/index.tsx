import { IProduct } from "../../datatypes/interfaces";
import "./styles.css"

interface Props {
  data: IProduct[];
  onDelete: any;
  onEdit: any;
}

export default function TableComponent(props: Props) {
  return (
    <div>
      <div className="tbl-header">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table>
          <tbody>
            {props.data.map((p, index) => (
              <tr key={index}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button onClick={() => props.onEdit(p.id)}>Editar</button>
                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={() => props.onDelete(p.id!)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
