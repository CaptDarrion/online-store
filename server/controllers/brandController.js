const { Brand, Product } = require("../models/models.js");
const ApiError = require("../error/ApiError.js");
const ProductController = require("./productController.js")

class BrandController {
  async create(req, res) {
    try {
      const { name } = req.body;
      const exists = await Brand.findOne({where: { name: name}})
      if ( exists ) {
        return res.status(400).json({ message: "Бренд с таким названием уже существует" })
      }
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
   
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const brand = await Brand.findAll({where: {id }})
    return res.json(brand);


  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const brand = await Brand.findOne({where: {id}})
  
      if (!brand) {
        return res.status(404).json({message: "Brand not found"})
      }

      const products = await Product.findAll({where: { brandId: id}})

      await Promise.all(
        products.map(product => 
          ProductController.delete({ params: { id: product.id } }, res, next)
        )
      );


      await brand.destroy();
  
      return res.status(200).json({message: "Removal completed"})

    } catch(e) {
      next(ApiError.badRequest(e.message))
    }

  }
}

module.exports = new BrandController();
