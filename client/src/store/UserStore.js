import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import axios from "axios";
import { API_URL } from "../http";

export default class UserStore {
  product;
  constructor(product) {
    this.product = product;

    this.isAuth = false;
    this.user = {};
    this.profile = {};
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  setProfile(profile) {
    this.profile = profile;
  }

  get role() {
    return this.user?.role;
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);

      this.product.loadBasket();
      this.product.loadWishlist();
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async registration(email, password) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      console.log(response);
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});

      this.product.basketItems = [];
      this.product.wishlistItems = [];
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async fetchProfile() {
    try {
      const response = await UserService.fetchProfile();
      this.setProfile(response.data.profile);
    } catch (e) {
      console.error(e.response?.data?.message);
    }
  }

  async updateProfile(firstName, lastName, phone) {
    try {
      const response = await UserService.updateProfile(
        firstName,
        lastName,
        phone
      );
      console.log("Profile updated:", response);
      this.setProfile(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
}
