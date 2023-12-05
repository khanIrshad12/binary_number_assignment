// pages/api/banker/register.js
import { connectMongoDB } from '@/lib/dbConnect';
import Banker from '@/model/Banker';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    await connectMongoDB();
    const { email, password } = await req.json();

    // Check if a banker with the same email already exists
    const existingBanker = await Banker.findOne({ email });
    if (existingBanker) {
      return NextResponse.json({ message: 'Banker with this email already exists' }, { status: 400 });
    }
    
    const newBanker = await Banker.create({
      email,
      password,
      role: 'banker', 
    });

    return NextResponse.json({ message: 'Banker registered successfully', banker: newBanker });
  } catch (error) {
    console.error('Banker registration failed', error);
    return NextResponse.json(
      { message: 'An error occurred while processing the banker registration' },
      { status: 500 }
    );
  }
};
