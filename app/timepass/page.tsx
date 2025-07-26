'use client';
// pages/payment-count.tsx
import React, { useState, useEffect } from 'react';

const PaymentCountPage: React.FC = () => {
  const [paymentCount, setPaymentCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Order ID - change this to your actual order ID
  const ORDER_ID = 'CFPay_leadthebusinesspremium_c6n6mjnfv';

  // API configuration
  const CASHFREE_BASE_URL = 'https://api.cashfree.com/pg';
  const API_VERSION = '2025-01-01';

  useEffect(() => {
    fetchPaymentCount();
  }, []);

  const fetchPaymentCount = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${CASHFREE_BASE_URL}/orders/${ORDER_ID}/payments`, {
        method: 'GET',
        headers: {
          'x-api-version': API_VERSION,
          'x-client-id': process.env.NEXT_PUBLIC_CASHFREE_CLIENT_ID!,
          'x-client-secret': process.env.NEXT_PUBLIC_CASHFREE_CLIENT_SECRET!,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const count = data.payments ? data.payments.length : 0;
      setPaymentCount(count);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payment data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Payment Count</h1>
        
        {loading ? (
          <div className="text-2xl text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-2xl text-red-400">Error: {error}</div>
        ) : (
          <div className="text-6xl font-bold text-green-400">{paymentCount}</div>
        )}
      </div>
    </div>
  );
};

export default PaymentCountPage;