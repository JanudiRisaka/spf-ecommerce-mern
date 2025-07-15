import { Request, Response } from 'express';
import Inquiry from '../models/Inquiry';

// Get all inquiries
export const getInquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update an inquiry's status
export const updateInquiryStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (inquiry) {
      inquiry.status = req.body.status || inquiry.status;
      const updatedInquiry = await inquiry.save();
      res.status(200).json({ success: true, inquiry: updatedInquiry });
    } else {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};