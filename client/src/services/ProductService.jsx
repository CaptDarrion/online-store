import $api from "../http";

export default class ProductService {
  static async fetchProducts(typeId, brandId, page, limit) {
    try {
      const response = await $api.get("/product", {
        params: { typeId, brandId, page, limit },
      });
      console.log(response.data);

      return response;
    } catch (e) {
      console.error("Error fetching products:", e);
      throw e;
    }
  }

  static async fetchAllProducts() {
    try {
      const response = await $api.get("/product/all");

      return response;
    } catch (e) {
      console.error("Error fetching all products:", e);
      throw e;
    }
  }

  static async fetchOneProduct(id) {
    return $api.get("/product/" + id);
  }

  static async createProduct(product) {
    return $api.post("/product/", product);
  }
}
