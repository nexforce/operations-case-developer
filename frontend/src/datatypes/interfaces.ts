// Product interface (adjust according to your actual product structure)
interface IProduct {
  id?: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  stock: number;
}

export type { IProduct };
