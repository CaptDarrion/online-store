const { Order, OrderItem, Product } = require("../models/models");
const sequelize = require("../db");

class OrderService {
  async createOrder(userId, orderData, items) {
    const transaction = await sequelize.transaction();
    try {
      const paymentMethod =
        orderData.paymentMethod === "card"
          ? "Оплата карткою при оформленні"
          : "Оплата при отриманні";

      const paymentStatus =
        orderData.paymentMethod === "card"
          ? "Сплачено карткою"
          : "Вибрано оплату при отриманні";

      const order = await Order.create(
        {
          userId,
          name: orderData.name,
          phone: orderData.phone,
          address: orderData.address,
          paymentMethod,
          paymentStatus,
        },
        { transaction }
      );

      for (const item of items) {
        const product = await Product.findByPk(item.productId, { transaction });
        if (!product) {
          throw new Error(`Товар с ID ${item.productId} не найден.`);
        }

        if (product.quantity < item.quantity) {
          throw new Error(
            `Недостаточное количество товара "${product.name}" на складе.`
          );
        }

        product.quantity -= item.quantity;
        await product.save({ transaction });

        await OrderItem.create(
          {
            orderId: order.id,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            img: product.img,
          },
          { transaction }
        );
      }

      await transaction.commit();
      return order;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  async getOrdersByUserId(userId) {
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          as: "items",
        },
      ],
    });

    return orders;
  }

  async getAllOrders() {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: "items",
        },
      ],
    });
    return orders;
  }

  async getOrderById(id) {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          as: "items",
        },
      ],
    });

    if (!order) {
      throw new Error(`Заказ с ID ${id} не найден.`);
    }

    return order;
  }

  async updateOrderStatus(id, status) {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error(`Заказ с ID ${id} не найден.`);
    }

    order.status = status;
    await order.save();

    return order;
  }

  async deleteOrder(id) {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          as: "items",
        },
      ],
    });

    if (!order) {
      throw new Error(`Заказ с ID ${id} не найден.`);
    }

    for (const item of order.items) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        product.quantity += item.quantity;
        await product.save();
      }
    }

    await OrderItem.destroy({ where: { orderId: id } });
    await order.destroy();
    return { message: "Заказ успешно удалён" };
  }
}

module.exports = new OrderService();
