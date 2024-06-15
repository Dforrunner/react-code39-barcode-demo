'use client';

import React, { useState } from 'react';
import { Barcode39Svg } from 'react-code39-barcode';
import { MuiColorInput } from 'mui-color-input';
import html2canvas from 'html2canvas';
import Quagga from 'quagga';
import GenerateMany from './GenerateMany';

const fontFamilies = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Times',
  'Courier New',
  'Courier',
  'Verdana',
  'Georgia',
  'Palatino',
  'Garamond',
  'Bookman',
  'Comic Sans MS',
  'Trebuchet MS',
  'Arial Black',
  'Impact',
  'Lucida Sans Unicode',
  'Tahoma',
  'Geneva',
  'Century Gothic',
  'Lucida Grande',
  'Optima',
  'Avant Garde',
  'Gill Sans',
  'Calibri',
  'Candara',
  'Segoe',
  'Arial Narrow',
  'sans-serif',
  'serif',
  'monospace',
  'cursive',
  'fantasy',
];

const fontWeights = [
  'normal',
  'bold',
  'bolder',
  'lighter',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
];

export default function CustomBarcode39Svg() {
  const decodeDefault = {
    decoding: false,
    result: '',
    error: '',
  };

  const stateDefault = {
    value: 'Hello World',
    height: 100,
    width: 2,
    showValue: true,
    fontSize: 30,
    fontFamily: 'Arial',
    fontWeight: 'normal',
    padding: 10,
    color: '#000000',
    textColor: '',
    lineSpacing: 0,
    className: '',
    id: '',
    style: {
      backgroundColor: 'rgb(255, 255, 255)',
      borderRadius: 5,
      borderStyle: 'solid',
      borderColor: 'rgb(0, 0, 0)',
      borderWidth: 1,
    },
  };

  const [decode, setDecode] = useState(decodeDefault);
  const [state, setState] = useState(stateDefault);

  const handleInputChange = (e: any) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getImage = async () => {
    const element = document.getElementById('barcode');
    if (!element) return;

    const canvas = await html2canvas(element);
    return canvas.toDataURL('image/png');
  };

  const download = async () => {
    const img = await getImage();
    if (!img) return;

    const link = document.createElement('a');
    link.href = img;
    link.download = `${state.value}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const decodeBarcode = async () => {
    const img = await getImage();
    if (!img) return;

    setDecode({ result: '', error: '', decoding: true });
    Quagga.decodeSingle(
      {
        src: img, // or base64 encoded data
        numOfWorkers: 0, // Needs to be 0 when used within node
        inputStream: {
          size: 800, // restrict input-size to be 800px in width (long-side)
        },
        decoder: {
          readers: ['code_39_reader'], // List of active readers
        },
      },
      (result: any) => {
        if (result?.codeResult) {
          setDecode({ result: result.codeResult.code, error: '', decoding: false });
        } else {
          setDecode({ result: '', error: 'Barcode could not be detected', decoding: false });
        }
      }
    );
  };

  const reset = () => {
    setState(stateDefault);
    setDecode(decodeDefault);
  };
  return (
    <div>
      <div className='min-h-[300px] flex flex-col justify-center items-center p-10'>
        {!!state.value ? (
          <div className='p-1' id='barcode'>
            <Barcode39Svg {...state} />
          </div>
        ) : (
          <div className='h-44 text-gray-600 text-lg flex items-center'>
            Enter a value to see barcode
          </div>
        )}
        {!!state.value && (
          <div className='flex gap-2 mt-2 print:hidden'>
            <button
              className='print:hidden mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={decodeBarcode}
            >
              Decode/Test
            </button>

            <button
              className='print:hidden mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={download}
            >
              Download
            </button>

            <button
              className='print:hidden mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => window.print()}
            >
              Print
            </button>

            <button
              className='print:hidden mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={reset}
            >
              Reset
            </button>
          </div>
        )}

        <div>
          {decode.decoding && (
            <div className='border rounded flex items-center p-3 mt-3'>Decoding...</div>
          )}
          {decode.result && (
            <div className='border rounded flex flex-col  items-center p-3 mt-3'>
              <div className='w-full'>
                Result: <strong>{decode.result}</strong>
              </div>
              <div className='w-full'>
                Test:{' '}
                {decode.result.toLocaleUpperCase() === state.value.toLocaleUpperCase() ? (
                  <span className='text-green-500'>PASS</span>
                ) : (
                  <span className='text-red-500'>FAIL</span>
                )}
              </div>
            </div>
          )}
          {decode.error && (
            <div className='border border-red-500 rounded flex flex-col items-center p-3 mt-3'>
              <div className='w-full'>
                Error: <span className=' text-red-500'>{decode.error}</span>
              </div>
              <div className='w-full'>
                Test: <span className='text-red-500'>FAIL</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='p-3 lg:px-16 bg-slate-300 print:hidden flex justify-center flex-wrap gap-3 min-h-24 bg-slate-30'>
        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Barcode Value</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            name='value'
            value={state.value}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                value: e.target.value.toLocaleUpperCase().replace(/[^A-Z0-9-\.\s]/g, ''),
              }))
            }
          />
          <div className='text-[11px] pt-[1px] pl-1 text-gray-500'>
            A-Z, 0-9, hyphen, space, period
          </div>
        </div>
        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='showValue'>
            Show Value
          </label>
          <div className='flex justify-center items-center py-2'>
            <input
              className='form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out'
              id='showValue'
              type='checkbox'
              name='showValue'
              checked={state.showValue}
              onChange={() => setState((prev) => ({ ...prev, showValue: !prev.showValue }))}
            />
          </div>
        </div>
        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='height'>
            Height
          </label>
          <input
            className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-24'
            id='height'
            type='number'
            name='height'
            value={state.height}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='width'>
            Width
          </label>
          <input
            className='shadow appearance-none border rounded  w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='width'
            type='number'
            name='width'
            value={state.width}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='padding'>
            Padding
          </label>
          <input
            className='shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='padding'
            type='number'
            name='padding'
            value={state.padding}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='color'>
            Background Color
          </label>
          <MuiColorInput
            className='bg-white rounded w-60'
            sx={{ '& input': { padding: '0.5rem' } }}
            format='rgb'
            value={state.style.backgroundColor}
            onChange={(backgroundColor) =>
              setState((prev) => ({
                ...prev,
                style: { ...prev.style, backgroundColor },
              }))
            }
          />
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='color'>
            Border Color
          </label>
          <MuiColorInput
            className='bg-white rounded w-60'
            sx={{ '& input': { padding: '0.5rem' } }}
            format='rgb'
            value={state.style.borderColor}
            onChange={(borderColor) =>
              setState((prev) => ({
                ...prev,
                style: { ...prev.style, borderColor },
              }))
            }
          />
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Border Width</label>
          <input
            className='shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='number'
            value={state.style.borderWidth}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                style: { ...prev.style, borderWidth: Number(e.target.value) },
              }))
            }
          />
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Border Radius</label>
          <input
            className='shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='number'
            value={state.style.borderRadius}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                style: { ...prev.style, borderRadius: Number(e.target.value) },
              }))
            }
          />
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='fontSize'>
            Font Size
          </label>
          <input
            className='shadow appearance-none border rounded w-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='fontSize'
            type='number'
            name='fontSize'
            value={state.fontSize}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='fontFamily'>
            Font Family
          </label>

          <select
            className='shadow appearance-none border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            name='fontFamily'
            value={state.fontFamily}
            onChange={handleInputChange}
          >
            {fontFamilies.map((fontFamily) => (
              <option key={fontFamily} value={fontFamily}>
                {fontFamily}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='fontWeight'>
            Font Weight
          </label>
          <select
            className='shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            name='fontWeight'
            value={state.fontWeight}
            onChange={handleInputChange}
          >
            {fontWeights.map((fontWeight) => (
              <option key={fontWeight} value={fontWeight}>
                {fontWeight}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='color'>
            Color
          </label>
          <MuiColorInput
            className='bg-white rounded w-36'
            sx={{ '& input': { padding: '0.5rem' } }}
            format='hex'
            value={state.color}
            onChange={(color) =>
              setState((prev) => ({
                ...prev,
                color,
              }))
            }
          />
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='textColor'>
            Text Color
          </label>
          <MuiColorInput
            className='bg-white rounded  w-36'
            sx={{ '& input': { padding: '0.5rem' } }}
            format='hex'
            value={state.textColor || state.color}
            onChange={(textColor) =>
              setState(
                (prev) =>
                  ({
                    ...prev,
                    textColor,
                  } as any)
              )
            }
          />
        </div>
        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lineSpacing'>
            Line Spacing
          </label>
          <input
            className='shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='lineSpacing'
            type='number'
            name='lineSpacing'
            value={state.lineSpacing}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* <GenerateMany /> */}
    </div>
  );
}
