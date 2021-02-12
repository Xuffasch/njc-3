import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function CheckoutOK() {
  const router = useRouter();
  const stripeCheckoutId = router.query.id + '';

  const { data, error } = useSWR(
    stripeCheckoutId ? `/api/${stripeCheckoutId}` : null,
    (url) => fetch(url).then(res => res.json())
  )

  return (
    <div>
      <h1>Stripe Checkout OK</h1>
      <p>{stripeCheckoutId}</p>
      <pre>
        { data ? JSON.stringify(data, null, 2) : 'loading' }
      </pre>
      <Link href='/'>
        <a className='inline-block p-2 m-2 bg-yellow-500'>&#60; NJC</a>
      </Link>
    </div>
  )
}  