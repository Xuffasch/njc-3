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
            currency: 'eur',
            product_data: {
              name: product,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/checkoutOK?id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/checkoutKO',
      mode: 'payment',   
    });
    res.json({ id: session.id });
    return;
  } catch (e) {
    console.log('problem with the session')
    res.json({ error : { message: e}})
    return;
  }
}