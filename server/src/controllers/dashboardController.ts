import { Request, Response } from 'express';
import Order from '../models/Order';
import User from '../models/User';
import Inquiry from '../models/Inquiry';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    console.log("Fetching total revenue...");
    const totalRevenueResult = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;
    console.log("Revenue fetched.");

    console.log("Fetching total orders...");
    const totalOrders = await Order.countDocuments();
    console.log("Orders fetched.");

    console.log("Fetching total users...");
    const totalUsers = await User.countDocuments();
    console.log("Users fetched.");

    console.log("Fetching new inquiries...");
    const newInquiries = await Inquiry.countDocuments({ status: 'New' });
    console.log("Inquiries fetched.");

    console.log("Fetching recent orders...");
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name');
    console.log("Recent orders fetched.");

    res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        totalUsers,
        newInquiries,
        recentOrders,
      },
    });
    const salesData = await Order.aggregate([
      {
        $match: { isPaid: true }, // Only include paid orders
      },
      {
        $group: {
          // Group by the date part of the createdAt timestamp
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          // Sum the totalPrice for each day
          totalSales: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } }, // Sort by date in ascending order
      { $limit: 30 }, // Get the last 30 days of data
    ]);

    // Rename _id to date for easier use on the frontend
    const chartData = salesData.map(item => ({
        date: item._id,
        sales: item.totalSales,
    }));


    // --- Update the response to include the new chartData ---
    res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        totalUsers,
        newInquiries,
        recentOrders,
        salesData: chartData, // Add the chart data here
      },
    });
  } catch (error) {
    // --- 2. THIS WILL NOW SHOW THE DETAILED CRASH REASON ---
    console.error('DASHBOARD STATS FAILED:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};