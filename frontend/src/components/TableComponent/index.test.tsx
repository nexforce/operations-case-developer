import React from "react";
import { render, screen } from "@testing-library/react";
import TableComponent from "./index";
import { IProduct } from "../../datatypes/interfaces";

describe("TableComponent", () => {
  const mockData: IProduct[] = [
    { id: "1", name: "Product 1", price: 10, stock: 1, category: "Category 1" },
    { id: "3", name: "Product 2", price: 20, stock: 1, category: "Category 2" },
  ];
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  test("renders table with correct number of rows", () => {
    
    render(
      <TableComponent
        data={mockData}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockData.length + 1); // +1 for header row
  });

  test("renders correct data in table cells", () => {
    render(
      <TableComponent
        data={mockData}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );
    mockData.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`R$${product.price}`)).toBeInTheDocument();
      expect(screen.getByText(product.category)).toBeInTheDocument();
    });
  });

  test("renders edit and delete buttons for each row", () => {
    render(
      <TableComponent
        data={mockData}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );
    const editButtons = screen.getAllByRole("button", { name: /editar/i });
    const deleteButtons = screen.getAllByRole("button", { name: /excluir/i });
    expect(editButtons).toHaveLength(mockData.length);
    expect(deleteButtons).toHaveLength(mockData.length);
  });

  test("renders empty table when data is empty", () => {
    render(
      <TableComponent data={[]} onDelete={mockOnDelete} onEdit={mockOnEdit} />
    );
    const rows = screen.queryAllByRole("row");
    expect(rows).toHaveLength(1); // Only header row
  });
});
