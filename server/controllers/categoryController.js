const { Category, Product } = require("../models/models.js");
const ApiError = require("../error/ApiError.js");
const ProductController = require("../controllers/productController.js")

class CategoryController {
  async create(req, res) {
    const { name } = req.body;
    const category = await Category.create({ name });
    return res.json(category);
  }

  async getAll(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const category = await Category.findOne({where: { id }});
    return res.json(category);
  
  }
  
  async delete(req, res, next) {
    try{ 
      const { id } = req.params;
      const category = await Category.findOne({where: { id }})

      if (!category) {
        return res.status(404).json({message: "Category not found"})
      }

      const products = await Product.findAll({where: { categoryId: id}})

      await Promise.all(
        products.map(product => 
          ProductController.delete({ params: { id: product.id } }, res, next)
        )
      );

      await category.destroy();
      return res.status(200).json({message: "Removal completed"})
    } catch (e){
      next(ApiError.badRequest(e.message));
    }

  }
}

module.exports = new CategoryController();
