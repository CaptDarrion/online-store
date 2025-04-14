const { Order, OrderItem, Product } = require("../models/models");
const OrderService = require("../services/orderService");

class OrderController {
  async create(req, res, next) {
    try {
      const userId = req.user.id;
      const { orderData, items } = req.body;
      const order = await OrderService.createOrder(userId, orderData, items);
      return res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  async getUserOrders(req, res, next) {
    try {
      const userId = req.user.id;
      const orders = await OrderService.getOrdersByUserId(userId);
      return res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await OrderService.getOrderById(id);
      return res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedOrder = await OrderService.updateOrderStatus(id, status);
      return res.json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await OrderService.deleteOrder(id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllOrders(req, res, next) {
    try {
      const orders = await OrderService.getAllOrders();
      return res.json(orders);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
