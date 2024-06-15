import { Barcode39Svg } from 'react-code39-barcode';

export default function Home() {
  return (
    <main className='min-h-screen bg-white'>
      <h1 className='print:hidden text-2xl text-center p-4 text-black mt-5'>
        <u>EXAMPLES</u>
      </h1>
      <div className='print:hidden flex flex-wrap justify-evenly'>
        <Barcode39Svg value='123456789' />
        <Barcode39Svg value='123456789' showValue={false} />
        <Barcode39Svg
          value='123-456'
          showValue={true}
          style={{ border: '1px solid orange', borderRadius: 5, height: 100 }}
          fontWeight='bold'
        />
        <Barcode39Svg
          value='987654321'
          width={1}
          height={30}
          style={{ backgroundColor: 'yellow', height: 70, borderRadius: 5 }}
          textColor='red'
          fontFamily='Lucida Console'
          lineSpacing={30}
        />
        <Barcode39Svg value='XYZ7' width={4} height={100} fontSize={16} />
        <Barcode39Svg value='HIJ789' width={2} height={80} padding={20} color='green' />

        <Barcode39Svg value='FGH456' width={2} height={30} color='blue' />
        <Barcode39Svg value='XYZ-123' width={2} height={110} color='pink' />
        <Barcode39Svg
          value='123-344-565'
          width={1}
          height={80}
          fontSize={18}
          fontFamily='Courier New'
          textColor='red'
        />
        <Barcode39Svg
          value='AB1-C12'
          width={3}
          height={90}
          fontSize={36}
          fontFamily='Verdana'
          color='darkblue'
        />
        <Barcode39Svg
          value='MN1-OP2-A90'
          width={2}
          height={60}
          fontSize={22}
          fontFamily='Impact'
          textColor='darkgreen'
          style={{
            backgroundColor: 'rgba(128, 247, 255, 0.8)',
            height: 105,
            borderRadius: 10,
            border: '5px solid black',
          }}
        />
      </div>
    </main>
  );
}
