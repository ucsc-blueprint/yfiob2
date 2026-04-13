'use client';

import { useState, useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { checkIsAdmin } from '../../../backend/adminFuncs/adminUtils.js';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      const isAdmin = await checkIsAdmin(user.email);
      if (!isAdmin) {
        router.push('/choose-account-type');
        return;
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      {children}
    </div>
  );
}