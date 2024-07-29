import InventoryRepository from "../repositories/InventoryRepository";
import { ProductDTO, UpdateProductDTO } from "../dto/InventoryDTO";

class InventoryService {
  async createProduct(productDto: ProductDTO) {
    return await InventoryRepository.create(productDto);
  }

  async getAllProducts() {
    return await InventoryRepository.get();
  }

  async getProductsByCategoryAndRange(category: string, minRange?: number, maxRange?: number) {
    return await InventoryRepository.getByCategoryAndRange(category, minRange, maxRange);
  }

  async getProductById(id: string) {
    return await InventoryRepository.getById(id);
  }

  async updateProduct(updateProductDto: UpdateProductDTO, id: string) {
    return await InventoryRepository.update(updateProductDto, id);
  }

  async deleteProduct(id: string) {
    return await InventoryRepository.delete(id);
  }
}

export default new InventoryService();
