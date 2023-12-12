import Link from 'next/link';

export default function Header () {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500">
      <li className="me-2">
        {/* <a href="#" className="inline-block p-4 rounded-t-lg hover:text-primary">
          Profile
        </a> */}
        <Link href='/account/profile' className='inline-block p-4 rounded-t-lg hover:text-primary'>
          Profile
        </Link>
      </li>
      <li className="me-2">
        {/* <a href="#" className="inline-block p-4 rounded-t-lg hover:text-primary">
          Address
        </a> */}
        <Link href='/account/address' className='inline-block p-4 rounded-t-lg hover:text-primary'>
          Address
        </Link>
      </li>
      <li className="me-2">
        {/* <a href="#" className="inline-block p-4 rounded-t-lg hover:text-primary">
          Order History
        </a> */}
        <Link href='/account/order-history' className='inline-block p-4 rounded-t-lg hover:text-primary'>
          Order History
        </Link>
      </li>
    </ul>
  )
}
