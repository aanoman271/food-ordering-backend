//    Create a new order
//    POST /api/orders

import Order from "../models/Order";

export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items found" });
    }
    //generate uniqe Id
    const payhereOrderId = `ORD-${Date.now()}`;

    const order = new Order({
      user: req.user._id,
      items,
      totalAmount,
      payhereOrderId,
    });

    const createdOrder = await Order.save();

    res.status(201).json({
      message: "Order initiated successfully",
      order: createdOrder,
    });
  } catch (error) {
    console.error("Create Order Error:", error.message);
    res.status(500).json({ message: "Server Error, could not place order" });
  }
};

//     Get logged in user orders
// GET /api/orders/myorders
//  Private (Customer)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.food",
    );
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get My Orders Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all orders (Admin Only)
//    GET /api/orders
//   Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    // .populate('user', 'name email')
    const orders = await Order.find({})
      .populate("user", "name email phone")
      .populate("items.food");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get All Orders Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update order status (Admin Only)
//    PUT /api/orders/:id/status
//   Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = orderStatus;
    const updatedOrder = await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update Order Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
