import $api from "../http"

export default class ProductService {
    static async fetchProducts() {
        return $api.get('/product')
      }
    static async fetchOneProduct(id) {
      return $api.get('/product/' + id)
    }
}
