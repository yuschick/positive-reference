import { loadStripe } from '@stripe/stripe-js';
import { stripe } from 'config';
import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import License from 'routes/Settings/Billing/License';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(stripe.publicKey);

const Billing = () => {
  return (
    <Elements stripe={stripePromise}>
      <License />
    </Elements>
  );
};

export default Billing;
