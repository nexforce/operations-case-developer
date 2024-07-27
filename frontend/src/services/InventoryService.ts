import { IProduct } from "../datatypes/interfaces";

class InventoryService {
  private baseUrl: string = "http://localhost:4000/products";

  async getAllProducts(): Promise<IProduct[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  }
  async filterProducts(
    category: string,
    minRange: number,
    maxRange: number
  ): Promise<IProduct[]> {
    const url = new URL(`${this.baseUrl}/filter`);
    if (category !== "") url.searchParams.append("category", category);
    url.searchParams.append("minRange", minRange.toString());
    url.searchParams.append("maxRange", maxRange.toString());
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  }

  async getProductById(id: string): Promise<IProduct> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return response.json();
  }

  async createProduct(product: Omit<IProduct, "id">): Promise<any> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Failed to create product");
    }
    return response.json();
  }

  async updateProduct(id: string, product: Partial<IProduct>): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
    return response.json();
  }

  async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
  }
}

export default InventoryService;
