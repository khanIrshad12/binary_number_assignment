'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const BankerLogin = () => {
  const [email, setEmail] = useState('banker12@gmail.com'); // Default email for banker
  const [password, setPassword] = useState('12345678'); // Default password for banker
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/banker/bankerLogin', {
         email, 
        password,
      });
      const accessToken = response.data.accessToken;
      console.log(accessToken ,response.data)
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('role', 'banker');
  
      // Set the default Authorization header for all Axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      toast.success("Successfully login")
      // Redirect to the banker dashboard or any other desired page
      router.push('/useraccount');
    } catch (error) {
      toast.error("Something went wrong")
      console.error('Login failed', error);
      // Handle login failure (show an error message to the user, etc.)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      </div>
    </div>
  );
};

export default BankerLogin;
