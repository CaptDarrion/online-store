import $api from "../http";

export default class UserService {
  static async fetchProfile() {
    return $api.get("/profile");
  }
  static async updateProfile(firstName, lastName, phone) {
    return $api.put("/profile", { firstName, lastName, phone });
  }
}
