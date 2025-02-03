const uuid = require("uuid");
const path = require("path");
const { Product } = require("../models/models.js");
const ApiError = require("../error/ApiError.js");
const { where } = require("sequelize");

class ProductController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, categoryId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const product = await Product.create({
        name,
        price,
        brandId,
        categoryId,
        img: fileName,
      });

      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, categoryId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
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

  async getOne(req, res) {}
}

module.exports = new ProductController();
