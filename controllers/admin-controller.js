const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");

async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.render("admin/products/all-products", { products: products });
  } catch (err) {
    next(err);
    return;
  }
}

function getAddProduct(req, res) {
  const noProduct = {
    title: "",
    summary: "",
    price: "",
    description: "",
  };
  res.render("admin/products/add-product", { product: noProduct });
}

async function addProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (err) {
    next(err);
    return;
  }

  res.redirect("/admin/products");
}

async function getUpdateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.productId);
    res.render("admin/products/update-product", { product: product });
  } catch (err) {
    next(err);
    return;
  }
}

async function updateProduct(req, res) {
  const product = new Product({
    ...req.body,
    _id: req.params.productId,
  });

  if (req.file) {
    product.replaceImage(req.file.filename);
  }

  try {
    await product.save();
  } catch (err) {
    next(err);
    return;
  }

  res.redirect("/admin/products");
}

async function deleteProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.productId);
    await product.remove();
  } catch (err) {
    next(err);
    return;
  }

  // this request is javascript-driven so that we should not render any view
  // res.render("/admin/products");
  res.json({
    message: "Product deleted.",
  });
}

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAll();
    res.render("admin/orders/admin-orders", {
      orders: orders
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  const orderId = req.params.id;
  const newStatus = req.body.status;
  try {
    const order = await Order.findById(orderId);
    
    order.status = newStatus;
    await order.save();

    res.json({ message: "Order updated.", status: newStatus })
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts: getProducts,
  getAddProduct: getAddProduct,
  addProduct: addProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getOrders: getOrders,
  updateOrder: updateOrder
};
