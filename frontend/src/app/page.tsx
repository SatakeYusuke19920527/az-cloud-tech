'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import { loginRequest } from '@/lib/msalConfig';
import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';

export default function Home() {
  const { instance, accounts } = useMsal();
  const user = useCurrentUser();
  useEffect(() => {
    console.log('🚀 ~ SideMenu ~ user:', user);
    console.log('🚀 ~ SideMenu ~ accounts:', accounts);
  }, [accounts]);
  return (
    <main>
      <h1
        onClick={() =>
          user === null
            ? instance.loginRedirect(loginRequest)
            : instance.logout()
        }
        className="flex justify-center px-4 text-2xl font-bold cursor-pointer"
      >
        {user === null ? 'login' : 'logout'}
      </h1>
      <h1>
        {user === null
          ? 'Please login to see your profile'
          : `Welcome ${user?.user_name}! 🚀 Warm Welcome 🚀 Your email: ${user?.email} && ${user?.sub}`}
      </h1>
    </main>
  );
}
