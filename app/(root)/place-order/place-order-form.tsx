'use client';

import { useRouter, useSearchParams } from 'next/navigation'; // ✅ Import useSearchParams
import { Check, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { createOrder } from '@/lib/actions/order.actions';

const PlaceOrderForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // ✅ Use searchParams to get query params
  const journalNumber = searchParams.get('journalNumber'); // ✅ Get journalNumber from URL

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log('🔵 Placing order with journal number:', journalNumber);

    if (!journalNumber) {
      console.error('🔴 Missing journal number');
      router.push('/payment-method'); // Redirect to payment if missing
      return;
    }

    const res = await createOrder({ journalNumber });

    if (res.redirectTo) {
      router.push(res.redirectTo);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <Button disabled={useFormStatus().pending} className='w-full'>
        {useFormStatus().pending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Check className='w-4 h-4' />
        )}
        Place Order
      </Button>
    </form>
  );
};

export default PlaceOrderForm;
