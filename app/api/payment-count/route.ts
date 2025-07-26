// ===================================
// 1. app/api/payment-count/route.js - Backend API Route
// ===================================

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Order ID - change this to your actual order ID
    const ORDER_ID = 'CFPay_leadthebusinesspremium_c6n6mjnfv';
    
    const response = await fetch(`https://api.cashfree.com/pg/orders/${ORDER_ID}/payments`, {
      method: 'GET',
      headers: {
        'x-api-version': '2025-01-01',
        'x-client-id': process.env.CASHFREE_CLIENT_ID ?? '',
        'x-client-secret': process.env.CASHFREE_CLIENT_SECRET ?? '',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Cashfree API Error: ${response.status}`);
    }


    

    const data = await response.json();
    console.log('Payment Data:', data);
    const count = Array.isArray(data)
      ? data.filter((payment: any) => payment.payment_status === 'SUCCESS').length
      : 0;

    return NextResponse.json({
      success: true,
      count: count
    });

  } catch (error:any) {
    console.error('Payment Count Error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// ===================================
// 2. pages/payment-count.tsx - Frontend Page
// ===================================



// ===================================
// 3. .env.local - Environment Variables
// ===================================

/*
# Production Cashfree API Credentials
# Get these from: https://merchant.cashfree.com/merchants/login
# Go to: Developers → API Keys

CASHFREE_CLIENT_ID=your_production_client_id_here
CASHFREE_CLIENT_SECRET=your_production_client_secret_here
*/