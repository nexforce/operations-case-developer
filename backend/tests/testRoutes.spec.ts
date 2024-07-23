import request from "supertest";
import index from "../src/index";
import express from "express";
import bodyParser from "body-parser";
import * as movieService from "../src/services/movieService";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", index);


jest.mock("../src/services/movieService");
describe("test routes", () => {
  it("GET /movies should return 200 OK", (done) => {
    request(app).get("/movies").expect(200, done);
  });

  it("POST /movies should return 201 Created", (done) => {
    request(app)
      .post("/movies")
      .send({
        name: "Test Movie",
        director: "Test Director",
        genre: "Test Genre",
        year: 2021,
        rating: 5,
      })
      .expect(201, done);
    });

  it("GET /movies/:id should return 200 OK", async () => {
    const movie = {
      id: 1,
      name: "Test Movie",
      director: "Test Director",
      genre: "Test Genre",
      year: 2021,
      rating: 5,
    };

    (movieService.getMovieById as jest.Mock).mockResolvedValue(movie);

    const response = await request(app).get("/movies/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(movie);
  });

  it("PATCH /movies/:id should return 200 OK", async () => {
    const movie = {
      id: 1,
      name: "Test Movie",
      director: "Test Director",
      genre: "Test Genre",
      year: 2021,
      rating: 5,
    };

    (movieService.updateMovie as jest.Mock).mockResolvedValue(movie);

    const response = await request(app).patch("/movies/1").send({
      name: "Test Movie",
      director: "Test Director",
      genre: "Test Genre",
      year: 2021,
      rating: 5,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(movie);
  });

  it("DELETE /movies/:id should return 200 OK", async () => {
    const movie = {
      id: 1,
      name: "Test Movie",
      director: "Test Director",
      genre: "Test Genre",
      year: 2021,
      rating: 5,
    };

    (movieService.deleteMovie as jest.Mock).mockResolvedValue(movie);

    const response = await request(app).delete("/movies/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(movie);
  });

  it("GET /movies/:id should return 404 Not Found", async () => {
    (movieService.getMovieById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/movies/1");

    expect(response.status).toBe(404);
    
  });

  it("PATCH /movies/:id should return 404 Not Found", async () => {
    (movieService.updateMovie as jest.Mock).mockResolvedValue(null);

    const response = await request(app).patch("/movies/1").send({
      name: "Test Movie",
      director: "Test Director",
      genre: "Test Genre",
      year: 2021,
      rating: 5,
    });

    expect(response.status).toBe(404);
    
  });

  it("DELETE /movies/:id should return 404 Not Found", async () => {
    (movieService.deleteMovie as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete("/movies/1");

    expect(response.status).toBe(404);
  });

  it("POST /movies should return 400 Bad Request", (done) => {
    request(app)
      .post("/movies")
      .send({
        name: "Test Movie",
        director: "Test Director",
        genre: "Test Genre",
        year: 2021,
      })
      .expect(400, done);
      
  })
});
