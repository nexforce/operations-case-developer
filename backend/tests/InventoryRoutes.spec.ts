import request from "supertest";
import prisma from "../src/prisma/index";

import { expect } from "chai";
import { app } from "../src/app";

describe("Product Routes", () => {
  const apiUrl = "/products";

  const productDTO = {
    name: "product a",
    description: "product a description",
    price: 10,
    category: "category a",
    stock: 10,
  };

  beforeEach(async () => {
    await prisma.product.deleteMany({});
  });

  describe("POST /produts", () => {
    it("should create a new user", async () => {
      const res = await request(app).post(apiUrl).send(productDTO);

      expect(res.status).to.equal(201);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("message", "Product created successfully");
    });

  });

  describe("GET /products/:id", () => {
    it("should get a product by id", async () => {
      const p = await prisma.product.create({
        data: productDTO,
      });

      const res = await request(app).get(`${apiUrl}/${p.id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("name", productDTO.name);
    });

    it("should return an error if the user does not exist", async () => {
      const res = await request(app).get(apiUrl + "/9999");

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message","Product not found");
    });
  });
  describe("GET /products/filter", () => {
    it("should get a product by range and category", async () => {
     await prisma.product.create({
        data: productDTO,
      });

      const res = await request(app).get(`${apiUrl}/filter?category=${productDTO.category}&minRange=1&maxRange=${productDTO.price+10}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("name", productDTO.name);
    });
  });
});
