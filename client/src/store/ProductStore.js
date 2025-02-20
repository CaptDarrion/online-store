import { makeAutoObservable } from 'mobx';

export default class ProductStore {
  constructor() {
    this.categories = [];
    this.brands = [
      { id: 1, name: 'Intertool' },
      { id: 2, name: 'Wega' },
    ];
    this.products = [
      { id: 1, name: 'Газонокосарка електрична 1400 Вт, 230 В~50 Гц', price: 3799, rating: 0, img: '61fb4345-91a8-4f4e-ba33-0448b2309a4f.jpg' },
      { id: 2, name: 'Газонокосарка електрична 1400 Вт, 230 В~50 Гц', price: 3799, rating: 0, img: '7c6d4f09-aaf8-4c97-9239-d5bf3b7f2419.jpg' },
      { id: 3, name: 'Газонокосарка електрична 1400 Вт, 230 В~50 Гц', price: 3799, rating: 0, img: '7c6d4f09-aaf8-4c97-9239-d5bf3b7f2419.jpg' },
      { id: 4, name: 'Газонокосарка електрична 1400 Вт, 230 В~50 Гц', price: 3799, rating: 0, img: '7c6d4f09-aaf8-4c97-9239-d5bf3b7f2419.jpg' },
      
    ];
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
