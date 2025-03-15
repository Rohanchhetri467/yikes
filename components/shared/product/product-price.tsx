import { cn } from '@/lib/utils';

const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  // Round to nearest whole number
  const roundedValue = Math.round(value);

  return (
    <p className={cn('text-2xl', className)}>
      <span className='text-xs text-center'>NU.</span>
      {roundedValue}
    </p>
  );
};

export default ProductPrice;
