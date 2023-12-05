'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const Selectdepart = () => {
    const router =useRouter()
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleSelection = (role) => {
    setSelectedRole(role);

    if (role === 'customer') {
      router.push('/customerRegister');
    } else if (role === 'banker') {
      router.push('/bankerLogin');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Role</label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={selectedRole}
            onChange={(e) => handleRoleSelection(e.target.value)}
          >
            <option value="" disabled>Select Role</option>
            <option value="customer">Customer</option>
            <option value="banker">Banker</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Selectdepart;
