const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING, allowNull: true },
});

const UserInfo = sequelize.define("user_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: "users",
      key: "id",
    },
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Wishlist = sequelize.define("wishlist", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
});

const Token = sequelize.define("token", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING(1024), allowNull: true },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  rating: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: true },
  img: { type: DataTypes.STRING, allowNull: false },
});

const ProductInfo = sequelize.define("product_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  parentId: { type: DataTypes.INTEGER, allowNull: true },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const BrandCategory = sequelize.define("brand_category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  paymentMethod: {
    type: DataTypes.ENUM(
      "Оплата при отриманні",
      "Оплата карткою при оформленні"
    ),
    allowNull: false,
  },

  paymentStatus: {
    type: DataTypes.ENUM("Сплачено карткою", "Вибрано оплату при отриманні"),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      "Чекає на підтвердження",
      "Заказ підтверджено",
      "Замовлення укомплектовується",
      "Замовлення передано на доставку",
      "Замовлення доставлено",
      "Замовлення завершено",
      "Скасовано адміністратором",
      "Скасовано користувачем",
      "Оформлено повернення"
    ),
    allowNull: false,
    defaultValue: "Чекає на підтвердження",
  },
});

const OrderItem = sequelize.define("order_item", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: true },
});

Order.hasMany(OrderItem, {
  as: "items",
  foreignKey: "orderId",
  onDelete: "CASCADE",
});
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

User.hasOne(UserInfo, { foreignKey: "userId", as: "profile" });
UserInfo.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Rating);
Rating.belongsTo(User);

User.hasOne(Token, { onDelete: "CASCADE" });
Token.belongsTo(User);

User.belongsToMany(Product, {
  through: Wishlist,
  as: "wishlistProducts",
  onDelete: "CASCADE",
});

Product.belongsToMany(User, {
  through: Wishlist,
  as: "wishlistUsers",
  onDelete: "CASCADE",
});

User.belongsToMany(Product, {
  through: Basket,
  as: "basketProducts",
  onDelete: "CASCADE",
});
Product.belongsToMany(User, {
  through: Basket,
  as: "basketUsers",
  onDelete: "CASCADE",
});

Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.hasMany(ProductInfo, { as: "info" });
ProductInfo.belongsTo(Product);

Category.hasMany(Product, { onDelete: "CASCADE" });
Product.belongsTo(Category);

Category.hasMany(Category, {
  as: "subcategories",
  foreignKey: "parentId",
  onDelete: "CASCADE",
});
Category.belongsTo(Category, { as: "parent", foreignKey: "parentId" });

Brand.hasMany(Product, { onDelete: "CASCADE" });
Product.belongsTo(Brand);

Brand.belongsToMany(Category, { through: BrandCategory });
Category.belongsToMany(Brand, { through: BrandCategory });

module.exports = {
  User,
  UserInfo,
  Basket,
  Rating,
  Product,
  ProductInfo,
  Category,
  Brand,
  BrandCategory,
  Token,
  Wishlist,
  Order,
  OrderItem,
};
