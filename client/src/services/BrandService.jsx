import $api from "../http";

export default class BrandService {
  static async fetchBrands() {
    return $api.get("/brand");
  }

  static async createBrand(name) {
    return $api.post("/brand/create", { name });
  }

  static async fetchOneBrand(id) {
    return $api.get(`/brand/${id}`);
  }

  static async deleteOneBrand(name) {
    return $api.delete(`/brand/${name}`);
  }
}
