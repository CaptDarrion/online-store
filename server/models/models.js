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

const Wishlist = sequelize.define("wishlist", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
});


const Token = sequelize.define("token", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING, allowNull: true},
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
});


const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
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
  parentId: { type: DataTypes.INTEGER, allowNull: true},
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const BrandCategory = sequelize.define("brand_category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});


User.hasMany(Rating);
Rating.belongsTo(User);

User.hasOne(Token, { onDelete: "CASCADE"});
Token.belongsTo(User);

User.belongsToMany(Product, { through: Wishlist, as: 'wishlistProducts', onDelete: "CASCADE" });
Product.belongsToMany(User, { through: Wishlist, as: 'wishlistUsers', onDelete: "CASCADE" });

User.belongsToMany(Product, { through: Basket, as: 'basketProducts', onDelete: "CASCADE" });
Product.belongsToMany(User, { through: Basket, as: 'basketUsers', onDelete: "CASCADE" });


Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.hasMany(ProductInfo, { as: 'info' });
ProductInfo.belongsTo(Product);

Category.hasMany(Product, { onDelete: 'CASCADE'} );
Product.belongsTo(Category);

Category.hasMany(Category, { as: "subcategories", foreignKey: "parentId", onDelete: 'CASCADE' });
Category.belongsTo(Category, { as: "parent", foreignKey: "parentId" });

Brand.hasMany(Product, { onDelete: 'CASCADE'} );
Product.belongsTo(Brand);

Brand.belongsToMany(Category, { through: BrandCategory });
Category.belongsToMany(Brand, { through: BrandCategory });

module.exports = {
  User,
  Basket,
  Rating,
  Product,
  ProductInfo,
  Category,
  Brand,
  BrandCategory,
  Token,
  Wishlist
};
