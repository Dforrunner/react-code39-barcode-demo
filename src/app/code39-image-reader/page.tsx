import React from 'react';
import Code39ImageReader from '@/components/Code39ImageReader';

const Page = () => {
  return (
    <main className='p-5'>
      <div className='max-w-4xl mx-auto px-4'>
        <h1 className='text-2xl font-bold text-center mb-5'>Code39 Barcode Image Reader</h1>
        <p className='text-lg text-gray-700 mb-8 text-center'>
          This component is crafted to decode the value of a Code39 barcode from an image.
        </p>
      </div>
      <Code39ImageReader />
    </main>
  );
};

export default Page;