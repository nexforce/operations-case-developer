const express = require("express");
const router = express.Router();

/* GET Products */
router.get("/products", function(req, res) {
   res.json("Return all products");
});

/* GET Product */
router.get("/products/:productId", function(req, res) {
   res.json("Return single product");
});

/* DELETE Product */
router.delete("/products/:productId", function(req, res) {
   res.json("delete product");
});

/* POST Product */
router.post("/products", function(req, res) {
   res.json("create product");
});

/* PATCH Product */
router.patch("/products/:prodctId", function(req, res) {
   res.json("update product");
});

module.exports = router;
