import React, { useState, useEffect } from 'react';
import request from '../../utils/request';

const checkout = async ({ setLoading, stripeCustomerId }) => {
    setLoading(true);
    // Create stripe customer
    let customerId;
    if (!stripeCustomerId) {
      let response = await request('/users/customer', {
          method: 'POST',
          body: {}
      })
      customerId = response.data
    }

    const res = await fetch('https://wanderlust-api-production.up.railway.app/create-checkout-session', {
        method: 'POST',
        body: JSON.stringify({
          stripeCustomerId: stripeCustomerId ? stripeCustomerId : customerId
        }),
        headers: {'Content-Type': 'application/json'},
    }).then(response => {
      return response.json();
    }).catch(err => {
      console.log('err', err);
    })

    setLoading(false);

    window.open(res.url, "_blank");
}

const ProductDisplay = ({ loading, setLoading, stripeCustomerId }) => {
  if (loading) {
    return (
      <button type="button" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center items-center w-full">
        <svg role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
        </svg>
        Loading...
    </button>
    )
  } else {
    return (
      <button type="button" onClick={() => checkout({ setLoading, stripeCustomerId })} className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-200 dark:focus:ring-primary-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center" >Unlock Premium Features</button>
    )
  }
}

const SuccessDisplay = ({ sessionId }) => {
  return (
    <section>
      <div className="product Box-root">
        <div className="description Box-root">
          <h3>Subscription to starter plan successful!</h3>
        </div>
      </div>
      <form action="/create-portal-session" method="POST">
        <input
          type="hidden"
          id="session-id"
          name="session_id"
          value={sessionId}
        />
        <button id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </button>
      </form>
    </section>
  );
};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);


export default function StripeForm({ stripeCustomerId }) {
    let [message, setMessage] = useState('');
    let [success, setSuccess] = useState(false);
    let [sessionId, setSessionId] = useState('');
    let [loading, setLoading] = useState(false);
  
    useEffect(() => {
      // Check to see if this is a redirect back from Checkout
      const query = new URLSearchParams(window.location.search);
  
      if (query.get('success')) {
        setSuccess(true);
        setSessionId(query.get('session_id'));
      }
  
      if (query.get('canceled')) {
        setSuccess(false);
        setMessage(
          "Order canceled -- continue to shop around and checkout when you're ready."
        );
      }
    }, [sessionId]);

    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-800">
        {
          !success && message === '' ? <ProductDisplay loading={loading} setLoading={setLoading} stripeCustomerId={stripeCustomerId} /> : success && sessionId !== '' ? <SuccessDisplay sessionId={sessionId} /> : <Message message={message} />
        }
      </div>
    )
  }