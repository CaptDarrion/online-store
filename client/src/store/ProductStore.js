import { makeAutoObservable } from "mobx";
import BasketService from "../services/BasketService";
import WishlistService from "../services/WishlistService";

export default class ProductStore {
  constructor() {
    this.categories = [];
    this.brands = [];
    this.products = []; // Пагинированный список товаров
    this.page = 1;
    this.totalCount = 8;
    this.limit = 20;

    this.basketItems = [];
    this.wishlistItems = [];
    makeAutoObservable(this);
  }

  // ======= Категории =======
  setCategories(categories) {
    this.categories = categories;
  }
  addCategory(category) {
    this.categories.push(category);
  }
  removeCategoryByName(name) {
    this.categories = this.categories.filter((c) => c.name !== name);
  }
  removeCategoryById(id) {
    this.categories = this.categories.filter((c) => c.id !== id);
  }

  // ======= Бренды =======
  setBrands(brands) {
    this.brands = brands;
  }
  addBrand(brand) {
    this.brands.push(brand);
  }
  removeBrandByName(name) {
    this.brands = this.brands.filter((b) => b.name !== name);
  }

  // ======= Продукты =======
  setProducts(products) {
    this.products = products.rows || [];
    this.totalCount = products.count || 0;
  }
  setPage(page) {
    this.page = page;
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

  // ======= Корзина =======
  async loadBasket() {
    try {
      const response = await BasketService.fetchBasket();
      this.basketItems = response.data;
    } catch (e) {
      console.error("Ошибка загрузки корзины:", e);
    }
  }
  async addToBasket(item) {
    try {
      await BasketService.addToBasket(item.id);
      if (!this.basketItems.find((i) => i.id === item.id)) {
        this.basketItems.push(item);
      }
    } catch (error) {
      console.error("Ошибка добавления в корзину:", error);
    }
  }
  async removeFromBasket(itemId) {
    try {
      await BasketService.removeFromBasket(itemId);
      this.basketItems = this.basketItems.filter((item) => item.id !== itemId);
    } catch (e) {
      console.error("Ошибка удаления из корзины:", e);
    }
  }
  isItemInBasket(itemId) {
    return this.basketItems.some((item) => item.id === itemId);
  }

  // ======= Избранное =======
  async loadWishlist() {
    try {
      const response = await WishlistService.fetchWishlist();
      // Предполагаем, что API возвращает полный объект товара
      this.wishlistItems = response.data;
    } catch (e) {
      console.error("Ошибка загрузки избранного:", e);
    }
  }
  async addToWishlist(item) {
    try {
      await WishlistService.addToWishlist(item.id);
      // Если товара ещё нет в избранном, добавляем его
      if (!this.wishlistItems.find((i) => i.id === item.id)) {
        this.wishlistItems.push(item);
      }
    } catch (error) {
      console.error("Ошибка добавления в избранное:", error);
    }
  }
  async removeFromWishlist(itemId) {
    try {
      await WishlistService.removeFromWishlist(itemId);
      this.wishlistItems = this.wishlistItems.filter(
        (item) => item.id !== itemId
      );
    } catch (e) {
      console.error("Ошибка удаления из избранного:", e);
    }
  }
  hasInWishlist(itemId) {
    return this.wishlistItems.some((item) => item.id === itemId);
  }
}
