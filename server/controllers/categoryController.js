const { Category, Product } = require("../models/models.js");
const ApiError = require("../error/ApiError.js");
const ProductController = require("../controllers/productController.js")

class CategoryController {
  async create(req, res, next) {
    try {
      const { name, parentId } = req.body;
      const exists = await Category.findOne({ where: { name } });

      if (!name || name.trim() === "") {
        return res.status(400).json({ message: "Название категории не может быть пустым" });
      }

      if ( exists ) {
        return res.status(400).json({ message: "Категория с таким названием уже существует" })
      }

      if (parentId) {
        const parentCategory = await Category.findByPk(parentId);
        if (!parentCategory) {
          return res.status(400).json({ message: "Parent category not found" });
        }
      }

      
    const category = await Category.create({ name, parentId: parentId || null });
    return res.json(category);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
    
  }

  async getAll(req, res) {
    const categories = await Category.findAll({
      where: { parentId: null }, 
      include: [{ model: Category, as: "subcategories" }] 
    });
    return res.json(categories);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const category = await Category.findOne({where: { id }});
    return res.json(category);
  
  }
  
  async delete(req, res, next) {
    try{ 
      const { name } = req.params;
      
      const category = await Category.findOne({ where: { name }})
      
      if (!category) {
        return res.status(404).json({message: "Категории с таким названием не существует"})
      }

      const products = await Product.findAll({where: { categoryId: category.id}})

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
