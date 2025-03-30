import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '../../../lib/stripe';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');

    // Create Checkout Sessions from body params.
    const session: any = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1R89iLEGC7ceON3zFXsGXevl',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/dashboard/poc-showcase?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      automatic_tax: { enabled: true },
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
