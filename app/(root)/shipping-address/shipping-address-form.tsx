'use client';

import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';
import { ShippingAddress } from '@/types';
import { shippingAddressSchema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader } from 'lucide-react';
import { updateUserAddress } from '@/lib/actions/user.actions';
import { shippingAddressDefaultValues } from '@/lib/constants';

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (
    values
  ) => {
    startTransition(async () => {
      const res = await updateUserAddress(values);

      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        });
        return;
      }

      router.push('/payment-method');
    });
  };

  return (
    <div className='max-w-md mx-auto space-y-4'>
      <h1 className='h2-bold mt-4'>Shipping Address</h1>
      <p className='text-sm text-muted-foreground'>
        Please enter an address to ship to
      </p>
      <Form {...form}>
        <form
          method='post'
          className='space-y-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Full Name Field */}
          <FormField
            control={form.control}
            name='fullName'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof shippingAddressSchema>,
                'fullName'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter full name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address Field */}
          <FormField
            control={form.control}
            name='streetAddress'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof shippingAddressSchema>,
                'streetAddress'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder='Enter address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof shippingAddressSchema>,
                'phoneNumber'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder='Enter phone number' {...field} />
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
              )}{' '}
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingAddressForm;
