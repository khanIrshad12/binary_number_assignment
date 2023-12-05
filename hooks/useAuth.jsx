// utils/useAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = (expectedRole) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Access localStorage only on the client side
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        router.push(`/${expectedRole}Login`);
      } else {
        // Check if the user has the expected role
        const storedRole = localStorage.getItem('role');
        if (storedRole !== expectedRole) {
          // Redirect to the login page for the expected role
          router.push(`/${expectedRole}Login`);
        }
      }
    }
  }, [router, expectedRole]);

  return {
    isAuthenticated: typeof window !== 'undefined' && !!localStorage.getItem('accessToken'),
  };
};

export default useAuth;
