'use client'

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

const CustomerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/customer/customerLogin', {
        username,
        password,
      });

      const { userId, accessToken } = response.data;
     // Save the access token and role to localStorage
     localStorage.setItem('accessToken', accessToken);
     localStorage.setItem('role', 'customer');
 
     // Set the default Authorization header for all Axios requests
     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      toast.success("Login succesfull")
    // Redirect to the transactionDetails page with the user ID
    router.push(`/transactionDetails/${userId}`);
    } catch (error) {
      console.error('Login failed', error);
      // Handle login failure (show an error message to the user, etc.)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="w-full max-w-md">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
          >
            Log In
          </button>
        </div>
      </form>
      <div className="text-center">
      <p className="text-sm text-gray-600">
        Don't have an account?{' '}
        <Link className="text-blue-500 hover:underline" href="/customerRegister">
         Register here
        </Link>
      </p>
    </div>
    </div>
  </div>
  );
};

export default CustomerLogin;