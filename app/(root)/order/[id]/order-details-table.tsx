'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils';
import { Order } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import {
  createPayPalOrder,
  updateOrderToPaidCOD,
  deliverOrder,
} from '@/lib/actions/order.actions';
import StripePayment from './stripe-payment';

const OrderDetailsTable = ({
  order,
  paypalClientId,
  isAdmin,
  stripeClientSecret,
}: {
  order: Order; // Corrected here to ensure orderItems is included in Order
  paypalClientId: string;
  isAdmin: boolean;
  stripeClientSecret: string | null;
}) => {
  const {
    id,
    shippingAddress,
    orderItems, // Now we expect this to be available
    totalPrice,
    paymentMethod,
    isDelivered,
    isPaid,
    paidAt,
    deliveredAt,
    journalNumber,
  } = order;

  const { toast } = useToast();

  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    let status = '';

    if (isPending) {
      status = 'Loading PayPal...';
    } else if (isRejected) {
      status = 'Error Loading PayPal';
    }
    return status;
  };

  const handleCreatePayPalOrder = async () => {
    const res = await createPayPalOrder(order.id);

    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.message,
      });
    }

    return res.data;
  };

  // Button to mark order as paid
  const MarkAsPaidButton = () => {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    return (
      <Button
        type='button'
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToPaidCOD(order.id);
            toast({
              variant: res.success ? 'default' : 'destructive',
              description: res.message,
            });
          })
        }
      >
        {isPending ? 'processing...' : 'Mark As Paid'}
      </Button>
    );
  };

  // Button to mark order as delivered
  const MarkAsDeliveredButton = () => {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    return (
      <Button
        type='button'
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await deliverOrder(order.id);
            toast({
              variant: res.success ? 'default' : 'destructive',
              description: res.message,
            });
          })
        }
      >
        {isPending ? 'processing...' : 'Mark As Delivered'}
      </Button>
    );
  };

  return (
    <>
      <h1 className='py-4 text-2xl'>Order {formatId(id)}</h1>
      <div className='grid md:grid-cols-3 md:gap-5'>
        <div className='col-span-2 space-4-y overlow-x-auto'>
          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4'>Payment Method</h2>
              <p className='mb-2'>{paymentMethod}</p>
              {isPaid ? (
                <Badge variant='secondary'>
                  Paid at {formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <>
                  <Badge variant='destructive'>Not paid</Badge>
                  {/* Display the red warning message */}
                  <p className='text-red-500 text-sm mt-2'>
                    Your payment will be verified by the admin.
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          <Card className='my-2'>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4 '>Shipping Address</h2>
              <p className='mb-2'>Name: {shippingAddress.fullName}</p>
              <p className='mb-2'>
                Address: {shippingAddress.streetAddress}
                {shippingAddress.phoneNumber}
              </p>
              <p className='mb-2'>
                Phone Number: {shippingAddress.phoneNumber}
              </p>
              <p className='mb-2'>Journal Number:{journalNumber}</p>
              {isDelivered ? (
                <Badge variant='secondary'>
                  Delivered at {formatDateTime(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant='destructive'>Not Delivered</Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4'>Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.length > 0 ? (
                    orderItems.map((item) => (
                      <TableRow key={item.productId}>
                        {/* Use item.id as key */}
                        <TableCell>
                          <Link
                            href={`/product/${item.slug}`}
                            className='flex items-center'
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            />
                            <span className='px-2'>{item.name}</span>
                          </Link>
                        </TableCell>
                        <TableCell>{item.qty}</TableCell>
                        <TableCell className='text-right'>
                          {formatCurrency(item.price)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className='text-center'>
                        No items in the order.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className='p-4 gap-4 space-y-4'>
              <div className='flex justify-between'>
                <div>Total</div>
                <div>{formatCurrency(totalPrice)}</div>
              </div>

              {/* PayPal Payment */}
              {!isPaid && paymentMethod === 'PayPal' && (
                <div>
                  <PayPalScriptProvider options={{ clientId: paypalClientId }}>
                    <PrintLoadingState />
                    <PayPalButtons createOrder={handleCreatePayPalOrder} />
                  </PayPalScriptProvider>
                </div>
              )}

              {/* Stripe Payment */}
              {!isPaid && paymentMethod === 'Stripe' && stripeClientSecret && (
                <StripePayment
                  priceInCents={Number(order.totalPrice) * 100}
                  orderId={order.id}
                  clientSecret={stripeClientSecret}
                />
              )}

              {/* Cash On Delivery */}
              {isAdmin && !isPaid && paymentMethod === 'E-Transaction' && (
                <MarkAsPaidButton />
              )}
              {isAdmin && isPaid && !isDelivered && <MarkAsDeliveredButton />}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsTable;
