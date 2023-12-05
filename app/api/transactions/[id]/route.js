// pages/api/transactions.js
import { connectMongoDB } from '@/lib/dbConnect';
import User from '@/model/User';
import { NextResponse } from 'next/server';

export const GET = async (req,{params}) => {
  try {
    await connectMongoDB();
    const {id}=params;
    console.log('getdata',id)
    // Fetch user transactions based on userId
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    console.log(user.transactions,user.balance)
    return NextResponse.json({ transactions: user.transactions, balance: user.balance,username:user.username });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An error occurred while fetching transactions' },
      { status: 500 }
    );
  }
};


export const POST = async (req) => {
  try {
    await connectMongoDB();
    
    const { userId, type, amount } = await req.json();

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Ensure user.transactions is initialized
    if (!user.transactions) {
      user.transactions = [];
    }

    // Update user balance and transactions based on transaction type
    if (type === 'deposit') {
      user.balance = parseFloat(user.balance) + amount;
    } else if (type === 'withdrawal') {
      if (amount > parseFloat(user.balance)) {
        return NextResponse.json({ message: 'Insufficient Funds' }, { status: 400 });
      }
      user.balance = parseFloat(user.balance) - amount;
    }

    // Add the transaction to the user's transactions array
    user.transactions.push({ type, amount });

    // Save the user with updated balance and transactions
    await user.save();
console.log(user.balance,user.transactions,user)

    // Return the updated balance and transactions
    return NextResponse.json({ balance: user.balance, transactions: user.transactions });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An error occurred while processing the transaction' },
      { status: 500 }
    );
  }
};
