import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js/pure";
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51ORyuKSBMtqHMkdqog31DR0bZNZmVjJruw4To3TKuAfbtxbRhGjm4QmPVqZtyP3B6Npbwwty0gVXRGh0157TWxSp00ouPSjpHV');

const Intiate = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
}

export default Intiate
