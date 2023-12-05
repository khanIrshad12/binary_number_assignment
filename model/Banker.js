// models/Banker.js
import mongoose,{models} from 'mongoose';
import bcrypt from 'bcrypt';
import argon2 from 'argon2';

const bankerSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [5, 'Password must be at least 5 characters long'],
  },
  role: {
    type: String,
    enum: ['banker'],
    default: 'banker',
  },
});

bankerSchema.pre('save', async function (next) {
  const banker = this;

  if (banker.isModified('password')) {
    banker.password = await bcrypt.hash(banker.password, 10);
  }

  next();
});

  const Banker =models.Banker || mongoose.model('Banker', bankerSchema);
  
  export default Banker;

