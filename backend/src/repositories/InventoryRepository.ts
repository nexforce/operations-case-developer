import {
  ProductDTO,
  UpdateProductDTO,
} from "../dto/InventoryDTO";
import { prisma } from "../prisma";

class InventoryRepository {
  
  async create(product: ProductDTO) {
    return await prisma.product.create({
      data: product,
    });
  }

  async get() {
    return await prisma.product.findMany();
  }

  async getByCategoryAndRange(category: string, minRange?: number, maxRange?: number) {
    return await prisma.product.findMany({
      where: { AND: { category, price: { gte: minRange, lte: maxRange } } },
    });
  }

  async getById(id: string) {
    return await prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async update(product: UpdateProductDTO, id: string) {
    return await prisma.product.update({
      where: {
        id,
      },
      data: product,
    });
  }

  async delete(id: string) {
    return await prisma.product.delete({
      where: {
        id,
      },
    });
  }
}

export default new InventoryRepository();
