import { useRouter } from 'next/router';

export default function CheckoutOK() {
  const router = useRouter();
  const returnQuery = router.query;

  return ( 
    <>
      <h1>Stripe Checkout KO</h1>
    </>
  )
}