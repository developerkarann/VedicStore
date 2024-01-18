import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Payment from './Payment'

export default function ParentPayment() {
    return (
        <Elements stripe={loadStripe('pk_test_51OZS7USC0aTJyQsADKV6N8n5hUrHbMtTs1qiUce71d0hBqFeupDu7uLPWmZbaVgfnUH1Ua6ULCuyYkzH5Krgglse00bz82NpK1')}>
            <Payment />
        </Elements>
    )
}
