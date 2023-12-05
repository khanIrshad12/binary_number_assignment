import { connectMongoDB } from '@/lib/dbConnect';
import Banker from '@/model/Banker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    await connectMongoDB();
    const { email, password } = await req.json();

    // Find the banker user by email
    const banker = await Banker.findOne({ email, role: 'banker' });

    if (!banker) {
      return NextResponse.json({ message: 'Banker not found' }, { status: 404 });
    }

    // Compare the entered password with the hashed password
    const passwordMatch = await bcrypt.compare(password, banker.password);
    console.log(passwordMatch)
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    // Generate and sign an access token
    const accessToken = jwt.sign(
      { userId: banker._id, role: banker.role },
      'your-secret-key', // Replace with your actual secret key
      { expiresIn: '1h' }
    );

    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error('Banker login failed', error);
    return NextResponse.json(
      { message: 'An error occurred while processing the banker login' },
      { status: 500 }
    );
  }
};
