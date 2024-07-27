import { useNavigate, useParams } from "react-router-dom";
import { categories } from "../datatypes/constants";
import { useForm } from "react-hook-form";
import InventoryService from "../services/InventoryService";
import "./styles.css";
import { useEffect, useMemo } from "react";
import { IProduct } from "../datatypes/interfaces";

export default function FormPage() {
  let { id } = useParams();
  const nav = useNavigate();
  const service = useMemo(() => new InventoryService(), []);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data: any) => {
    const product: IProduct = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock)
      };
    if (id) {
      service.updateProduct(id, product);
    } else {
      service.createProduct(product);
    }
    nav("/");
  };

  useEffect(() => {
    if (id) {
      service.getProductById(id).then((product) => {
        setValue("name", product.name);
        setValue("description", product.description);
        setValue("category", product.category);
        setValue("price", product.price);
        setValue("stock", product.stock);
      });
    }
  }, [id, setValue, service]);

  return (
    <div className="container">
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>{id ? "Atualizar" : "Cadastrar"} produto</h1>

          <fieldset>
            <label htmlFor="name">Nome:</label>
            <input
              {...register("name", { required: "Nome é obrigatório" })}
              type="text"
              id="name"
            />
            {errors.name && <span>{errors.name.message as string}</span>}

            <label htmlFor="description">Descrição:</label>
            <input {...register("description")} type="text" id="description" />

            <label htmlFor="category">Categoria:</label>
            <select
              {...register("category", { required: "Categoria é obrigatória" })}
              id="category"
              className="custom-select "
            >
              <option value="">Selecione</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <span>{errors.category.message as string}</span>
            )}

            <label htmlFor="price">Preço:</label>
            <input
              {...register("price", {
                required: "Preço é obrigatório",
                min: 1,
              })}
              type="number"
              id="price"
            />
            {errors.price && <span>{errors.price.message as string}</span>}

            <label htmlFor="stock">Estoque:</label>
            <input
              {...register("stock", {
                required: "Estoque é obrigatório",
                min: 1,
              })}
              type="number"
              id="stock"
            />
            {errors.stock && <span>{errors.stock.message as string}</span>}
          </fieldset>

          <button className="submit-button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
