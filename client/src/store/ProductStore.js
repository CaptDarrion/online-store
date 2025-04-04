import { makeAutoObservable } from 'mobx';

export default class ProductStore {
  constructor() {
    this.categories = [];
    this.brands = [];
    this.products = [];
    this.page = 1;
    this.totalCount = 8;
    this.limit = 20;
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
    this.totalCount = products.count || 0;
  }

  setPage(page) {
    this.page = page;
  }

  setTotalCount (totalCount) {
    this.totalCount = totalCount;
  }

  setLimit(limit) {
    this.limit = limit;
  }

  get totalPages() {
    return Math.ceil(this.totalCount / this.limit);
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.setPage(this.page + 1);
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.setPage(this.page - 1);
    }
  }
}
