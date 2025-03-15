import ProductList from '@/components/shared/product/product-list';
import {
  getLatestProducts,
  getFeaturedProducts,
  getMensProducts,
  getWomensProducts,
} from '@/lib/actions/product.actions';
import ProductCarousel from '@/components/shared/product/product-carousel';
import ViewAllProductsButton from '@/components/view-all-products-button';

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();
  const mensProducts = await getMensProducts();
  const womensProducts = await getWomensProducts();

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}

      {/* Add margin-bottom to create space between product lists */}
      <div className='mb-8'>
        {' '}
        {/* Add spacing here */}
        <ProductList data={latestProducts} title='New Arrivals' limit={4} />
        <ViewAllProductsButton />
      </div>

      {/* Space between product lists */}
      <div className='mb-8'>
        {' '}
        {/* Add spacing here */}
        <ProductList data={mensProducts} title='Mens' limit={4} />
        <ViewAllProductsButton />
      </div>

      {/* Space between product lists */}
      <div className='mb-8'>
        {' '}
        {/* Add spacing here */}
        <ProductList data={womensProducts} title='Womens' limit={4} />
        <ViewAllProductsButton />
      </div>
    </>
  );
};

export default Homepage;
