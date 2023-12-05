// pages/api/banker/accounts.js
import { connectMongoDB } from '@/lib/dbConnect';
import User from '@/model/User';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectMongoDB();
    const customerAccounts = await User.find({ role: 'customer' }, 'userId username email');

    return NextResponse.json({ customerAccounts });
  } catch (error) {
    console.error('Error fetching customer accounts:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching customer accounts' },
      { status: 500 }
    );
  }
};
