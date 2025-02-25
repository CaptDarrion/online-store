import $api from "../http"

export default class BrandService {
    static async fetchBrands() {
        return $api.get('/brand')
      }
    
    static async createBrand(name) {
        return $api.post('/brand/create', { name })
      }
    
}