'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

const Accounts = () => {
  const [customerAccounts, setCustomerAccounts] = useState([]);
  const router =useRouter()
  const { isAuthenticated } = useAuth('banker');
  useEffect(() => {
    // Fetch customer accounts on component mount
    if(isAuthenticated){
      fetchCustomerAccounts();
    }
    
  }, []);

  const fetchCustomerAccounts = async () => {
    try {
      const response = await axios.get('/api/banker/accounts');
      setCustomerAccounts(response.data.customerAccounts);
    } catch (error) {
      console.error('Error fetching customer accounts:', error);
    }
  };

  const handleLogout = () => {
    // Clearing  access token from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('banker')
    // Redirect to the login page
    router.push('/bankerLogin');
  };
  return (
    <div className='container mx-auto my-10 p-5 relative'>
    <button
        className='absolute top-5 right-5 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300'
        onClick={handleLogout}
      >
        Logout
      </button>
      <h2 className='text-3xl font-semibold mb-4'>Customer Accounts</h2>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5'>
        {customerAccounts.map((account,index) => (
          <li key={index} className='border p-4 rounded cursor-pointer'>
           
                <div className='flex flrx-row items-center gap-2 justify-between'>
                <div>
                <h3 className='text-lg font-semibold'>UserName: {account.username}</h3>
                <p>EmailId: {account.email}</p>
                </div>
                <Link href={`/useraccount/${account._id}`}>
                <button  className='border py-2 px-4 rounded bg-sky-300  font-medium hover:bg-white hover:border-green-400 '>Detail</button>
                </Link>
                </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accounts;
