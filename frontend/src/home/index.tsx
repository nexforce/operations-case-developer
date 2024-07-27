import { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate, useNavigation, useRoutes } from "react-router-dom";
import { IProduct } from "../datatypes/interfaces";
import InventoryService from "../services/InventoryService";
import TableComponent from "../components/TableComponent";
import { categories } from "../datatypes/constants";
import FilterComponent from "../components/FilterComponent";

function HomePage() {
  const [data, setData] = useState<IProduct[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const service = new InventoryService();
    const data = await service.getAllProducts();
    setData(data);
  };

  const onDelete = async (id: string) => {
    const service = new InventoryService();
    await service.deleteProduct(id);
    await fetchData();
  };

  return (
    <div className="container">
      <section className="products">
        <h1>Produtos</h1>
        <FilterComponent onFilter={setData} />
        <TableComponent
          data={data}
          onDelete={onDelete}
          onEdit={(id: string) => navigate(`/new-product/${id}`)}
        />
        <button
          className="new-product-button"
          onClick={() => navigate("/new-product")}
        >
          Adicionar novo produto
        </button>
      </section>
    </div>
  );
}

export default HomePage;
