
import  {connectMongoDB}  from '@/lib/dbConnect';
import User from '@/model/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    await connectMongoDB();
    const { username, password } = await req.json();

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT token
    const accessToken = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', {
      expiresIn: '1h',
    });
 
    // Return user ID and access token in the response
    return NextResponse.json({ userId: user._id, accessToken });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred while logging in.' }, { status: 500 });
  }
};
