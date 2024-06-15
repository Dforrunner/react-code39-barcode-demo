import Image from 'next/image';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNpm } from '@fortawesome/free-brands-svg-icons';

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center mt-10'>
      <h1 className='text-3xl font-bold mb-4'>React Code39 Barcode</h1>
      <p className='text-lg mb-8 max-w-2xl'>
        {`This app is here to highlight what the react-code39-barcode library can do. Every barcode you see is created using this library. I hope you'll find it helpful in some way!`}
      </p>

      <p className='text-lg mb-8 max-w-2xl'>
        {`This project started when I had to create loads of Code39 barcodes for different parts and
        then print them as PDFs. But the existing options weren't cutting it - they were slow and
        didn't support server-side rendering. So, I whipped up a nifty little React component to
        solve my problem! I'd love to hear what you think about it - any feedback is more than
        welcome!`}
      </p>
      <h2 className='text-2xl font-bold mb-4'>Installation</h2>
      <pre className='bg-gray-200 p-4 rounded-lg'>
        <code>npm i react-code39-barcode</code>
      </pre>

      <a
        className='block h-auto w-[70px]'
        href='https://www.npmjs.com/package/react-code39-barcode'
        target='_blank'
      >
        <FontAwesomeIcon icon={faNpm} size='2x' />
      </a>

      <h2 className='text-2xl font-bold my-4'>Usage</h2>

      <SyntaxHighlighter language='javascript' className={'h-[300px] p-3'}>
        {`  
  import React from 'react';  
  import { Barcode39Svg } from 'react-code39-barcode';  

  export default function App() { 
    return (  
      <div> 
        <Barcode39Svg value='123456789' />  
      </div>  
    );  
  };`}
      </SyntaxHighlighter>

      <h2 className='text-2xl font-bold my-4'>Output</h2>
      <Image
        src='/example-output.png'
        alt='Code39 Barcode Example'
        width={150}
        height={80}
        className='mb-8'
      />
      <h2 className='text-2xl font-bold mb-4'>Props</h2>
      <table className='border-collapse border border-gray-300 mb-8'>
        <thead>
          <tr>
            <th className='border border-gray-300 p-2'>Prop</th>
            <th className='border border-gray-300 p-2'>Type</th>
            <th className='border border-gray-300 p-2'>Default</th>
            <th className='border border-gray-300 p-2'>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border border-gray-300 p-2'>value</td>
            <td className='border border-gray-300 p-2'>string</td>
            <td className='border border-gray-300 p-2'>-</td>
            <td className='border border-gray-300 p-2'>
              The value to be encoded as a Code39 barcode.
            </td>
          </tr>
          <tr>
            <td className='border border-gray-300 p-2'>width</td>
            <td className='border border-gray-300 p-2'>number</td>
            <td className='border border-gray-300 p-2'>1</td>
            <td className='border border-gray-300 p-2'>The width of each bar in pixels.</td>
          </tr>
          <tr>
            <td className='border border-gray-300 p-2'>height</td>
            <td className='border border-gray-300 p-2'>number</td>
            <td className='border border-gray-300 p-2'>60</td>
            <td className='border border-gray-300 p-2'>The height of the barcode in pixels.</td>
          </tr>
          <tr>
            <td className='border border-gray-300 p-2'>fontSize</td>
            <td className='border border-gray-300 p-2'>number</td>
            <td className='border border-gray-300 p-2'>16</td>
            <td className='border border-gray-300 p-2'>
              The font size of the text displayed below the barcode.
            </td>
          </tr>
          <tr>
            <td className='border border-gray-300 p-2'>fontFamily</td>
            <td className='border border-gray-300 p-2'>string</td>
            <td className='border border-gray-300 p-2'>{`'monospace'`}</td>
            <td className='border border-gray-300 p-2'>
              The CSS font family of the text displayed below the barcode.
            </td>
          </tr>
          <tr>
            <td className='border border-gray-300 p-2'>fontWeight</td>
            <td className='border border-gray-300 p-2'>string</td>
            <td className='border border-gray-300 p-2'>{`'500'`}</td>
            <td className='border border-gray-300 p-2'>
              The CSS font weight of the text displayed below the barcode.
            </td>
          </tr>
          <tr>
            <td className='border border-gray-300 p-2'>color</td>
            <td className='border border-gray-300 p-2'>string</td>
            <td className='border border-gray-300 p-2'>{'"black"'}</td>
            <td className='border border-gray-300 p-2'>The color of the barcode.</td>
          </tr>
          <tr>
            <td className='border border-gray-300 p-2'>textColor</td>
            <td className='border border-gray-300 p-2'>string</td>
            <td className='border border-gray-300 p-2'>{'"black"'}</td>
            <td className='border border-gray-300 p-2'>
              The color of the text displayed below the barcode if different from the color.
            </td>
          </tr>
          <tr>
            <td className='border border-gray-300 p-2'>showText</td>
            <td className='border border-gray-300 p-2'>boolean</td>
            <td className='border border-gray-300 p-2'>true</td>
            <td className='border border-gray-300 p-2'>
              Whether to display the text below the barcode.
            </td>
          </tr>
          <tr>
            <td className='border border-gray-300 p-2'>lineSpacing</td>
            <td className='border border-gray-300 p-2'>number</td>
            <td className='border border-gray-300 p-2'>-</td>
            <td className='border border-gray-300 p-2'>
              The spacing between the display text and the barcode.
            </td>
          </tr>
          <tr>
            <td className='border border-gray-300 p-2'>className</td>
            <td className='border border-gray-300 p-2'>string</td>
            <td className='border border-gray-300 p-2'>-</td>
            <td className='border border-gray-300 p-2'>
              Any valid css class that will be applied to the barcode container.
            </td>
          </tr>
          <tr>
            <td className='border border-gray-300 p-2'>id</td>
            <td className='border border-gray-300 p-2'>string</td>
            <td className='border border-gray-300 p-2'>-</td>
            <td className='border border-gray-300 p-2'>HTML id for the barcode container.</td>
          </tr>
          <tr>
            <td className='border border-gray-300 p-2'>style</td>
            <td className='border border-gray-300 p-2'>React.CSSProperties;</td>
            <td className='border border-gray-300 p-2'>{}</td>
            <td className='border border-gray-300 p-2'>
              React CSS properties that will apply to the barcode container.
            </td>
          </tr>
        </tbody>
      </table>
      <h2 className='text-2xl font-bold mb-4'>License</h2>
      <p className='mb-8'>
        This project is licensed under the{' '}
        <a href='https://opensource.org/licenses/MIT' className='text-blue-500'>
          MIT License
        </a>
        .
      </p>
    </div>
  );
}
