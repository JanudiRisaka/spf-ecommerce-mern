// ----------------- START OF CORRECTED OrderCompletePage.tsx -----------------

import { useState, useEffect, useRef } from 'react'; // <-- 1. Import useRef
import { Link, useSearchParams } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { createOrder } from '@/api/orderApi';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function OrderCompletePage() {
  const stripe = useStripe();
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null); // To store the new order ID

  // Use selectors to prevent unnecessary re-renders
  const { items, shippingAddress, getCartTotal, clearCart } = useCartStore();
  const token = useAuthStore((state) => state.token);

  // --- 2. Create a ref to prevent double execution ---
  const effectRan = useRef(false);

  useEffect(() => {
    // Check the ref flag and stripe instance
    if (effectRan.current === true || !stripe) {
      return;
    }

    // This function will now only run once
    const processOrder = () => {
      effectRan.current = true; // Set the flag immediately

      const clientSecret = searchParams.get('payment_intent_client_secret');
      if (!clientSecret) {
          setStatus('error');
          setMessage('Could not process payment. Client secret is missing.');
          return;
      }

      stripe.retrievePaymentIntent(clientSecret).then(async ({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case 'succeeded':
            setMessage('Payment successful!');
            try {
              if (items.length > 0) { // Safety check to not create an empty order
                const orderData = {
                    orderItems: items,
                    shippingAddress,
                    totalPrice: getCartTotal(),
                    isPaid: true,
                    paidAt: new Date().toISOString(),
                    paymentResult: { id: paymentIntent.id, status: paymentIntent.status }
                };
                const newOrder = await createOrder(orderData, token!);
                setOrderId(newOrder._id); // Save the new order ID
                clearCart();
                setStatus('success');
                toast.success("Your order has been placed!");
              } else {
                setStatus('error');
                setMessage("Your cart is empty. Cannot create an order.");
              }
            } catch (orderError) {
               setStatus('error');
               setMessage('Your payment was successful, but we failed to create your order. Please contact support.');
               toast.error('Failed to save your order. Please contact support.');
            }
            break;

          // ... other cases ...
          default:
            setMessage('Something went wrong with the payment.');
            setStatus('error');
            break;
        }
      });
    };

    processOrder();

  }, [stripe]); // Minimal dependencies to prevent re-running


  // --- RENDER LOGIC ---

  if (status === 'loading') {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <Loader2 className="h-12 w-12 animate-spin mb-4" />
            <h1 className="text-2xl font-bold">Finalizing your order...</h1>
            <p className="text-muted-foreground">Please do not close this page.</p>
        </div>
    );
  }

  if (status === 'error') {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <XCircle className="h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-3xl font-bold text-red-600 mb-2">Order Failed</h1>
            <p className="text-muted-foreground mb-6">{message}</p>
            <Button asChild><Link to="/cart">Return to Cart</Link></Button>
        </div>
    );
  }

  // Success state now uses the saved orderId
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold text-green-600 mb-2">Thank You!</h1>
        <p className="text-muted-foreground mb-6">Your order has been successfully placed.</p>
        {orderId && (
            <p className="mb-8">Your Order ID is: <span className="font-mono bg-gray-100 p-1 rounded">{orderId}</span></p>
        )}
        <Button asChild><Link to="/products">Continue Shopping</Link></Button>
    </div>
  );
}