import { Request, Response } from "express";
import { ProductDTO, UpdateProductDTO } from "../dto/InventoryDTO";
import { plainToClass } from "class-transformer";
import InventoryService from "../services/InventoryService";

class InventoryController {
  async createProduct(req: Request, res: Response) {
    const productDTO = plainToClass(ProductDTO, req.body);
    // const productDTO: ProductDTO = req.body;

    await InventoryService.createProduct(productDTO);

    res.status(201).json({
      message: "Product created successfully",
    });
  }

  async getProducts(req: Request, res: Response) {
    const { id } = req.params;

    var result;
    if (id) {
      result = await InventoryService.getProductById(id);
      if (!result) {
        res.status(404).json({
          message: "Product not found",
        });
      }
    } else {
      result = await InventoryService.getAllProducts();
    }

    res.status(200).json(result);
  }

  async getProductsByCategoryAndRange(req: Request, res: Response) {
    const { category, minRange, maxRange }: any = req.query;
   
    var result = await InventoryService.getProductsByCategoryAndRange(
      category,
      Number(minRange),
      Number(maxRange)
    );

    res.status(200).json(result);
  }

  async updateProduct(req: Request, res: Response) {
    const productDTO = plainToClass(UpdateProductDTO, req.body);
    const { id } = req.params;
    await InventoryService.updateProduct(productDTO, id);

    res.status(200).json({
      message: "Product updated successfully",
    });
  }

  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    await InventoryService.deleteProduct(id);
  }
}

export default new InventoryController();
