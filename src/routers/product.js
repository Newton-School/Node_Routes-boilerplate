const fs = require('fs');
const express = require('express');
const router = new express.Router();

//middleware
router.use(express.json());

//Including product.json file
const product = JSON.parse(
  fs.readFileSync(`${__dirname}/../../dev-data/product.json`)
);

// Defining The Router
//Get all the products
router.get('/api/v1/product', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: product.length,
    data: {
      product: product,
    },
  });
});

//Create a new product
router.post('/api/v1/product', (req, res) => {
  // console.log(req.body);
  const newId = product[product.length - 1].id + 1;
  const newProduct = Object.assign(
    {
      id: newId,
    },
    req.body
  );
  product.push(newProduct);
  fs.writeFile(
    `${__dirname}/../../dev-data/product.json`,
    JSON.stringify(product),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          product: newProduct,
        },
      });
    }
  );
});

module.exports = router;
