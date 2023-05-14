const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//GET ALL THE PRODUCT DETAILS
router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMIT PRODUCT INFORMATION
router.post("/", async (req, res) => {
  const product = new Product({
    ProductName: req.body.ProductName,
    Price: req.body.Price,
    Description: req.body.Description,
    Qty: req.body.Qty,
    ImageBase64: req.body.ImageBase64,
    Category: req.body.Category,
  });

  try {
    const saveProduct = await product.save();
    res.json(saveProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

//SPECIFIC PRODUCT
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE SPECIFIC PRODUCT
router.delete("/:productId", async (req, res) => {
  try {
    const removeProduct = await Product.remove({
      _id: req.params.productId,
    });
    res.json(removeProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

//UPDATE A PRODUCT DETAILS
router.patch("/:productId", async (req, res) => {
  try {
    const updateProduct = await Product.updateOne(
      { _id: req.params.productId },
      {
        $set: {
          ProductName: req.body.ProductName,
          Price: req.body.Price,
          Description: req.body.Description,
          Qty: req.body.Qty,
          ImageBase64: req.body.ImageBase64,
          Category: req.body.Category,
        },
      }
    );
    res.json(updateProduct);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/allProd", async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
});
module.exports = router;
