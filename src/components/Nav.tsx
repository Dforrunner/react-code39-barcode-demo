import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  return (
    <nav className='flex items-center justify-between p-4 bg-gray-800 text-white print:hidden'>
      <Link href='/' className='flex items-center gap-2'>
        <Image src='/logo.png' alt='logo' width={40} height={40} />{' '}
        <span className='text-lg'>Code 39 Barcode Tools</span>
      </Link>
      <ul className='flex items-center space-x-4'>
        <li>
          <Link className='border rounded p-2 hover:bg-slate-600' href='/' prefetch>
            Barcode Generator
          </Link>
        </li>
        <li>
          <Link className='border rounded p-2 hover:bg-slate-600' href='/examples' prefetch>
            Examples
          </Link>
        </li>
        <li>
          <Link className='border rounded p-2 hover:bg-slate-600' href='/docs' prefetch>
            Docs
          </Link>
        </li>
        <li>
          <Link
            className='border rounded p-2 hover:bg-slate-600'
            href='/code39-image-reader'
            prefetch
          >
            Barcode Image Reader
          </Link>
        </li>
        <li>
          <div className='flex space-x-4'>
            <a
              className='block size-[32px]'
              href='https://github.com/Dforrunner/react-code39-barcode'
              target='_blank'
            >
              <FontAwesomeIcon icon={faGithub} size='2x' />
            </a>
            <a
              className='block h-[32px] w-[40px]'
              href='https://www.npmjs.com/package/react-code39-barcode'
              target='_blank'
            >
              <FontAwesomeIcon icon={faNpm} size='2x' />
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
