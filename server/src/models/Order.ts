import mongoose, { Document, Schema, Types } from 'mongoose';

// --- 1. DEFINE THE INTERFACE ---
// This tells TypeScript what an Order document looks like.
export interface IOrder extends Document {
  user: Types.ObjectId;
  orderItems: {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: Types.ObjectId;
  }[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  totalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered';
  deliveredAt?: Date; // It's optional, so add '?'
  createdAt: Date;
  updatedAt: Date;
}

// --- 2. YOUR EXISTING SCHEMA ---
// The schema definition itself doesn't need to change much, but we add the new field.
const orderSchema: Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true, default: 0.0 },
    paymentStatus: { type: String, required: true, default: 'pending', enum: ['pending', 'paid', 'failed'] },
    orderStatus: { type: String, required: true, default: 'pending', enum: ['pending', 'processing', 'shipped', 'delivered'] },
    deliveredAt: { type: Date }, // Add the field to the schema
  },
  { timestamps: true }
);

// --- 3. CONNECT THE INTERFACE TO THE MODEL ---
const Order = mongoose.model<IOrder>('Order', orderSchema);
export default Order;