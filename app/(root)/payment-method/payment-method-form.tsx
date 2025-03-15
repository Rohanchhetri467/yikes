'use client';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, ArrowRight, Loader } from 'lucide-react';
import { updateUserPaymentMethod } from '@/lib/actions/user.actions';

// Schema to validate Journal Number
const paymentSchema = z.object({
  type: z.literal('E-Transaction'),
  journalNumber: z.string().min(3, 'Journal Number is required'),
});

// Payment Account Number
const ACCOUNT_NUMBER = '202583980';

const PaymentMethodForm = ({}: { preferredPaymentMethod: string | null }) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      type: 'E-Transaction', // Fixed payment type
      journalNumber: '',
    },
  });

  const [isPending, startTransition] = useTransition();

  const handleCopy = () => {
    navigator.clipboard.writeText(ACCOUNT_NUMBER);
    toast({ description: 'Account number copied to clipboard!' });
  };

  const onSubmit = async (values: z.infer<typeof paymentSchema>) => {
    startTransition(async () => {
      console.log('Submitting journal number:', values.journalNumber);

      const res = await updateUserPaymentMethod(values);
      console.log('Response:', res); // Debugging

      if (!res.success) {
        toast({ variant: 'destructive', description: res.message });
        return;
      }

      // Store journalNumber in the session or redirect
      // Pass journalNumber to the Place Order page via query params or context if necessary
      toast({ description: 'Payment method updated successfully!' });
      router.push('/place-order?journalNumber=' + values.journalNumber); // Pass the journalNumber via URL
    });
  };

  return (
    <div className='max-w-md mx-auto space-y-4'>
      <h1 className='h2-bold mt-4'>Payment Method</h1>
      <p className='text-sm text-muted-foreground'>
        Complete payment using the details below.
      </p>

      {/* Copyable Account Number */}
      <div className='flex items-center justify-between p-4 bg-gray-100 rounded-lg'>
        <span className='font-medium'>Account Number: {ACCOUNT_NUMBER}</span>
        <Button size='icon' variant='ghost' onClick={handleCopy}>
          <Copy className='w-5 h-5' />
        </Button>
      </div>

      <Form {...form}>
        <form
          method='post'
          className='space-y-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Journal Number Field */}
          <FormField
            control={form.control}
            name='journalNumber'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>Journal Number</FormLabel>
                <FormControl>
                  <Input placeholder='Enter journal number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className='flex gap-2'>
            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <Loader className='w-4 h-4 animate-spin' />
              ) : (
                <ArrowRight className='w-4 h-4' />
              )}
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PaymentMethodForm;
