'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { FormatDate } from '@/components/FormatDate';
import useAuth from '@/hooks/useAuth';

const CustomerTransactions = () => {
  const { isAuthenticated } = useAuth('banker');
  let { id } = useParams()
  const [transactions, setTransactions] = useState([]);
  const [userName, setUserName] = useState("")
  const router =useRouter()
  useEffect(() => {
    if (isAuthenticated) {
      fetchCustomerTransactions();
    }


  }, []);

  const fetchCustomerTransactions = async () => {
    try {
      const response = await axios.get(`/api/banker/accounts/${id}`);
      console.log("reposne get", response.data)
      setUserName(response.data.user.username)
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error('Error fetching customer transactions:', error);
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
      <h2 className='text-3xl font-semibold mb-4'>Customer Transactions</h2>
      <h2 className='font-semibold text-lg '>User: <span className='text-red-500'>{userName}</span></h2>
      <ul className='flex flex-wrap justify-between gap-2 p-10'>
        {transactions.map((transaction) => (
          <li className='border p-2 cursor-pointer w-full  md:w-[20rem]' key={transaction._id}>
            {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'} : ${transaction.amount}
            <FormatDate timestamp={transaction.timestamp} />
          </li>
        ))}
      </ul>

    </div>
  );
};

export default CustomerTransactions;
