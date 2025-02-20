import $api from "../http"

export default class CategoryService {
    static async fetchCategories() {
        return $api.get('/category')
      }
      
      static async createCategories(name, parentId) {
        return $api.post('/category', {name, parentId})
      }
}