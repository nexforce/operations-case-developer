const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

let products = [];

router.post('/', upload.single('image'), (req, res) => {
    const { id, nome, preco, estoque } = req.body;
    const image = req.file ? req.file.filename : null;

    const newProduct = {
        id,
        nome,
        preco,
        estoque,
        image
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

router.get('/', (req, res) => {
    res.json(products);
});

router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

router.put('/:id', upload.single('image'), (req, res) => {
    const { nome, preco, estoque } = req.body;
    const image = req.file ? req.file.filename : null;

    const productIndex = products.findIndex(p => p.id === req.params.id);
    if (productIndex !== -1) {
        const updatedProduct = {
            ...products[productIndex],
            nome,
            preco,
            estoque,
            image: image || products[productIndex].image
        };
        products[productIndex] = updatedProduct;
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === req.params.id);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        res.json({ message: 'Produto deletado com sucesso' });
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

module.exports = router;