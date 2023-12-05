
import { connectMongoDB } from '@/lib/dbConnect';
import User from '@/model/User';
import { NextResponse } from 'next/server';

export const GET = async (req,{params}) => {
  try {
    await connectMongoDB();
    const { id } = params;
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ transactions: user.transactions,user });
  } catch (error) {
    console.error('Error fetching customer transactions:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching customer transactions' },
      { status: 500 }
    );
  }
};
