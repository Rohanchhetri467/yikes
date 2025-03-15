import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='mt-5 py-5 border-t bg-black text-white'>
      <div className='container mx-auto pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-center'>
        {/* Footer Section One */}
        <div className='footer-one text-center'>
          <a href='#' className='logo'>
            <Image
              src='/images/white-logo.png'
              alt='Logo'
              height={200}
              width={200}
              className='mx-auto'
            />
          </a>
          <p className='pt-3'>
            We provide the best products for the most affordable prices
          </p>
        </div>

        {/* Footer Section Two */}
        <div className='footer-one text-center'>
          <ul className='text-uppercase'>
            <li>
              <a href='/terms'>Terms and conditions</a>
            </li>
          </ul>
        </div>

        {/* Footer Section Three */}
        <div className='footer-one text-center'>
          <h5 className='pb-2 text-xl font-semibold'>Contact Us</h5>
          <div>
            <h6 className='text-uppercase font-medium'>
              Phone Number +97577446211
            </h6>
          </div>
          <div>
            <h6 className='text-uppercase font-medium'>
              Email shopyikes@gmail.com
            </h6>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className='p-5 flex justify-center'>
        <p>
          {currentYear} {APP_NAME}. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
