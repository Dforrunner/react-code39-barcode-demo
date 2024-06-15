/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';

interface ImageUploaderProps {
  onImageUpload?: (image: string) => void;
}
export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isOver, setIsOver] = useState(false);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      if (onImageUpload) onImageUpload(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
  };

  const handleReset = () => {
    setSelectedImage(null);
    if (onImageUpload) onImageUpload('');
  };
  return (
    <div
      className='border-2 border-dashed min-h-[250px] p-4 rounded-md flex justify-center items-center '
      style={{
        backgroundColor: isOver ? 'rgba(0,0,100,0.1)' : 'transparent',
        borderColor: isOver ? 'rgba(0,0,255,0.5)' : 'rgba(50,50,50,0.5)',
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {selectedImage ? (
        <div>
          <img src={selectedImage} alt='Selected' className='max-w-[400px] h-auto' />

          <button
            className='bg-slate-500 w-full text-white px-4 py-2 rounded-md mt-4'
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      ) : (
        <div className='text-center'>
          <label
            htmlFor='image-upload'
            className='cursor-pointer text-blue-500 hover:text-blue-700'
          >
            Click here to upload an image
          </label>
          <input
            type='file'
            id='image-upload'
            accept='image/*'
            className='hidden'
            onChange={handleImageUpload}
          />
          <p className='mt-2'>or</p>
          <p className='mt-2'>Drag and drop an image here</p>
        </div>
      )}
    </div>
  );
}
