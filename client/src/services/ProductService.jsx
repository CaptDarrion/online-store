import $api from "../http";

export default class ProductService {

static async fetchProducts(typeId, brandId, page, limit = 12) {
  try {
    const response = await $api.get('/product', { params: { typeId, brandId, page, limit } });
    console.log(response.data);
    
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}


  static async fetchOneProduct(id) {
    return $api.get('/product/' + id);
  }

  static async createProduct(product) {
    return $api.post('/product/', product);
  }
}
