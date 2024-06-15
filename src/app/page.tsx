import { Suspense } from 'react';
import dynamic from 'next/dynamic';
const CustomBarcode39Svg = dynamic(() => import('../components/Generate'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className='min-h-screen bg-white'>
      <Suspense fallback={<div className='bg-white block h-[300px]'></div>}>
        <CustomBarcode39Svg />
      </Suspense>
    </main>
  );
}
