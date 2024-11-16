// src/customer/model.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Order = prisma.order;
const OrdersMenu = prisma.orders_menu;
const Address = prisma.address;

module.exports = { Order, OrdersMenu, Address };
