import { useState } from "react";
import { categories } from "../../datatypes/constants";
import "./styles.css";
import InventoryService from "../../services/InventoryService";
interface Props {
  onFilter: any;
}
export default function FilterComponent(props: Props) {
  const [range, setRange] = useState(0);
  const [category, setCategory] = useState("");

  const onFilterData = async () => {
    const service = new InventoryService();
    var data = await service.filterProducts(category, 1, range);

    props.onFilter(data);
  };

  return (
    <div className="filters">
      <select onChange={(e) => setCategory(e.target.value)}>
        <option defaultChecked value={""}>Todos</option>
        {categories.map((category) => (
          <option value={category}>{category}</option>
        ))}
      </select>
      <div className="custom-slider">
        R${1}
        <input
          type="range"
          onChange={(e) => setRange(Number(e.target.value))}
          min={1}
          max={50000}
          value={range}
          step={1}
        />
        R${range}
      </div>
      <button onClick={onFilterData}>Filtrar</button>
    </div>
  );
}
