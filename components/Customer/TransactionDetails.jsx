'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { FormatDate } from '@/components/FormatDate';
import toast from 'react-hot-toast';
import useAuth from '@/hooks/useAuth';

const TransactionDetails = () => {
  const { id } = useParams()
  const [transactions, setTransactions] = useState([]);
  const [userName, setUserName] = useState('')
  const [balance, setBalance] = useState(0);
  const [transactionType, setTransactionType] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth('customer');

  useEffect(() => {
    // Fetch transaction records and balance on component mount
    if(isAuthenticated){
      fetchTransactions();
    fetchBalance();
    }
    

  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`/api/transactions/${id}`);
      setTransactions(response.data.transactions);
      setUserName(response.data.username)
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await axios.get(`/api/transactions/${id}`);
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const handleTransaction = async () => {
    try {
      // Validate that amount is greater than 0
      if (amount <= 0) {
        toast.error('Please enter an amount greater than 0.');
        setAmount('');
        return;
      }

      // Validate insufficient balance for withdrawal
      if (transactionType === 'withdrawal' && amount > balance) {
        toast.error('Insufficient balance for withdrawal.');
        setAmount('');
        return;
      } else {
        const response = await axios.post(`/api/transactions/${id}`, {
          type: transactionType,
          amount: parseFloat(amount),
          userId: id
        });
        
        // Update the balance and transactions
        setBalance(response.data.balance);
        setTransactions(response.data.transactions);
        setAmount("");
        // Close the popup
        setShowPopup(false);
      }


    } catch (error) {
      if (error.response && error.response.data && error.response.data.error === 'Insufficient Funds') {
      } else {
        console.error('Error performing transaction:', error);
      }
    }
  };
  const handleLogout = () => {
    // Clear the access token from localStorage or cookies
    localStorage.removeItem('accessToken');
    // Redirect to the login page
    router.push('/customerLogin');
  };

  return (
    <div className='relative'>
      <button
        className='absolute top-5 right-5 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300'
        onClick={handleLogout}
      >
        Logout
      </button>
      <h3 className='font-semibold p-5'>UserName: {userName}</h3>
      {/* Display transactions */}
      <div className='flex justify-center flex-col items-center  my-5 font-serif '>
        <h2 className='font-semibold text-lg underline mb-4'>Transaction History</h2>
        <h2>Current Balance: ${balance}</h2>
        {/* Buttons for deposit and withdrawal */}
        <div className='flex justify-center space-x-4 my-5'>
          <button className='border py-2 px-4 rounded bg-cyan-400 text-white font-medium ' onClick={() => { setTransactionType('deposit'); setShowPopup(true); }}>Deposit</button>
          <button className='border py-2 px-4 rounded bg-sky-500 text-white font-medium ' onClick={() => { setTransactionType('withdrawal'); setShowPopup(true); }}>Withdrawal</button>
        </div>
        {/* Popup for deposit/withdrawal */}
        {showPopup && (
          <div className='flex justify-center items-center flex-col my-5 '>
            <h2 className='font-semibold text-lg font-sans'>{transactionType === 'deposit' ? 'Deposit' : 'Withdrawal'}</h2>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[16rem] p-2.5  "
              type="number"
              value={amount}
              required
              onChange={(e) => {
                setAmount(e.target.value);

              }}
            />
            <button className='my-4 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ' onClick={handleTransaction}>Confirm</button>
          </div>
        )}
        <ul className='flex flex-wrap justify-between gap-2 p-10'>
          {transactions && transactions.map((transaction) => (
            <li className='border p-2 cursor-pointer w-full  md:w-[20rem]' key={transaction._id}>
              {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'} : ${transaction.amount}
              <FormatDate timestamp={transaction.timestamp} />
            </li>
          ))}
        </ul>


      </div>
    </div>
  );
};

export default TransactionDetails;
