import { connectMongoDB } from '@/lib/dbConnect';
import User from '@/model/User';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    await connectMongoDB();
    const { username, email, password, role } = await req.json();
    console.log("post method register", username, email, password)
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const newUser = await User.create({ username, email, password, role });
    console.log("created new user ", newUser)
    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred while registering the user.' }, { status: 500 });
  }
};