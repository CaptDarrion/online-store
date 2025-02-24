import { makeAutoObservable } from 'mobx';

export default class ProductStore {
  constructor() {
    this.categories = [];
    this.brands = [];
    this.products = [];
    makeAutoObservable(this);
  }

  setCategories(categories) {
    this.categories = categories;
  }

  setBrands(brands) {
    this.brands = brands;
  }

  setProducts(products) {
    this.products = products.rows || [];
  }

}
