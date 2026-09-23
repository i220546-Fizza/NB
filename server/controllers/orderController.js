import Order from '../models/Order.js';

export async function createOrder(req, res) {
  const { items, shippingAddress, subtotal, shipping, totalAmount, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Order must contain at least one item' });
  }

  const order = await Order.create({
    user: req.user?._id,
    items,
    shippingAddress,
    subtotal,
    shipping,
    totalAmount,
    paymentMethod: paymentMethod || 'cod',
  });

  res.status(201).json(order);
}

export async function listMyOrders(req, res) {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
}

export async function listAllOrders(req, res) {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
}

export async function updateOrderStatus(req, res) {
  const { orderStatus } = req.body;
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus },
    { new: true, runValidators: true }
  );
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
}
