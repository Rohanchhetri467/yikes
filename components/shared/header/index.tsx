import Image from 'next/image';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import Menu from './menu';
import Search from './search';

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          <Link href='/' className='flex-start ml-4'>
            <Image
              src='/images/logo.png'
              alt={`${APP_NAME} logo`}
              height={200}
              width={200}
              priority={true}
            />
          </Link>
        </div>
        <div className='hidden md:block'>
          <Search />
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
