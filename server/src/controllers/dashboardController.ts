import { Request, Response } from 'express';
import Order from '../models/Order';
import User from '../models/User';
import Inquiry from '../models/Inquiry';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [totalRevenueResult, totalOrders, totalUsers, newInquiries, recentOrders, salesByDate] = await Promise.all([
      Order.aggregate([
        { $match: { orderStatus: 'delivered' } }, // ✅ FIXED
        { $group: { _id: null, total: { $sum: '$totalPrice' } } },
      ]),
      Order.countDocuments(),
      User.countDocuments(),
      Inquiry.countDocuments({ status: { $regex: /^new$/i } }), // ✅ FIXED
      Order.find({}).sort({ createdAt: -1 }).limit(5).populate('user', 'name'),
      Order.aggregate([
        { $match: { orderStatus: 'delivered' } }, // ✅ FIXED
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            sales: { $sum: "$totalPrice" }
          }
        },
        { $sort: { _id: 1 } }
      ])
    ]);

    const totalRevenue = totalRevenueResult[0]?.total || 0;
    const salesData = salesByDate.map((entry) => ({
      date: entry._id,
      sales: entry.sales
    }));

    return res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        totalUsers,
        newInquiries,
        recentOrders,
        salesData
      },
    });

  } catch (error) {
    console.error('DASHBOARD STATS FAILED:', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};
