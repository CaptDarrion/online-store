const uuid = require("uuid");
const path = require("path");
const { Product, ProductInfo } = require("../models/models.js");
const ApiError = require("../error/ApiError.js");
const { where } = require("sequelize");
const fs = require("fs");

class ProductController {
  async create(req, res, next) {
    try {
      let { name, price, quantity, brandId, categoryId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const product = await Product.create({
        name,
        price,
        quantity,
        brandId,
        categoryId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          ProductInfo.create({
            title: i.title,
            description: i.description,
            productId: product.id,
          })
        );
      }

      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, categoryId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 20;
    let offset = page * limit - limit;
    let products;
    if (!brandId && !categoryId) {
      products = await Product.findAndCountAll({ limit, offset });
    }
    if (brandId && !categoryId) {
      products = await Product.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && categoryId) {
      products = await Product.findAndCountAll({
        where: { categoryId },
        limit,
        offset,
      });
    }
    if (brandId && categoryId) {
      products = await Product.findAndCountAll({
        where: { brandId, categoryId },
        limit,
        offset,
      });
    }
    return res.json(products);
  }

  async getAllWithoutPagination(req, res) {
    const product = await Product.findAll();
    return res.json(product);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
      include: [{ model: ProductInfo, as: "info" }],
    });
    return res.json(product);
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ where: { id } });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await ProductInfo.destroy({ where: { productId: id } });
      await product.destroy();

      const filePath = path.resolve(__dirname, "..", "static", product.img);
      fs.unlink(filePath, (err) => {
        if (err) {
          next(ApiError.badRequest("Error while deleting the image"));
        }
      });

      return res.status(200).json({ message: "Removal completed" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ProductController();
