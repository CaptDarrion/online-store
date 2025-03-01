import $api from "../http"

export default class CategoryService {
    static async fetchCategories() {
        return $api.get('/category')
      }
      
    static async createCategories(name, parentId) {
        return $api.post('/category/create', {name, parentId: parentId || null})
    }

    static async deleteCategories(name) {
      return $api.delete(`/category/${name}`)
    }
}