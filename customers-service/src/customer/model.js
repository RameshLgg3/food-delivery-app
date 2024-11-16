// src/customer/model.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Order = prisma.order;
const OrdersMenu = prisma.orders_menu;

module.exports = { Order, OrdersMenu };
