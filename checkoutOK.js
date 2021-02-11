import { useRouter } from 'next/router';

export default function CheckoutOK() {
  const router = useRouter();
  const stripeCheckoutId = router.query.id;

  return (
    <>
      <h1>Stripe Checkout OK</h1>
      <p>{stripeCheckoutId}</p>
    </>
  )
}  