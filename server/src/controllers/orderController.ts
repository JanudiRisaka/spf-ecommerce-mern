import { Request, Response } from 'express';
import Order, { IOrder } from '../models/Order'; // Import the IOrder interface

/**
 * @desc    Get all orders
 * @route   GET /api/v1/orders
 * @access  Private/Admin
 */
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * @desc    Update order status
 * @route   PUT /api/v1/orders/:id/status
 * @access  Private/Admin
 */
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    // --- THIS IS THE MAIN FIX ---
    // Add the type <IOrder> to tell TypeScript what 'order' will be.
    const order: IOrder | null = await Order.findById(req.params.id);

    if (order) {
      const { status } = req.body;
      const allowedStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];
      if (!status || !allowedStatuses.includes(status)) {
        res.status(400).json({ success: false, message: 'Invalid status provided' });
        return;
      }

      // TypeScript now knows that 'deliveredAt' is a valid property on the 'order' object.
      order.orderStatus = status;
      if (status === 'delivered') {
        order.deliveredAt = new Date();
      }

      const updatedOrder = await order.save();
      res.status(200).json({ success: true, order: updatedOrder });
    } else {
      res.status(404).json({ success: false, message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * @desc    Create a new order
 * @route   POST /api/v1/orders
 * @access  Private
 */
// ----------------- START OF CORRECTED createOrder FUNCTION -----------------
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("--- RECEIVED CREATE ORDER REQUEST ---");
  console.log("Request Body:", JSON.stringify(req.body, null, 2));
  console.log("-----------------------------------");
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized, no user data' });
      return;
    }

    const { orderItems, shippingAddress, totalPrice, isPaid, paidAt, paymentResult } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    }

    const order = new Order({
      user: req.user._id,
      orderItems: orderItems.map((item: any) => ({
        name: item.name,
        qty: item.quantity,
        image: item.image,
        price: item.price,
        product: item.product,
      })),
      shippingAddress,
      totalPrice,
      isPaid,
      paidAt,
      paymentResult,
    });

    const createdOrder = await order.save();

    res.status(201).json({ success: true, order: createdOrder });
  } catch (error) {
    console.error("CREATE ORDER FAILED:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
