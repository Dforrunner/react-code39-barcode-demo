'use client';
import React from 'react';
import ImageUploader from './ImageUploader';
import Quagga from 'quagga';

export default function Code39ImageReader() {
  const [result, setResult] = React.useState({
    loading: false,
    value: '',
    error: '',
  });

  const handleImageUpload = (image: string) => {
    if (!image) {
      setResult({ value: '', error: '', loading: false });
      return;
    }

    setResult({ value: '', error: '', loading: true });
    Quagga.decodeSingle(
      {
        src: image, // or base64 encoded data
        numOfWorkers: 0, // Needs to be 0 when used within node
        inputStream: {
          size: 800, // restrict input-size to be 800px in width (long-side)
        },
        decoder: {
          readers: ['code_39_reader'], // List of active readers
        },
      },
      (result: any) => {
        setTimeout(() => {
          if (result?.codeResult) {
            setResult({ value: result.codeResult.code, error: '', loading: false });
          } else {
            setResult({ value: '', error: 'Barcode could not be detected', loading: false });
          }
        }, 5000);
      }
    );
  };

  return (
    <div>
      <ImageUploader onImageUpload={handleImageUpload} />

      <div className='w-full flex justify-center mt-10'>
        <div className='w-full md:w-[600px] border rounded flex gap-2 items-center p-4 text-2xl bg-slate-100'>
          <div>Barcode Value:</div>
          <div>
            {result.loading && (
              <div className='flex items-center'>
                <div className='animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500'></div>
                <span className='ml-2 text-indigo-500'>Loading...</span>
              </div>
            )}
            {result.error && <span className='text-red-500'>{result.error}</span>}
            {result.value && <strong>{result.value}</strong>}
          </div>
        </div>
      </div>
    </div>
  );
}
