import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY);

export default async (req, res) => {
  const { product, price } = req.body;
  console.log('product : ', product);
  console.log('price : ', price);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/checkoutOK?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkoutKO`,
    });
    console.log('session : ', session);
    res.json({ id: session.id });
  } catch (e) {
    console.log('problem with the session')
    res.json({ error : { message: e }})
    return;
  }
}