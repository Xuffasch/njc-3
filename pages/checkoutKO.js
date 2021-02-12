import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CheckoutKO() {

  return ( 
    <>
      <h1>Stripe Checkout KO</h1>
      <Link href='/'>
        <a>#%60; retour NJC</a>
      </Link>
    </>
  )
}